import {SudoerDarwin, SudoerWin32, SudoerLinux} from '~/lib/sudoer';

export default (() => {
    let {platform} = process;
    switch (platform) {
        case 'darwin':
            return SudoerDarwin;
        case 'win32':
            return SudoerWin32;
        case 'linux':
            return SudoerLinux;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
})();
