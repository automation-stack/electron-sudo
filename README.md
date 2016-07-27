## Electron subprocess with administrative privileges

[![Join the chat at https://gitter.im/automation-stack/electron-sudo](https://badges.gitter.im/automation-stack/electron-sudo.svg)](https://gitter.im/automation-stack/electron-sudo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Run a subprocess with administrative privileges, prompting the user with a graphical OS dialog if necessary. Useful for background subprocesse which run native Electron apps that need sudo.

`electron-sudo` provides a native OS dialog prompt on **Windows** (UAC), on **OS X** and **Linux** with custom name and optional icon, `has no external dependencies and does not require any native bindings`.

`electron-sudo` is based on [sudo-prompt](https://github.com/jorangreef/sudo-prompt), but fully cross-platform more configurable and adaptive for native Electron applications.

- `Windows`, use native "User Account Control" (UAC)
- `OS X`, use bundled applet
- `Linux`, we try to use system pkexec, gksudo or kdesudo, if it not found then use bundled gksu.

<img height="150px" src="./src/assets/win32.png">
<img height="150px" src="./src/assets/osx.png">
<img height="150px" src="./src/assets/linux.png">

## Platform-specific sources

- [Applet [OSx]](https://github.com/automation-stack/electron-sudo/tree/master/darwin/applet.app/Contents)
- [Elevate.exe sources [Win32/64]](https://github.com/automation-stack/electron-sudo/tree/master/win32/src)
- [GKsu sources [Linux]](https://github.com/automation-stack/electron-sudo/tree/master/linux)

If you don't trust binaries bundled in NPM package you can manually build tools and use them instead.

## Installation
```
npm install electron-sudo
```

## Usage
Note: Your command should not start with the `sudo` prefix.

### Version 4.0.*

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

`electron-sudo` will use `process.title` as `options.name` if `options.name` is not provided. `options.name` must be alphanumeric only (spaces are supported) and at most 70 characters.

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


## Behavior
- ```OS X```, `electron-sudo` should behave just like the `sudo` command in the shell. If your command does not work with the `sudo` command in the shell (perhaps because it uses `>` redirection to a restricted file), then it will not work with `electron-sudo`. However, it is still possible to use electron-sudo to get a privileged shell.

- ```Linux```, `electron-sudo` will use embedded `gksu` to show the password prompt and run your command. Where possible, `electron-sudo` will try and get these to mimic `sudo` as much as possible (for example by preserving environment), but your command should not rely on any environment variables or relative paths, in order to work correctly. Depending on which binary is used, and due to the limitations of some binaries, the name of your program or the command itself may be displayed to your user.

Just as you should never use `sudo` to launch any graphical applications, you should never use `electron-sudo` to launch any graphical applications. Doing so could cause files in your home directory to become owned by root. `electron-sudo` is explicitly designed to launch non-graphical terminal commands. For more information, [read this post](http://www.psychocats.net/ubuntu/graphicalsudo).

## Concurrency
- ```OS X```, you can issue multiple calls to `sudo.exec` concurrently, and `electron-sudo` will batch up multiple permission requests into a single password prompt. These calls will be batched to the extent that they share the same `options.name` and `options.icns` arguments (including the actual content of `options.icns` if provided).

- ```Linux```, `sudo` usually has `tty-tickets` enabled. This prevents `electron-sudo` from batching up multiple permission requests, and will result in a separate password prompt for each call.

- ```Windows```, `sudo` usually use VBS for elevating needed right with UAC. This prevents `electron-sudo` from batching up multiple permission requests, and will result in a separate password prompt for each call.

While `electron-sudo` may batch up calls, you should never rely on `electron-sudo` to execute your calls in order. For example, several calls may be waiting on a password prompt, and the next call after the password prompt may execute before any of these calls. If you need to enforce ordering of calls, then you should explicitly order your calls in your application.
