import chai from 'chai';
import dirtyChai from 'dirty-chai';
import Sudoer from '../dist/index';

let {expect} = chai,
    {platform} = process,
    options = {
        name: 'Sudo application',
        icns: '/Applications/Chess.app/Contents/Resources/Chess.icns'
    },
    sudoer = new Sudoer(options);
chai.use(dirtyChai);

describe(`electron-sudo :: ${platform}`, function () {

    this.timeout(100000);
    this.slow(100000);

    if (platform === 'darwin') {
        describe('OSx prompt with queuing (only single instance)', async function () {
            it('should prompt single dialog and execute all asyncronously', async function () {
                let first, second;
                sudoer.prompt().then((hash) => {
                    first = hash;
                    expect(first).to.have.lengthOf(32);
                });
                second = await sudoer.prompt();
                expect(second).to.be.a.null();
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
                sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
                await sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
                let result = await sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
                expect(result.stdout.trim()).to.be.equals('VALUE');
            });
        });
    }

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


});
