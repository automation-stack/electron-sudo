## Electron subprocess with administrative privileges

Run a subprocess with administrative privileges, prompting the user with a graphical OS dialog if necessary. Useful for background subprocesse which run native Electron apps that need sudo.

- `Windows`, use native "User Account Control" (UAC)
- `OS X`, use bundled applet
- `Linux`, we try to use system pkexec or gksudo.

<img height="150px" src="./src/assets/win32.png">
<img height="150px" src="./src/assets/osx.png">
<img height="150px" src="./src/assets/linux.png">

## Features
  - Supports ```spawn``` and ```exec``` subprocess behavior
  - Supports applications packaged as ```asar``` archive
  - No external dependencies and does not require any native bindings

## Installation
```
npm install electron-sudo
```

## Usage
**Note: Your command should not start with the ```sudo``` prefix.**

### Version 4.0.*

```js
import Sudoer from 'electron-sudo';

let options = {name: 'electron sudo application'},
    sudoer = new Sudoer(options);
/*
 Spawn subprocess behavior
*/
let cp = await sudoer.spawn(
  'echo', ['$PARAM'], {env: {PARAM: 'VALUE'}}
);
cp.on('close', () => {
  /*
    cp.output.stdout (Buffer)
    cp.output.stderr (Buffer)
  */
});

/*
 Exec subprocess behavior
*/
let result = await sudoer.exec(
  'echo $PARAM', {env: {PARAM: 'VALUE'}}
);
/* result is Buffer with mixed (both stdout and stderr) output */
```

### Version 3.0.* (deprecated)

```js
var sudo = require('electron-sudo');
var options = {
  name: 'Your application name',
  icns: '/path/to/icns/file' // (optional, only for MacOS),
  process: {
    options: {
      // Can use custom environment variables for your privileged subprocess
      env: {'VAR': 'VALUE'}
      // ... and all other subprocess options described here
      // https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
    },
    on: function(ps) {
      ps.stdout.on('data', function(data) {});
      setTimeout(function() {
        ps.kill()
      }.bind(ps), 50000);
    }
  }
};
sudo.exec('echo hello', options, function(error) {});
```

## Tests
```
npm i && npm test
```

## Usage with Webpack

Webpack config should contain ```__dirname``` equals ```true``` for work properly

```js

let nodeModules = fs.readdirSync('./node_modules')
    .filter((module) => {
        return module !== '.bin';
    })
    .reduce((prev, module) => {
        return Object.assign(prev, {[module]: 'commonjs ' + module});
    }, {});

export default {
    ...
    target: 'electron',
    node: {
        /* http://webpack.github.io/docs/configuration.html#node */
        __dirname: true
    },
    externals: nodeModules
};
```

## Concurrency

- ```OS X```, you can issue multiple calls to `sudo.exec` concurrently, and `electron-sudo` will batch up multiple permission requests into a single password prompt. These calls will be batched to the extent that they share the same `options.name` and `options.icns` arguments (including the actual content of `options.icns` if provided).

- ```Linux```, `sudo` usually has `tty-tickets` enabled. This prevents `electron-sudo` from batching up multiple permission requests, and will result in a separate password prompt for each call.

- ```Windows```, `sudo` usually use batch file for elevating needed right with UAC. This prevents `electron-sudo` from batching up multiple permission requests, and will result in a separate password prompt for each call.

While `electron-sudo` may batch up calls, you should never rely on `electron-sudo` to execute your calls in order. For example, several calls may be waiting on a password prompt, and the next call after the password prompt may execute before any of these calls. If you need to enforce ordering of calls, then you should explicitly order your calls in your application.

## Platform-specific sources

- [Applet [OSx]](https://github.com/automation-stack/electron-sudo/tree/master/darwin/applet.app/Contents)
- [Elevate.exe sources [Win32/64]](https://github.com/automation-stack/electron-sudo/tree/master/win32/src)
- [GKsu sources [Linux]](https://github.com/automation-stack/electron-sudo/tree/master/linux)

If you don't trust binaries bundled in NPM package you can manually build tools and use them instead.
