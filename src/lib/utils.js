import fs from 'fs';
import child from 'child_process';


function promisify(fn) {
    return function() {
        return new Promise((resolve, reject) => {
            fn(...arguments, function () {
                if (arguments[0] instanceof Error) {
                    reject(arguments[0]);
                } else {
                    resolve(...Array.prototype.slice.call(arguments, 1));
                }
            });
        });
    };
}

async function execFile(cmd, options={}) {
    return new Promise((resolve, reject) => {
        child.execFile(cmd, options || {}, (err, stdout, stderr) => {
            if (err) { return reject(err); }
            return resolve({stdout, stderr});
        });
    });
}

async function exec(cmd, options={}) {
    return new Promise((resolve, reject) => {
        child.exec(cmd, options, (err, stdout, stderr) => {
            if (err) { return reject(err); }
            return resolve({stdout, stderr});
        });
    });
}

async function spawn(cmd, args, options={}) {
    return new Promise((resolve, reject) => {
        let cp = child.spawn(cmd, args, options || {});
        cp.output = { stdout: new Buffer(0), stderr: new Buffer(0) };
        cp.stdout.on('data', (data) => {
            cp.output.stdout = concat(data, cp.output.stdout);
        });
        cp.stderr.on('data', (data) => {
            cp.output.stderr = concat(data, cp.output.stderr);
        });
        cp.on('error', (err) => { return reject(err); });
        cp.on('exit', () => { return resolve(cp); });
    });
}

function concat(source, target) {
    if (!(source instanceof Buffer)) {
        source = new Buffer(source, 'utf8');
    }
    if (!target instanceof Buffer) {
        target = new Buffer(0);
    }
    return Buffer.concat([target, source]);
}

let stat = promisify(fs.stat),
    mkdir = promisify(fs.mkdir),
    readFile = promisify(fs.readFile);


export {readFile, execFile, spawn, exec, mkdir, stat};
