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

async function exec(cmd, options={}) {
    return new Promise((resolve, reject) => {
        child.exec(cmd, options, (err, stdout, stderr) => {
            if (err) { return reject(err); }
            return resolve({stdout, stderr});
        });
    });
}

function spawn(cmd, args, options={}) {
    let cp = child.spawn(cmd, args, {...options, shell: true});
    cp.output = { stdout: new Buffer(0), stderr: new Buffer(0) };
    cp.stdout.on('data', (data) => {
        cp.output.stdout = concat(data, cp.output.stdout);
    });
    cp.stderr.on('data', (data) => {
        cp.output.stderr = concat(data, cp.output.stderr);
    });
    return cp;
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

async function stat(target) {
    let _stat = promisify(fs.stat);
    try {
        let fileStat = await _stat(target);
        return fileStat;
    } catch (err) {
        return null;
    }
}

let open = promisify(fs.open),
    mkdir = promisify(fs.mkdir),
    readFile = promisify(fs.readFile),
    writeFile = promisify(fs.writeFile);


export {readFile, writeFile, spawn, exec, mkdir, stat, open};
