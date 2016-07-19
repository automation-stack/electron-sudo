import {assert} from 'chai';
import Sudoer from '../dist/index';

let options = {test: 1, name: 'aaaa', icns: '/Applications/Chess.app/Contents/Resources/Chess.icns'},
    sudoer = new Sudoer(options);

console.log(sudoer);

async function test() {
    sudoer.exec('echo $TEST', {env: {TEST: 1}}).then((result) => {
        console.log('+ first ready');
        console.log(result);
    });
    let result = await sudoer.exec('cat /var/www/index.html', {env: {TEST: 1}});
    console.log('+ second ready');
    console.log(result);
};

test();
