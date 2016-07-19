import {readFile as __readFile, mkdir as __mkdir} from 'fs';
import {execFile as __execFile, exec as __exec, spawn as __spawn} from 'child_process';


async function mkdir(path) {

    return new Promise((resolve, reject) => {
        __mkdir(path, (err) => {
            if (err) { return reject(err); }
            return resolve();
        });
    });
}

async function readFile(file) {

    return new Promise((resolve, reject) => {
        __readFile(file, (err, data) => {
            if (err) { return reject(err); }
            return resolve(data);
        });
    });
}

async function execFile(cmd, options={}) {

    return new Promise((resolve, reject) => {
        __execFile(cmd, options || {}, (err, stdout, stderr) => {
            if (err) { return reject(err); }
            return resolve({stdout, stderr});
        });
    });
}

async function exec(cmd, options={}) {

    return new Promise((resolve, reject) => {
        __exec(cmd, options || {}, (err, stdout, stderr) => {
            if (err) { return reject(err); }
            return resolve({stdout, stderr});
        });
    });
}

async function spawn(cmd, args, options={}) {

    return new Promise((resolve, reject) => {
        let cp = __spawn(cmd, args, options || {});
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


export {readFile, execFile, spawn, exec, mkdir};
