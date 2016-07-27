import {execSync} from 'child_process';
let {platform, argv} = process;

switch (platform) {
    case 'darwin':
    case 'linux':
        execSync(`chmod +x ${argv.slice(2, argv.length).join(' ')}`);
        break;
    default:
        break;
}
