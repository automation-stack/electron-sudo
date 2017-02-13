import {tmpdir} from 'os';
import {normalize, join, dirname} from 'path';
import {createHash} from 'crypto';

import B from 'bluebird';
const {promisifyAll} = B.Promise;
const fs = promisifyAll(require('fs'));
const fsExtra = promisifyAll(require('fs-extra'));
const yauzl = promisifyAll(require('yauzl'));

import binaries from '~/lib/bin';
import {exec, spawn, stat} from '~/lib/utils';

let {platform, env} = process;


class Sudoer {

    constructor(options) {
        this.platform = platform;
        this.bin = Buffer.from(binaries[this.platform], 'base64');
        this.target = null;
        this.options = options;
        this.cp = null;
        this.tmpdir = tmpdir();
    }

    hash(buffer) {
        let hash = createHash('sha256');
        hash.update('electron-sudo');
        hash.update(this.options.name || '');
        hash.update(buffer || new Buffer(0));
        return hash.digest('hex').slice(-32);
    }

    async deploy(target) {
        let self = this;
        return new B.Promise(async (resolve, reject) => {
            try {
                if (typeof self.bin !== 'string') { resolve(target); }
                let zipfile = await yauzl.fromBufferAsync(
                    self.bin, {lazyEntries: true}
                );
                zipfile.readEntry();
                zipfile.on('entry', async (entry) => {
                    if (/\/$/.test(entry.fileName)) {
                        try {
                            await fsExtra.ensureDirAsync(join(target, entry.fileName));
                            zipfile.readEntry();
                        } catch (err) { reject(err); }
                    } else {
                        try {
                            let readStream = await zipfile.openReadStreamAsync(entry);
                            await fsExtra.ensureDirAsync(
                                dirname(join(target, entry.fileName))
                            );
                            readStream.pipe(
                                fs.createWriteStream(join(target, entry.fileName))
                            );
                            readStream.on('end', () => {
                                zipfile.readEntry();
                            });
                        } catch (err) { reject(err); }
                    }
                });
                zipfile.once('end', async () => {
                    self.target = target;
                    zipfile.close();
                    process.on('exit', async (code) => {
                        await self.clean(code, target);
                    });
                    return resolve(target);
                });
            } catch (err) { reject(err); }
        });
    }

    async clean(code, target) {
        await fsExtra.removeAsync(target);
    }

    joinEnv(options) {
        let {env} = options,
            spreaded = [];
        if (env && typeof env == 'object') {
            for (let key in env) {
                spreaded.push(key.concat('=', env[key]));
            }
        }
        return spreaded;
    }

    escapeDoubleQuotes(string) {
        return string.replace(/"/g, '\\"');
    }

    encloseDoubleQuotes(string) {
        return string.replace(/(.+)/g, '"$1"');
    }

    kill(pid) {
        if (!pid) {
            return;
        } else {
            return;
        }
    }
}


class SudoerUnix extends Sudoer {

    constructor(options={}) {
        super(options);
        if (!this.options.name) { this.options.name = 'Electron'; }
    }

    // async copy(source, target) {
    //     return new B.Promise(async (resolve, reject) => {
    //         source = this.escapeDoubleQuotes(normalize(source));
    //         target = this.escapeDoubleQuotes(normalize(target));
    //         try {
    //             let result = await exec(`/bin/cp -R -p "${source}" "${target}"`);
    //             resolve(result);
    //         }
    //         catch (err) {
    //             reject(err);
    //         }
    //     });
    // }

    // async remove(target) {
    //     let self = this;
    //     return new B.Promise(async (resolve, reject) => {
    //         if (!target.startsWith(self.tmpdir)) {
    //             throw new Error(`Try to remove suspicious target: ${target}.`);
    //         }
    //         target = this.escapeDoubleQuotes(normalize(target));
    //         try {
    //             let result = await exec(`rm -rf "${target}"`);
    //             resolve(result);
    //         }
    //         catch (err) {
    //             reject(err);
    //         }
    //     });
    // }

    // async reset() {
    //     await exec('/usr/bin/sudo -k');
    // }
}


class SudoerDarwin extends SudoerUnix {

    constructor(options={}) {
        super(options);
        if (options.icns && typeof options.icns !== 'string') {
            throw new Error('options.icns must be a string if provided.');
        } else if (options.icns && options.icns.trim().length === 0) {
            throw new Error('options.icns must be a non-empty string if provided.');
        }
        this.up = false;
    }

    isValidName(name) {
        return /^[a-z0-9 ]+$/i.test(name) && name.trim().length > 0 && name.length < 70;
    }

    joinEnv(options) {
        let {env} = options,
            spreaded = [];
        if (env && typeof env == 'object') {
            for (let key in env) {
                spreaded.push(key.concat('=', env[key]));
            }
        }
        return spreaded;
    }

