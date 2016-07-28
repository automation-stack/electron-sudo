import chai from 'chai';
import dirtyChai from 'dirty-chai';
import Sudoer from '../dist/index';

let {expect} = chai,
    {platform} = process,
    options = {
        name: 'Electron.Sudo',
        icns: '/Applications/Automator.app/Contents/Resources/AutomatorApplet.icns'
    },
    sudoer = new Sudoer(options);
chai.use(dirtyChai);

describe(`electron-sudo :: ${platform}`, function () {

    this.timeout(100000);
    this.slow(100000);

    if (platform === 'darwin') {
        describe('[exec] with ENV vars', async function () {
            it('should available environment variables', async function () {
                let result = await sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
                expect(result.stdout.trim()).to.be.equals('VALUE');
            });
        });
        describe('[spawn] with ENV vars', async function () {
            it('should available environment variables', async function (done) {
                let cp = await sudoer.spawn('echo', ['$PARAM'], {env: {PARAM: 'VALUE'}});
                cp.on('close', () => {
                    expect(cp.output.stdout.toString().trim()).to.be.equals('VALUE');
                    expect(cp.pid).to.be.a('number');
                    done();
                });
            });
        });
    }

    if (platform === 'linux') {
        describe('[gksudo: exec] with ENV vars', async function () {
            it('should available environment variables', async function () {
                sudoer.binary = './dist/bin/gksudo';
                let result = await sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
                expect(result.stdout.trim()).to.be.equals('VALUE');
            });
        });
        describe('[pkexec: exec] with ENV vars', async function () {
            it('should available environment variables', async function () {
                sudoer.binary = '/usr/bin/pkexec';
                // sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
                // await sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
                let result = await sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
                expect(result.stdout.trim()).to.be.equals('VALUE');
            });
        });
        describe('[gksudo: spawn] with ENV vars', async function () {
            it('should available environment variables', async function (done) {
                sudoer.binary = './dist/bin/gksudo';
                let cp = await sudoer.spawn('echo', ['$PARAM'], {env: {PARAM: 'VALUE'}});
                cp.on('close', () => {
                    expect(cp.output.stdout.toString().trim()).to.be.equals('VALUE');
                    expect(cp.pid).to.be.a('number');
                    done();
                });
            });
        });
        describe('[pkexec: spawn] with ENV vars', async function () {
            it('should available environment variables', async function (done) {
                sudoer.binary = '/usr/bin/pkexec';
                let cp = await sudoer.spawn('echo', ['$PARAM'], {env: {PARAM: 'VALUE'}});
                cp.on('close', () => {
                    expect(cp.output.stdout.toString().trim()).to.be.equals('VALUE');
                    expect(cp.pid).to.be.a('number');
                    done();
                });
            });
        });
    }

    if (platform === 'win32') {
        describe('[exec] with ENV vars', async function () {
            it('should available environment variables', async function () {
                let result = await sudoer.exec('echo %PARAM%', {env: {PARAM: 'VALUE'}});
                expect(result.toString().trim()).to.be.equals('VALUE');
            });
        });
        describe('[spawn] with ENV vars', async function () {
            it('should available environment variables', async function (done) {
                let cp = await sudoer.spawn('echo', ['%PARAM%'], {env: {PARAM: 'VALUE'}});
                cp.on('close', () => {
                    expect(cp.output.stdout.toString().trim()).to.be.equals('VALUE');
                    expect(cp.pid).to.be.a('number');
                    done();
                });
            });
        });
    }


});
