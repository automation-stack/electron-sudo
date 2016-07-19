import {tmpdir} from 'os';
import {normalize, join, dirname} from 'path';
import {createHash} from 'crypto';

import {execFile, readFile, exec, mkdir} from '~/lib/utils';

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

    acquire() {
        return;
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

    async resetCache() {
        await exec('/usr/bin/sudo -k');
        return;
    }
}


class SudoerDarwin extends SudoerUnix {

    constructor(options={}) {

        super(options);
        let self = this;
        // Validate options
        if (!options.name || typeof options.name !== 'string' || !self.isValidName(options.name)) {
            return new Error('options.name must be provided and alphanumeric only (spaces are allowed).');
        }
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

    async exec(command, options={}) {

        return new Promise(async (resolve, reject) => {
            let self = this,
                env = self.prepareEnv(options),
                cmd = ['/usr/bin/sudo -n', env.join(' '), '-s', command].join(' '),
                result;
            try {
                result = await exec(cmd, options);
                resolve(result);
            } catch (err) {
                // Prompt password
                await self.prompt();
                // Try once more
                try {
                    result = await exec(cmd, options);
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
                await self.copy(source, target);
            } catch (err) {
                return reject(err);
            }
            // Create application icon from source
            try {
                await self.icon(target);
            } catch (err) {
                return reject(err);
            }
            // Create property list for application
            try {
                await self.propertyList(target);
            } catch (err) {
                return reject(err);
            }
            // Open UI dialog with password prompt
            try {
                await self.open(target);
            } catch (err) {
                return reject(err);
            }
            // Remove applet from temporary directory
            try {
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
    }
}

class SudoerWin32 extends Sudoer {

}


export {SudoerDarwin, SudoerLinux, SudoerWin32};