    async exec(command, options={}) {
        return new B.Promise(async (resolve, reject) => {
            let self = this,
                env = self.joinEnv(options),
                sudoCommand = ['/usr/bin/sudo -n', env.join(' '), '-s', command].join(' '),
                result;
            // await self.reset();
            try {
                result = await exec(sudoCommand, options);
                resolve(result);
            } catch (err) {
                try {
                    // Prompt password
                    await self.prompt();
                    // Try once more
                    result = await exec(sudoCommand, options);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            }
        });
    }

    async spawn(command, args, options={}) {
        return new B.Promise(async (resolve, reject) => {
            let self = this,
                bin = '/usr/bin/sudo',
                cp;
            // await self.reset();
            await self.prepare();
            // Prompt password
            await self.prompt();
            cp = spawn(bin, ['-n', '-s', '-E', [command, ...args].join(' ')], options);
            cp.on('error', async (err) => {
                reject(err);
            });
            self.cp = cp;
            resolve(cp);
        });
    }

    async command() {
        let path = join(this.target, 'Contents', 'MacOS', 'sudo-prompt-command'),
            script = [];
        script.push(`cd "${this.escapeDoubleQuotes(process.cwd())}"`);
        script.push(command);
        script = script.join('\n');
        await fs.writeFileAsync(path, script, 'utf-8');
    }

    async prepare() {
        let self = this,
            target = join(self.tmpdir, self.hash(), `${self.options.name}.app`);
        return new B.Promise(async (resolve, reject) => {
            if (!self.tmpdir) {
                return reject(
                    new Error('Requires os.tmpdir() to be defined.')
                );
            }
            if (!env.USER) {
                return reject(
                    new Error('Requires env[\'USER\'] to be defined.')
                );
            }
            try {
                // Deploy binary utility
                await self.deploy(target);
                console.log(target);
                // Read ICNS-icon and hash it
                await self.readIcns();
                // Create application icon from source
                await self.icon(target);
                // Create property list for application
                await self.propertyList(target);
                return resolve();
            } catch (err) { return reject(err); }
        });
    }

    async prompt() {
        let self = this;
        return new B.Promise(async (resolve, reject) => {
            if (!self.tmpdir) {
                return reject(
                    new Error('Requires os.tmpdir() to be defined.')
                );
            }
            if (!env.USER) {
                return reject(
                    new Error('Requires env[\'USER\'] to be defined.')
                );
            }
            // Keep prompt in single instance
            self.up = true;
            try {
                // Create command script
                await self.command();
                // Open UI dialog with password prompt
                await self.open(target);
            } catch (err) {
                return reject(err);
            }
            return resolve();
        });
    }

    async icon(target) {
        let self = this;
        return new B.Promise(async (resolve, reject) => {
            if (!self.options.icns) { return resolve(); }
            let result = await fsExtra.copyAsync(
                self.options.icns,
                join(target, 'Contents', 'Resources', 'applet.icns')
            );
            return resolve(result);
        });
    }

    async open(target) {
        let self = this;
        return new B.Promise(async (resolve, reject) => {
            target = self.escapeDoubleQuotes(normalize(target));
            try {
                let result = await exec(`open -n -W "${target}"`);
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        });
    }

    async readIcns(icnsPath) {
        return new B.Promise(async (resolve, reject) => {
            // ICNS is supported only on Mac.
            if (!icnsPath || platform !== 'darwin') {
                return resolve(new Buffer(0));
            }
            try {
                let data = await fs.readFileAsync(icnsPath);
                return resolve(data);
            } catch (err) {
                return reject(err);
            }
        });
    }

    async propertyList(target) {
        let self = this;
        return new B.Promise(async (resolve, reject) => {
            let path = self.escapeDoubleQuotes(join(target, 'Contents', 'Info.plist')),
                key = self.escapeDoubleQuotes('CFBundleName'),
                value = `${self.options.name} Password Prompt`;
            if (/'/.test(value)) {
                return reject(new Error('Value should not contain single quotes.'));
            }
            let result = await exec(`defaults write "${path}" "${key}" '${value}'`);
            return resolve(result);
        });
    }
}

class SudoerLinux extends SudoerUnix {

    constructor(options={}) {
        super(options);
        this.binary = null;
        // We prefer gksudo over pkexec since it gives a nicer prompt:
        this.paths = [
            '/usr/bin/gksudo',
            '/usr/bin/pkexec',
            './bin/gksudo'
        ];
    }

    async getBinary() {
        return (await B.Promise.all(
            this.paths.map(async (path) => {
                try {
                    path = await stat(path);
                    return path;
                } catch (err) {
                    return null;
                }
            })
        )).filter((v) => v)[0];
    }

    async exec(command, options={}) {
        return new B.Promise(async (resolve, reject) => {
            let self = this,
                result;
            /* Detect utility for sudo mode */
            if (!self.binary) {
                self.binary = await self.getBinary();
            }
            if (options.env instanceof Object && !options.env.DISPLAY) {
                // Force DISPLAY variable with default value which is required for UI dialog
                options.env = Object.assign(options.env, {DISPLAY: ':0'});
            }
            let flags;
            if (/gksudo/i.test(self.binary)) {
                flags = '--preserve-env --sudo-mode ' +
                    `--description="${self.escapeDoubleQuotes(self.options.name)}"`;
            } else if (/pkexec/i.test(self.binary)) {
                flags = '--disable-internal-agent';
            }
            command = `${this.binary} ${flags} ${command}`;
            try {
                result = await exec(command, options);
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        });
    }

    async spawn(command, args, options={}) {
        let self = this;
        return new B.Promise(async (resolve, reject) => {
            /* Detect utility for sudo mode */
            if (!self.binary) {
                self.binary = await self.getBinary();
            }
            if (options.env instanceof Object && !options.env.DISPLAY) {
                // Force DISPLAY variable with default value which is required for UI dialog
                options.env = Object.assign(options.env, {DISPLAY: ':0'});
            }
            // In order to guarantee succees execution we'll use execFile
            // due to fallback binary bundled in package
            let sudoArgs = [];
            if (/gksudo/i.test(self.binary)) {
                sudoArgs.push('--preserve-env');
                sudoArgs.push('--sudo-mode');
                sudoArgs.push(`--description="${self.escapeDoubleQuotes(self.options.name)}"`);
                sudoArgs.push('--sudo-mode');
            } else if (/pkexec/i.test(self.binary)) {
                sudoArgs.push('--disable-internal-agent');
            }
            sudoArgs.push(command);
            sudoArgs.push(args);
            try {
                let cp = spawn(self.binary, sudoArgs, options);
                return resolve(cp);
            } catch (err) {
                return reject(err);
            }
        });
    }
}

class SudoerWin32 extends Sudoer {

    constructor(options={}) {
        super(options);
        this.bundled = 'src\\bin\\elevate.exe';
        this.binary = null;
    }

    async writeBatch(command, args, options) {
        let tmpDir = (await exec('echo %temp%'))
                .stdout.toString()
                .replace(/\r\n$/, ''),
            tmpBatchFile = `${tmpDir}\\batch-${Math.random()}.bat`,
            tmpOutputFile = `${tmpDir}\\output-${Math.random()}`,
            env = this.joinEnv(options),
            batch = `setlocal enabledelayedexpansion\r\n`;
        if (env.length) {
            batch += `set ${env.join('\r\nset ')}\r\n`;
        }
        if (args && args.length) {
            batch += `${command} ${args.join(' ')}`;
        } else {
            batch += command;
        }
        await fs.writeFileAsync(tmpBatchFile, `${batch} > ${tmpOutputFile} 2>&1`);
        await fs.writeFileAsync(tmpOutputFile, '');
        return {
            batch: tmpBatchFile, output: tmpOutputFile
        };
    }

    async watchOutput(cp) {
        let self = this,
            output = await fs.readFileAsync(cp.files.output);
        // If we have process then emit watched and stored data to stdout
        cp.stdout.emit('data', output);
        let watcher = fs.watchFileAsync(
                cp.files.output, {persistent: true, interval: 1},
                () => {
                    let stream = fs.createReadStream(
                            cp.files.output,
                            {start: watcher.last}
                        ),
                        size = 0;
                    stream.on('data', (data) => {
                        size += data.length;
                        if (cp) { cp.stdout.emit('data', data); }
                    });
                    stream.on('close', () => {
                        cp.last += size;
                    });
                }
            );
        cp.last = output.length;
        cp.on('exit', () => {
            self.clean(cp);
        });
        return cp;
    }

    async prepare() {
        let self = this;
        return new B.Promise(async (resolve, reject) => {
            if (self.binary) { return resolve(self.binary); }
            // Copy applet to temporary directory
            let target = join(this.tmpdir, 'elevate.exe');
            if (!(await stat(target))) {
                let copied = fs.createWriteStream(target);
                fs.createReadStream(self.bundled).pipe(copied);
                copied.on('close', () => {
                    self.binary = target;
                    return resolve(self.binary);
                });
                copied.on('error', (err) => {
                    return reject(err);
                });
            } else {
                self.binary = target;
                resolve(self.binary);
            }
        });
    }

    async exec(command, options={}) {
        let self = this, files, output;
        return new B.Promise(async (resolve, reject) => {
            try {
                await this.prepare();
                files = await self.writeBatch(command, [], options);
                command = `${self.encloseDoubleQuotes(self.binary)} -wait ${files.batch}`;
                // No need to wait exec output because output is redirected to temporary file
                await exec(command, options);
                // Read entire output from redirected file on process exit
                output = await fs.readFileAsync(files.output);
                return resolve(output);
            } catch (err) {
                return reject(err);
            }
        });
    }

    async spawn(command, args, options={}) {
        let files = await this.writeBatch(command, args, options),
            sudoArgs = [],
            cp;
        sudoArgs.push('-wait');
        sudoArgs.push(files.batch);
        await this.prepare();
        cp = spawn(this.binary, sudoArgs, options, {wait: false});
        cp.files = files;
        await this.watchOutput(cp);
        return cp;
    }

    clean (cp) {
        fs.unwatchFileAsync(cp.files.output);
        fs.unlinkAsync(cp.files.batch);
        fs.unlinkAsync(cp.files.output);
    }
}


export {SudoerDarwin, SudoerLinux, SudoerWin32};
