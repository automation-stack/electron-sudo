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

    this.timeout(10000);
    this.slow(10000);

    if (platform === 'darwin') {
        describe('OSx prompt with queuing (only single instance)', async function () {
            it('should prompt single dialog and execute all asyncronously', async function () {
                // Reset password cache
                await sudoer.resetCache();
                let first;
                sudoer.prompt().then((hash) => {
                    first = hash;
                });
                let second = await sudoer.prompt();
                expect(first).to.have.lengthOf(32);
                expect(second).to.be.a.null();
            });
        });
    }

    describe('exec with ENV params', async function () {
        it('should available environment variables', async function () {
            let result = await sudoer.exec('echo $PARAM', {env: {PARAM: 'VALUE'}});
            expect(result.stdout.trim()).to.be.equals('VALUE');
        });
    });


});
