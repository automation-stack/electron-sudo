import {tmpdir} from 'os';
import {watchFile, unwatchFile, unlink, createReadStream, createWriteStream, readdir, rmdir, stat as fs_stat, chmod} from 'fs';
import {normalize, join, dirname} from 'path';
import {createHash} from 'crypto';
import {promisify} from "bluebird";

import {readFile, writeFile, exec, spawn, mkdir, stat} from '~/lib/utils';

const readdirAsync = promisify(readdir);
const unlinkAsync = promisify(unlink);
const rmdirAsync = promisify(rmdir);
const statAsync = promisify(fs_stat);
const mkdirAsync = promisify(mkdir);
const chmodAsync = promisify(chmod);

let {platform, env} = process;


class Sudoer {

    constructor(options) {
        this.platform = platform;
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

    async copy(source, target) {
        let stats = await statAsync(source);
        let mode = 0o755; // add execute permission, seems asar package will lose permission information.
        if (stats.isDirectory()) {
            try {
                let stats = await statAsync(target);
                if (stats.isDirectory()) {
                    await chmodAsync(target, mode);
                } else {
                    await unlinkAsync(target);
                    await mkdirAsync(target, mode);
                }
            } catch (error) {
                await mkdirAsync(target, mode);
            }
            for (let file of await readdirAsync(source)) {
                await this.copy(join(source, file), join(target, file))
            }
        } else {
            try {
                let stats = await statAsync(target);
                if (stats.isDirectory()) {
                    await rmdirAsync(target);
                } else {
                    await chmodAsync(target, mode);
                }
            } catch (error) {
            }
            return new Promise((resolve, reject)=> {
                let readable = createReadStream(source);
                readable.on("error", reject);
                let writable = createWriteStream(target, {defaultEncoding: 'binary', mode: mode});
                writable.on("error", reject);
                writable.on("close", resolve);
                readable.pipe(writable);
            })
        }
    }

}


class SudoerUnix extends Sudoer {

    constructor(options={}) {
        super(options);
        if (!this.options.name) { this.options.name = 'Electron'; }
    }

    async remove(target) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            if (!target.startsWith(self.tmpdir)) {
                throw new Error(`Try to remove suspicious target: ${target}.`);
            }
            target = this.escapeDoubleQuotes(normalize(target));
            try {
                let result = await exec(`rm -rf "${target}"`);
                resolve(result);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async reset() {
        await exec('/usr/bin/sudo -k');
    }
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
        return new Promise(async (resolve, reject) => {
            let self = this,
                env = self.joinEnv(options),
                sudoCommand = ['/usr/bin/sudo -n', env.join(' '), '-s', command].join(' '),
                result;
            await self.reset();
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
        return new Promise(async (resolve, reject) => {
            let self = this,
                bin = '/usr/bin/sudo',
                cp;
            await self.reset();
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

    async prompt() {
        let self = this;
        return new Promise(async (resolve, reject) => {
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
            // Read ICNS-icon and hash it
            let icon = await self.readIcns(),
                hash = self.hash(icon);
            // Copy applet to temporary directory
            let source = join(`${dirname(__filename)}/bin`, 'applet.app'),
                target = join(self.tmpdir, hash, `${self.options.name}.app`);
            try {
                await mkdir(dirname(target));
            } catch (err) {
                if (err.code !== 'EEXIST') { return reject(err); }
            }
            try {
                // Copy application to temporary directory
                await self.copy(source, target);
                // Create application icon from source
                await self.icon(target);
                // Create property list for application
                await self.propertyList(target);
                // Open UI dialog with password prompt
                await self.open(target);
                // Remove applet from temporary directory
                await self.remove(target);
            } catch (err) {
                return reject(err);
            }
            return resolve(hash);
        });
    }

    async icon(target) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            if (!this.options.icns) { return resolve(); }
            let result = await self.copy(
                this.options.icns,
                join(target, 'Contents', 'Resources', 'applet.icns')
            );
            return resolve(result);
        });
    }

    async open(target) {
        let self = this;
        return new Promise(async (resolve, reject) => {
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
        return new Promise(async (resolve, reject) => {
            // ICNS is supported only on Mac.
            if (!icnsPath || platform !== 'darwin') {
                return resolve(new Buffer(0));
            }
            try {
                let data = await readFile(icnsPath);
                return resolve(data);
            } catch (err) {
                return reject(err);
            }
        });
    }

    async propertyList(target) {
        let self = this;
        return new Promise(async (resolve, reject) => {
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
        return (await Promise.all(
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
        return new Promise(async (resolve, reject) => {
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
        return new Promise(async (resolve, reject) => {
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
        this.bundled = join(__dirname, 'bin', 'elevate.exe');
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
        await writeFile(tmpBatchFile, `${batch} > ${tmpOutputFile} 2>&1`);
        await writeFile(tmpOutputFile, '');
        return {
            batch: tmpBatchFile, output: tmpOutputFile
        };
    }

    async watchOutput(cp) {
        let self = this,
            output = await readFile(cp.files.output);
        // If we have process then emit watched and stored data to stdout
        cp.stdout.emit('data', output);
        let watcher = watchFile(
                cp.files.output, {persistent: true, interval: 1},
                () => {
                    let stream = createReadStream(
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
        if (this.binary) { return this.binary }

        // Copy applet to temporary directory
        let target = join(this.tmpdir, 'elevate.exe');
        if (!(await stat(target))) {
            await copy(this.bundled, target)
        }
        this.binary = target;
        return this.binary;
    }

    async exec(command, options={}) {
        let self = this, files, output;
        return new Promise(async (resolve, reject) => {
            try {
                await this.prepare();
                files = await self.writeBatch(command, [], options);
                command = `${self.encloseDoubleQuotes(self.binary)} -wait ${files.batch}`;
                // No need to wait exec output because output is redirected to temporary file
                await exec(command, options);
                // Read entire output from redirected file on process exit
                output = await readFile(files.output);
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
        console.log(files);
        await this.prepare();
        console.log(this.binary, sudoArgs, options, {wait: false});
        cp = spawn(this.binary, sudoArgs, options, {wait: false});
        cp.files = files;
        await this.watchOutput(cp);
        console.log(cp);
        return cp;
    }

    clean (cp) {
        unwatchFile(cp.files.output);
        unlink(cp.files.batch);
        unlink(cp.files.output);
    }
}


export {SudoerDarwin, SudoerLinux, SudoerWin32};
