import {tmpdir} from 'os';
import {normalize, join, dirname} from 'path';
import {createHash} from 'crypto';

import {execFile, readFile, exec, mkdir, stat} from '~/lib/utils';

let {platform, env} = process;


class Sudoer {

    constructor(options) {
        this.platform = platform;
        this.options = options;
    }

    escapeDoubleQuotes(string) {
        return string.replace(/"/g, '\\"');
    }

    encloseDoubleQuotes(string) {
        return string.replace(/(.+)/g, '"$1"');
    }
}


class SudoerUnix extends Sudoer {

    constructor(options={}) {
        super(options);
        if (!this.options.name) { this.options.name = 'Electron'; }
    }

    async copy(source, target) {
        return new Promise(async (resolve, reject) => {
            source = this.escapeDoubleQuotes(normalize(source));
            target = this.escapeDoubleQuotes(normalize(target));
            try {
                let result = await exec(`/bin/cp -R -p "${source}" "${target}"`);
                resolve(result);
            }
            catch (err) {
                reject(err);
            }
        });
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

    async acquire() {
        // Acquire elevated rigths and hold it to prevent repeated prompting
        await exec('echo');
        setInterval(async () => {
            await exec('echo');
        }, 1000);
    }

    kill(pid) {
        if (!pid) {
            return;
        } else {
            return;
        }
    }

    async reset() {
        await exec('/usr/bin/sudo -k');
    }
}


class SudoerDarwin extends SudoerUnix {

    constructor(options={}) {
        super(options);
        let self = this;
        // Validate options
        if (options.icns && typeof options.icns !== 'string') {
            throw new Error('options.icns must be a string if provided.');
        } else if (options.icns && options.icns.trim().length === 0) {
            throw new Error('options.icns must be a non-empty string if provided.');
        }
        this.hash = null;
        this.tmpdir = tmpdir();
        this.up = false;
    }

    isValidName(name) {
        // We use 70 characters as a limit to side-step any issues with Unicode
        // normalization form causing a 255 character string to exceed the fs limit.
        return /^[a-z0-9 ]+$/i.test(name) && name.trim().length > 0 && name.length < 70;
    }

    getHash(buffer) {
        let hash = createHash('sha256');
        hash.update('electron-sudo');
        hash.update(this.options.name);
        hash.update(buffer);
        this.hash = hash.digest('hex').slice(-32);
        return this.hash;
    }

    prepareEnv(options) {
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
                env = self.prepareEnv(options),
                sudoCommand = ['/usr/bin/sudo -n', env.join(' '), '-s', command].join(' '),
                result;
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
            // Wait for password if prompt already up
            if (self.up) {
                let intvl = setInterval(() => {
                    if (!self.up) {
                        clearInterval(intvl);
                        return resolve(null);
                    }
                }, 1);
                return;
            }
            // Keep prompt in single instance
            self.up = true;
            // Read ICNS-icon and hash it
            let icon = await self.readIcns(),
                hash = self.getHash(icon);
            // Copy applet to temporary directory
            let source = join(`${__dirname}/../bin`, 'applet.app'),
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
            this.up = false;
            this.hash = null;
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
        // Value must be in single quotes (not double quotes) according to man entry.
        // e.g. defaults write com.companyname.appname "Default Color" '(255, 0, 0)'
        // The defaults command will be changed in an upcoming major release to only
        // operate on preferences domains. General plist manipulation utilities will
        // be folded into a different command-line program.
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
        this.bin = null;
        // We prefer gksudo over pkexec since it gives a nicer prompt:
        this.paths = [
            '/usr/bin/gksudo',
            '/usr/bin/pkexec',
            './src/bin/gksudo'
        ];
    }

    prepareEnv(options) {
        let {env} = options,
            spreaded = [];
        if (env && typeof env == 'object') {
            for (let key in env) {
                spreaded.push(key.concat('=', env[key]));
            }
        }
        return spreaded;
    }

    async getBinary() {
        return Promise.all(
            this.paths.map(async (path) => {
                try {
                    await stat(path);
                    return path;
                } catch (err) {
                    return null;
                }
        }));
    }

    async exec(command, options={}) {
        return new Promise(async (resolve, reject) => {
            let self = this,
                result;
            // Detect utility for sudo mode
            if (!self.binary) {
                self.binary = (await self.getBinary()).filter(v => v)[0];
            }
            if (options.env instanceof Object && !options.env.DISPLAY) {
                // Force DISPLAY variable with default value which is required for UI dialog
                options.env = Object.assign(options.env, {DISPLAY: ':0'});
            }
            let sudo = `"${this.escapeDoubleQuotes(self.binary)}" `;
            if (/gksudo/i.test(self.binary)) {
                sudo += `-d --preserve-env --sudo-mode ` +
                    `--description="${self.escapeDoubleQuotes(self.options.name)}" `;
            } else if (/pkexec/i.test(self.binary)) {
                sudo += '--disable-internal-agent ';
            }
            let sudoCommand = `${sudo} ${command}`;
            try {
                result = await exec(sudoCommand, options);
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        });
    }
}

class SudoerWin32 extends Sudoer {

}


export {SudoerDarwin, SudoerLinux, SudoerWin32};
