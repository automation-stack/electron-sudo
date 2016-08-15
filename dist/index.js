/*! require("source-map-support").install(); */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("regenerator-runtime"), require("bluebird"), require("os"), require("fs"), require("path"), require("crypto"), require("child_process"));
	else if(typeof define === 'function' && define.amd)
		define(["regenerator-runtime", "bluebird", "os", "fs", "path", "crypto", "child_process"], factory);
	else if(typeof exports === 'object')
		exports["electron-sudo"] = factory(require("regenerator-runtime"), require("bluebird"), require("os"), require("fs"), require("path"), require("crypto"), require("child_process"));
	else
		root["electron-sudo"] = factory(root["regenerator-runtime"], root["bluebird"], root["os"], root["fs"], root["path"], root["crypto"], root["child_process"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_64__, __WEBPACK_EXTERNAL_MODULE_81__, __WEBPACK_EXTERNAL_MODULE_117__, __WEBPACK_EXTERNAL_MODULE_118__, __WEBPACK_EXTERNAL_MODULE_119__, __WEBPACK_EXTERNAL_MODULE_120__, __WEBPACK_EXTERNAL_MODULE_123__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _sudoer=__webpack_require__(2);exports.default=function(){var _process=process;var platform=_process.platform;switch(platform){case'darwin':return _sudoer.SudoerDarwin;case'win32':return _sudoer.SudoerWin32;case'linux':return _sudoer.SudoerLinux;default:throw new Error('Unsupported platform: '+platform);}}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.SudoerWin32=exports.SudoerLinux=exports.SudoerDarwin=undefined;var _assign=__webpack_require__(3);var _assign2=_interopRequireDefault(_assign);var _toConsumableArray2=__webpack_require__(40);var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _regenerator=__webpack_require__(63);var _regenerator2=_interopRequireDefault(_regenerator);var _promise=__webpack_require__(65);var _promise2=_interopRequireDefault(_promise);var _bluebird=__webpack_require__(81);var _getPrototypeOf=__webpack_require__(82);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _possibleConstructorReturn2=__webpack_require__(86);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=__webpack_require__(104);var _inherits3=_interopRequireDefault(_inherits2);var _typeof2=__webpack_require__(87);var _typeof3=_interopRequireDefault(_typeof2);var _classCallCheck2=__webpack_require__(112);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(113);var _createClass3=_interopRequireDefault(_createClass2);var _os=__webpack_require__(117);var _fs=__webpack_require__(118);var _path=__webpack_require__(119);var _crypto=__webpack_require__(120);var _utils=__webpack_require__(121);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _process=process;var platform=_process.platform;var env=_process.env;var Sudoer=function(){function Sudoer(options){(0,_classCallCheck3.default)(this,Sudoer);this.platform=platform;this.options=options;this.cp=null;this.tmpdir=(0,_os.tmpdir)();}(0,_createClass3.default)(Sudoer,[{key:'hash',value:function hash(buffer){var hash=(0,_crypto.createHash)('sha256');hash.update('electron-sudo');hash.update(this.options.name||'');hash.update(buffer||new Buffer(0));return hash.digest('hex').slice(-32);}},{key:'joinEnv',value:function joinEnv(options){var env=options.env;var spreaded=[];if(env&&(typeof env==='undefined'?'undefined':(0,_typeof3.default)(env))=='object'){for(var key in env){spreaded.push(key.concat('=',env[key]));}}return spreaded;}},{key:'escapeDoubleQuotes',value:function escapeDoubleQuotes(string){return string.replace(/"/g,'\\"');}},{key:'encloseDoubleQuotes',value:function encloseDoubleQuotes(string){return string.replace(/(.+)/g,'"$1"');}},{key:'kill',value:function kill(pid){if(!pid){return;}else{return;}}}]);return Sudoer;}();var SudoerUnix=function(_Sudoer){(0,_inherits3.default)(SudoerUnix,_Sudoer);function SudoerUnix(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];(0,_classCallCheck3.default)(this,SudoerUnix);var _this=(0,_possibleConstructorReturn3.default)(this,(0,_getPrototypeOf2.default)(SudoerUnix).call(this,options));if(!_this.options.name){_this.options.name='Electron';}return _this;}(0,_createClass3.default)(SudoerUnix,[{key:'copy',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee2(source,target){var _this2=this;return _regenerator2.default.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:return _context2.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee(resolve,reject){var result;return _regenerator2.default.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:source=_this2.escapeDoubleQuotes((0,_path.normalize)(source));target=_this2.escapeDoubleQuotes((0,_path.normalize)(target));_context.prev=2;_context.next=5;return(0,_utils.exec)('/bin/cp -R -p "'+source+'" "'+target+'"');case 5:result=_context.sent;resolve(result);_context.next=12;break;case 9:_context.prev=9;_context.t0=_context['catch'](2);reject(_context.t0);case 12:case'end':return _context.stop();}}},_callee,_this2,[[2,9]]);}));return function(_x4,_x5){return ref.apply(this,arguments);};}()));case 1:case'end':return _context2.stop();}}},_callee2,this);}));function copy(_x2,_x3){return ref.apply(this,arguments);}return copy;}()},{key:'remove',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee4(target){var _this3=this;var self;return _regenerator2.default.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:self=this;return _context4.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee3(resolve,reject){var result;return _regenerator2.default.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:if(target.startsWith(self.tmpdir)){_context3.next=2;break;}throw new Error('Try to remove suspicious target: '+target+'.');case 2:target=_this3.escapeDoubleQuotes((0,_path.normalize)(target));_context3.prev=3;_context3.next=6;return(0,_utils.exec)('rm -rf "'+target+'"');case 6:result=_context3.sent;resolve(result);_context3.next=13;break;case 10:_context3.prev=10;_context3.t0=_context3['catch'](3);reject(_context3.t0);case 13:case'end':return _context3.stop();}}},_callee3,_this3,[[3,10]]);}));return function(_x7,_x8){return ref.apply(this,arguments);};}()));case 2:case'end':return _context4.stop();}}},_callee4,this);}));function remove(_x6){return ref.apply(this,arguments);}return remove;}()},{key:'reset',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee5(){return _regenerator2.default.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.next=2;return(0,_utils.exec)('/usr/bin/sudo -k');case 2:case'end':return _context5.stop();}}},_callee5,this);}));function reset(){return ref.apply(this,arguments);}return reset;}()}]);return SudoerUnix;}(Sudoer);var SudoerDarwin=function(_SudoerUnix){(0,_inherits3.default)(SudoerDarwin,_SudoerUnix);function SudoerDarwin(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];(0,_classCallCheck3.default)(this,SudoerDarwin);var _this4=(0,_possibleConstructorReturn3.default)(this,(0,_getPrototypeOf2.default)(SudoerDarwin).call(this,options));if(options.icns&&typeof options.icns!=='string'){throw new Error('options.icns must be a string if provided.');}else if(options.icns&&options.icns.trim().length===0){throw new Error('options.icns must be a non-empty string if provided.');}_this4.up=false;return _this4;}(0,_createClass3.default)(SudoerDarwin,[{key:'isValidName',value:function isValidName(name){return /^[a-z0-9 ]+$/i.test(name)&&name.trim().length>0&&name.length<70;}},{key:'joinEnv',value:function joinEnv(options){var env=options.env;var spreaded=[];if(env&&(typeof env==='undefined'?'undefined':(0,_typeof3.default)(env))=='object'){for(var key in env){spreaded.push(key.concat('=',env[key]));}}return spreaded;}},{key:'exec',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee7(command){var _this5=this;var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];return _regenerator2.default.wrap(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:return _context7.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee6(resolve,reject){var self,env,sudoCommand,result;return _regenerator2.default.wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:self=_this5,env=self.joinEnv(options),sudoCommand=['/usr/bin/sudo -n',env.join(' '),'-s',command].join(' '),result=void 0;_context6.next=3;return self.reset();case 3:_context6.prev=3;_context6.next=6;return(0,_utils.exec)(sudoCommand,options);case 6:result=_context6.sent;resolve(result);_context6.next=24;break;case 10:_context6.prev=10;_context6.t0=_context6['catch'](3);_context6.prev=12;_context6.next=15;return self.prompt();case 15:_context6.next=17;return(0,_utils.exec)(sudoCommand,options);case 17:result=_context6.sent;resolve(result);_context6.next=24;break;case 21:_context6.prev=21;_context6.t1=_context6['catch'](12);reject(_context6.t1);case 24:case'end':return _context6.stop();}}},_callee6,_this5,[[3,10],[12,21]]);}));return function(_x13,_x14){return ref.apply(this,arguments);};}()));case 1:case'end':return _context7.stop();}}},_callee7,this);}));function exec(_x10,_x11){return ref.apply(this,arguments);}return exec;}()},{key:'spawn',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee10(command,args){var _this6=this;var options=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];return _regenerator2.default.wrap(function _callee10$(_context10){while(1){switch(_context10.prev=_context10.next){case 0:return _context10.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee9(resolve,reject){var self,bin,cp;return _regenerator2.default.wrap(function _callee9$(_context9){while(1){switch(_context9.prev=_context9.next){case 0:self=_this6,bin='/usr/bin/sudo',cp=void 0;_context9.next=3;return self.reset();case 3:_context9.next=5;return self.prompt();case 5:cp=(0,_utils.spawn)(bin,['-n','-s','-E',[command].concat((0,_toConsumableArray3.default)(args)).join(' ')],options);cp.on('error',function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee8(err){return _regenerator2.default.wrap(function _callee8$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:reject(err);case 1:case'end':return _context8.stop();}}},_callee8,_this6);}));return function(_x21){return ref.apply(this,arguments);};}());self.cp=cp;resolve(cp);case 9:case'end':return _context9.stop();}}},_callee9,_this6);}));return function(_x19,_x20){return ref.apply(this,arguments);};}()));case 1:case'end':return _context10.stop();}}},_callee10,this);}));function spawn(_x15,_x16,_x17){return ref.apply(this,arguments);}return spawn;}()},{key:'prompt',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee12(){var _this7=this;var self;return _regenerator2.default.wrap(function _callee12$(_context12){while(1){switch(_context12.prev=_context12.next){case 0:self=this;return _context12.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee11(resolve,reject){var icon,hash,source,target;return _regenerator2.default.wrap(function _callee11$(_context11){while(1){switch(_context11.prev=_context11.next){case 0:if(self.tmpdir){_context11.next=2;break;}return _context11.abrupt('return',reject(new Error('Requires os.tmpdir() to be defined.')));case 2:if(env.USER){_context11.next=4;break;}return _context11.abrupt('return',reject(new Error('Requires env[\'USER\'] to be defined.')));case 4:// Keep prompt in single instance
	self.up=true;// Read ICNS-icon and hash it
	_context11.next=7;return self.readIcns();case 7:icon=_context11.sent;hash=self.hash(icon);// Copy applet to temporary directory
	source=(0,_path.join)((0,_path.dirname)(__filename)+'/bin','applet.app'),target=(0,_path.join)(self.tmpdir,hash,self.options.name+'.app');console.log(source,target);_context11.prev=11;_context11.next=14;return(0,_utils.mkdir)((0,_path.dirname)(target));case 14:_context11.next=20;break;case 16:_context11.prev=16;_context11.t0=_context11['catch'](11);if(!(_context11.t0.code!=='EEXIST')){_context11.next=20;break;}return _context11.abrupt('return',reject(_context11.t0));case 20:_context11.prev=20;_context11.next=23;return self.copy(source,target);case 23:_context11.next=25;return self.icon(target);case 25:_context11.next=27;return self.propertyList(target);case 27:_context11.next=29;return self.open(target);case 29:_context11.next=31;return self.remove(target);case 31:_context11.next=36;break;case 33:_context11.prev=33;_context11.t1=_context11['catch'](20);return _context11.abrupt('return',reject(_context11.t1));case 36:return _context11.abrupt('return',resolve(hash));case 37:case'end':return _context11.stop();}}},_callee11,_this7,[[11,16],[20,33]]);}));return function(_x22,_x23){return ref.apply(this,arguments);};}()));case 2:case'end':return _context12.stop();}}},_callee12,this);}));function prompt(){return ref.apply(this,arguments);}return prompt;}()},{key:'icon',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee14(target){var _this8=this;var self;return _regenerator2.default.wrap(function _callee14$(_context14){while(1){switch(_context14.prev=_context14.next){case 0:self=this;return _context14.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee13(resolve,reject){var result;return _regenerator2.default.wrap(function _callee13$(_context13){while(1){switch(_context13.prev=_context13.next){case 0:if(_this8.options.icns){_context13.next=2;break;}return _context13.abrupt('return',resolve());case 2:_context13.next=4;return self.copy(_this8.options.icns,(0,_path.join)(target,'Contents','Resources','applet.icns'));case 4:result=_context13.sent;return _context13.abrupt('return',resolve(result));case 6:case'end':return _context13.stop();}}},_callee13,_this8);}));return function(_x25,_x26){return ref.apply(this,arguments);};}()));case 2:case'end':return _context14.stop();}}},_callee14,this);}));function icon(_x24){return ref.apply(this,arguments);}return icon;}()},{key:'open',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee16(target){var _this9=this;var self;return _regenerator2.default.wrap(function _callee16$(_context16){while(1){switch(_context16.prev=_context16.next){case 0:self=this;return _context16.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee15(resolve,reject){var result;return _regenerator2.default.wrap(function _callee15$(_context15){while(1){switch(_context15.prev=_context15.next){case 0:target=self.escapeDoubleQuotes((0,_path.normalize)(target));_context15.prev=1;_context15.next=4;return(0,_utils.exec)('open -n -W "'+target+'"');case 4:result=_context15.sent;return _context15.abrupt('return',resolve(result));case 8:_context15.prev=8;_context15.t0=_context15['catch'](1);return _context15.abrupt('return',reject(_context15.t0));case 11:case'end':return _context15.stop();}}},_callee15,_this9,[[1,8]]);}));return function(_x28,_x29){return ref.apply(this,arguments);};}()));case 2:case'end':return _context16.stop();}}},_callee16,this);}));function open(_x27){return ref.apply(this,arguments);}return open;}()},{key:'readIcns',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee18(icnsPath){var _this10=this;return _regenerator2.default.wrap(function _callee18$(_context18){while(1){switch(_context18.prev=_context18.next){case 0:return _context18.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee17(resolve,reject){var data;return _regenerator2.default.wrap(function _callee17$(_context17){while(1){switch(_context17.prev=_context17.next){case 0:if(!(!icnsPath||platform!=='darwin')){_context17.next=2;break;}return _context17.abrupt('return',resolve(new Buffer(0)));case 2:_context17.prev=2;_context17.next=5;return(0,_utils.readFile)(icnsPath);case 5:data=_context17.sent;return _context17.abrupt('return',resolve(data));case 9:_context17.prev=9;_context17.t0=_context17['catch'](2);return _context17.abrupt('return',reject(_context17.t0));case 12:case'end':return _context17.stop();}}},_callee17,_this10,[[2,9]]);}));return function(_x31,_x32){return ref.apply(this,arguments);};}()));case 1:case'end':return _context18.stop();}}},_callee18,this);}));function readIcns(_x30){return ref.apply(this,arguments);}return readIcns;}()},{key:'propertyList',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee20(target){var _this11=this;var self;return _regenerator2.default.wrap(function _callee20$(_context20){while(1){switch(_context20.prev=_context20.next){case 0:self=this;return _context20.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee19(resolve,reject){var path,key,value,result;return _regenerator2.default.wrap(function _callee19$(_context19){while(1){switch(_context19.prev=_context19.next){case 0:path=self.escapeDoubleQuotes((0,_path.join)(target,'Contents','Info.plist')),key=self.escapeDoubleQuotes('CFBundleName'),value=self.options.name+' Password Prompt';if(!/'/.test(value)){_context19.next=3;break;}return _context19.abrupt('return',reject(new Error('Value should not contain single quotes.')));case 3:_context19.next=5;return(0,_utils.exec)('defaults write "'+path+'" "'+key+'" \''+value+'\'');case 5:result=_context19.sent;return _context19.abrupt('return',resolve(result));case 7:case'end':return _context19.stop();}}},_callee19,_this11);}));return function(_x34,_x35){return ref.apply(this,arguments);};}()));case 2:case'end':return _context20.stop();}}},_callee20,this);}));function propertyList(_x33){return ref.apply(this,arguments);}return propertyList;}()}]);return SudoerDarwin;}(SudoerUnix);var SudoerLinux=function(_SudoerUnix2){(0,_inherits3.default)(SudoerLinux,_SudoerUnix2);function SudoerLinux(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];(0,_classCallCheck3.default)(this,SudoerLinux);var _this12=(0,_possibleConstructorReturn3.default)(this,(0,_getPrototypeOf2.default)(SudoerLinux).call(this,options));_this12.binary=null;// We prefer gksudo over pkexec since it gives a nicer prompt:
	_this12.paths=['/usr/bin/gksudo','/usr/bin/pkexec','./bin/gksudo'];return _this12;}(0,_createClass3.default)(SudoerLinux,[{key:'getBinary',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee22(){var _this13=this;return _regenerator2.default.wrap(function _callee22$(_context22){while(1){switch(_context22.prev=_context22.next){case 0:_context22.next=2;return _promise2.default.all(this.paths.map(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee21(path){return _regenerator2.default.wrap(function _callee21$(_context21){while(1){switch(_context21.prev=_context21.next){case 0:_context21.prev=0;_context21.next=3;return(0,_utils.stat)(path);case 3:path=_context21.sent;return _context21.abrupt('return',path);case 7:_context21.prev=7;_context21.t0=_context21['catch'](0);return _context21.abrupt('return',null);case 10:case'end':return _context21.stop();}}},_callee21,_this13,[[0,7]]);}));return function(_x37){return ref.apply(this,arguments);};}()));case 2:_context22.t0=function(v){return v;};return _context22.abrupt('return',_context22.sent.filter(_context22.t0)[0]);case 4:case'end':return _context22.stop();}}},_callee22,this);}));function getBinary(){return ref.apply(this,arguments);}return getBinary;}()},{key:'exec',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee24(command){var _this14=this;var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];return _regenerator2.default.wrap(function _callee24$(_context24){while(1){switch(_context24.prev=_context24.next){case 0:return _context24.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee23(resolve,reject){var self,result,flags;return _regenerator2.default.wrap(function _callee23$(_context23){while(1){switch(_context23.prev=_context23.next){case 0:self=_this14,result=void 0;/* Detect utility for sudo mode */if(self.binary){_context23.next=5;break;}_context23.next=4;return self.getBinary();case 4:self.binary=_context23.sent;case 5:if(options.env instanceof Object&&!options.env.DISPLAY){// Force DISPLAY variable with default value which is required for UI dialog
	options.env=(0,_assign2.default)(options.env,{DISPLAY:':0'});}flags=void 0;if(/gksudo/i.test(self.binary)){flags='--preserve-env --sudo-mode '+('--description="'+self.escapeDoubleQuotes(self.options.name)+'"');}else if(/pkexec/i.test(self.binary)){flags='--disable-internal-agent';}command=_this14.binary+' '+flags+' '+command;_context23.prev=9;_context23.next=12;return(0,_utils.exec)(command,options);case 12:result=_context23.sent;return _context23.abrupt('return',resolve(result));case 16:_context23.prev=16;_context23.t0=_context23['catch'](9);return _context23.abrupt('return',reject(_context23.t0));case 19:case'end':return _context23.stop();}}},_callee23,_this14,[[9,16]]);}));return function(_x41,_x42){return ref.apply(this,arguments);};}()));case 1:case'end':return _context24.stop();}}},_callee24,this);}));function exec(_x38,_x39){return ref.apply(this,arguments);}return exec;}()},{key:'spawn',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee26(command,args){var _this15=this;var options=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];var self;return _regenerator2.default.wrap(function _callee26$(_context26){while(1){switch(_context26.prev=_context26.next){case 0:self=this;return _context26.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee25(resolve,reject){var sudoArgs,cp;return _regenerator2.default.wrap(function _callee25$(_context25){while(1){switch(_context25.prev=_context25.next){case 0:if(self.binary){_context25.next=5;break;}_context25.next=3;return self.getBinary();case 3:_context25.t0=function(v){return v;};self.binary=_context25.sent.filter(_context25.t0)[0];case 5:if(options.env instanceof Object&&!options.env.DISPLAY){// Force DISPLAY variable with default value which is required for UI dialog
	options.env=(0,_assign2.default)(options.env,{DISPLAY:':0'});}// In order to guarantee succees execution we'll use execFile
	// due to fallback binary bundled in package
	sudoArgs=[];if(/gksudo/i.test(self.binary)){sudoArgs.push('--preserve-env');sudoArgs.push('--sudo-mode');sudoArgs.push('--description="'+self.escapeDoubleQuotes(self.options.name)+'"');sudoArgs.push('--sudo-mode');}else if(/pkexec/i.test(self.binary)){sudoArgs.push('--disable-internal-agent');}sudoArgs.push(command);sudoArgs.push(args);_context25.prev=10;cp=(0,_utils.spawn)(self.binary,sudoArgs,options);return _context25.abrupt('return',resolve(cp));case 15:_context25.prev=15;_context25.t1=_context25['catch'](10);return _context25.abrupt('return',reject(_context25.t1));case 18:case'end':return _context25.stop();}}},_callee25,_this15,[[10,15]]);}));return function(_x47,_x48){return ref.apply(this,arguments);};}()));case 2:case'end':return _context26.stop();}}},_callee26,this);}));function spawn(_x43,_x44,_x45){return ref.apply(this,arguments);}return spawn;}()}]);return SudoerLinux;}(SudoerUnix);var SudoerWin32=function(_Sudoer2){(0,_inherits3.default)(SudoerWin32,_Sudoer2);function SudoerWin32(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];(0,_classCallCheck3.default)(this,SudoerWin32);var _this16=(0,_possibleConstructorReturn3.default)(this,(0,_getPrototypeOf2.default)(SudoerWin32).call(this,options));_this16.bundled='src\\bin\\elevate.exe';_this16.binary=null;return _this16;}(0,_createClass3.default)(SudoerWin32,[{key:'writeBatch',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee27(command,args,options){var tmpDir,tmpBatchFile,tmpOutputFile,env,batch;return _regenerator2.default.wrap(function _callee27$(_context27){while(1){switch(_context27.prev=_context27.next){case 0:_context27.next=2;return(0,_utils.exec)('echo %temp%');case 2:tmpDir=_context27.sent.stdout.toString().replace(/\r\n$/,'');tmpBatchFile=tmpDir+'\\batch-'+Math.random()+'.bat';tmpOutputFile=tmpDir+'\\output-'+Math.random();env=this.joinEnv(options);batch='setlocal enabledelayedexpansion\r\n';if(env.length){batch+='set '+env.join('\r\nset ')+'\r\n';}if(args&&args.length){batch+=command+' '+args.join(' ');}else{batch+=command;}_context27.next=11;return(0,_utils.writeFile)(tmpBatchFile,batch+' > '+tmpOutputFile+' 2>&1');case 11:_context27.next=13;return(0,_utils.writeFile)(tmpOutputFile,'');case 13:return _context27.abrupt('return',{batch:tmpBatchFile,output:tmpOutputFile});case 14:case'end':return _context27.stop();}}},_callee27,this);}));function writeBatch(_x50,_x51,_x52){return ref.apply(this,arguments);}return writeBatch;}()},{key:'watchOutput',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee28(cp){var self,output,watcher;return _regenerator2.default.wrap(function _callee28$(_context28){while(1){switch(_context28.prev=_context28.next){case 0:self=this;_context28.next=3;return(0,_utils.readFile)(cp.files.output);case 3:output=_context28.sent;// If we have process then emit watched and stored data to stdout
	cp.stdout.emit('data',output);watcher=(0,_fs.watchFile)(cp.files.output,{persistent:true,interval:1},function(){var stream=(0,_fs.createReadStream)(cp.files.output,{start:watcher.last}),size=0;stream.on('data',function(data){size+=data.length;if(cp){cp.stdout.emit('data',data);}});stream.on('close',function(){cp.last+=size;});});cp.last=output.length;cp.on('exit',function(){self.clean(cp);});return _context28.abrupt('return',cp);case 9:case'end':return _context28.stop();}}},_callee28,this);}));function watchOutput(_x53){return ref.apply(this,arguments);}return watchOutput;}()},{key:'prepare',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee30(){var _this17=this;var self;return _regenerator2.default.wrap(function _callee30$(_context30){while(1){switch(_context30.prev=_context30.next){case 0:self=this;return _context30.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee29(resolve,reject){var target,copied;return _regenerator2.default.wrap(function _callee29$(_context29){while(1){switch(_context29.prev=_context29.next){case 0:if(!self.binary){_context29.next=2;break;}return _context29.abrupt('return',resolve(self.binary));case 2:// Copy applet to temporary directory
	target=(0,_path.join)(_this17.tmpdir,'elevate.exe');_context29.next=5;return(0,_utils.stat)(target);case 5:if(_context29.sent){_context29.next=12;break;}copied=(0,_fs.createWriteStream)(target);(0,_fs.createReadStream)(self.bundled).pipe(copied);copied.on('close',function(){self.binary=target;return resolve(self.binary);});copied.on('error',function(err){return reject(err);});_context29.next=14;break;case 12:self.binary=target;resolve(self.binary);case 14:case'end':return _context29.stop();}}},_callee29,_this17);}));return function(_x54,_x55){return ref.apply(this,arguments);};}()));case 2:case'end':return _context30.stop();}}},_callee30,this);}));function prepare(){return ref.apply(this,arguments);}return prepare;}()},{key:'exec',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee32(command){var _this18=this;var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var self,files,output;return _regenerator2.default.wrap(function _callee32$(_context32){while(1){switch(_context32.prev=_context32.next){case 0:self=this,files=void 0,output=void 0;return _context32.abrupt('return',new _promise2.default(function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee31(resolve,reject){return _regenerator2.default.wrap(function _callee31$(_context31){while(1){switch(_context31.prev=_context31.next){case 0:_context31.prev=0;_context31.next=3;return _this18.prepare();case 3:_context31.next=5;return self.writeBatch(command,[],options);case 5:files=_context31.sent;command=self.encloseDoubleQuotes(self.binary)+' -wait '+files.batch;// No need to wait exec output because output is redirected to temporary file
	_context31.next=9;return(0,_utils.exec)(command,options);case 9:_context31.next=11;return(0,_utils.readFile)(files.output);case 11:output=_context31.sent;return _context31.abrupt('return',resolve(output));case 15:_context31.prev=15;_context31.t0=_context31['catch'](0);return _context31.abrupt('return',reject(_context31.t0));case 18:case'end':return _context31.stop();}}},_callee31,_this18,[[0,15]]);}));return function(_x59,_x60){return ref.apply(this,arguments);};}()));case 2:case'end':return _context32.stop();}}},_callee32,this);}));function exec(_x56,_x57){return ref.apply(this,arguments);}return exec;}()},{key:'spawn',value:function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee33(command,args){var options=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];var files,sudoArgs,cp;return _regenerator2.default.wrap(function _callee33$(_context33){while(1){switch(_context33.prev=_context33.next){case 0:_context33.next=2;return this.writeBatch(command,args,options);case 2:files=_context33.sent;sudoArgs=[];cp=void 0;sudoArgs.push('-wait');sudoArgs.push(files.batch);_context33.next=9;return this.prepare();case 9:cp=(0,_utils.spawn)(this.binary,sudoArgs,options,{wait:false});cp.files=files;_context33.next=13;return this.watchOutput(cp);case 13:return _context33.abrupt('return',cp);case 14:case'end':return _context33.stop();}}},_callee33,this);}));function spawn(_x61,_x62,_x63){return ref.apply(this,arguments);}return spawn;}()},{key:'clean',value:function clean(cp){(0,_fs.unwatchFile)(cp.files.output);(0,_fs.unlink)(cp.files.batch);(0,_fs.unlink)(cp.files.output);}}]);return SudoerWin32;}(Sudoer);exports.SudoerDarwin=SudoerDarwin;exports.SudoerLinux=SudoerLinux;exports.SudoerWin32=SudoerWin32;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = __webpack_require__(8).Object.assign;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(21)});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(22)
	  , gOPS     = __webpack_require__(37)
	  , pIE      = __webpack_require__(38)
	  , toObject = __webpack_require__(39)
	  , IObject  = __webpack_require__(26)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(17)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(23)
	  , enumBugKeys = __webpack_require__(36);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(24)
	  , toIObject    = __webpack_require__(25)
	  , arrayIndexOf = __webpack_require__(29)(false)
	  , IE_PROTO     = __webpack_require__(33)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(26)
	  , defined = __webpack_require__(28);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(27);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(25)
	  , toLength  = __webpack_require__(30)
	  , toIndex   = __webpack_require__(32);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(31)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(31)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys')
	  , uid    = __webpack_require__(35);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 37 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 38 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(28);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(41);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(43);
	__webpack_require__(56);
	module.exports = __webpack_require__(8).Array.from;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(44)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(45)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(31)
	  , defined   = __webpack_require__(28);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(46)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(47)
	  , hide           = __webpack_require__(11)
	  , has            = __webpack_require__(24)
	  , Iterators      = __webpack_require__(48)
	  , $iterCreate    = __webpack_require__(49)
	  , setToStringTag = __webpack_require__(53)
	  , getPrototypeOf = __webpack_require__(55)
	  , ITERATOR       = __webpack_require__(54)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(50)
	  , descriptor     = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(53)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(54)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(13)
	  , dPs         = __webpack_require__(51)
	  , enumBugKeys = __webpack_require__(36)
	  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(52).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(12)
	  , anObject = __webpack_require__(13)
	  , getKeys  = __webpack_require__(22);

	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).document && document.documentElement;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(12).f
	  , has = __webpack_require__(24)
	  , TAG = __webpack_require__(54)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(34)('wks')
	  , uid        = __webpack_require__(35)
	  , Symbol     = __webpack_require__(7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(24)
	  , toObject    = __webpack_require__(39)
	  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(9)
	  , $export        = __webpack_require__(6)
	  , toObject       = __webpack_require__(39)
	  , call           = __webpack_require__(57)
	  , isArrayIter    = __webpack_require__(58)
	  , toLength       = __webpack_require__(30)
	  , createProperty = __webpack_require__(59)
	  , getIterFn      = __webpack_require__(60);

	$export($export.S + $export.F * !__webpack_require__(62)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(13);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(48)
	  , ITERATOR   = __webpack_require__(54)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(12)
	  , createDesc      = __webpack_require__(20);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(61)
	  , ITERATOR  = __webpack_require__(54)('iterator')
	  , Iterators = __webpack_require__(48);
	module.exports = __webpack_require__(8).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(27)
	  , TAG = __webpack_require__(54)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(54)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(64);


/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("regenerator-runtime");

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(43);
	__webpack_require__(68);
	__webpack_require__(72);
	module.exports = __webpack_require__(8).Promise;

/***/ },
/* 67 */
/***/ function(module, exports) {

	

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	var global        = __webpack_require__(7)
	  , hide          = __webpack_require__(11)
	  , Iterators     = __webpack_require__(48)
	  , TO_STRING_TAG = __webpack_require__(54)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(70)
	  , step             = __webpack_require__(71)
	  , Iterators        = __webpack_require__(48)
	  , toIObject        = __webpack_require__(25);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(45)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(46)
	  , global             = __webpack_require__(7)
	  , ctx                = __webpack_require__(9)
	  , classof            = __webpack_require__(61)
	  , $export            = __webpack_require__(6)
	  , isObject           = __webpack_require__(14)
	  , aFunction          = __webpack_require__(10)
	  , anInstance         = __webpack_require__(73)
	  , forOf              = __webpack_require__(74)
	  , speciesConstructor = __webpack_require__(75)
	  , task               = __webpack_require__(76).set
	  , microtask          = __webpack_require__(78)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(54)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(79)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(53)($Promise, PROMISE);
	__webpack_require__(80)(PROMISE);
	Wrapper = __webpack_require__(8)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(62)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(9)
	  , call        = __webpack_require__(57)
	  , isArrayIter = __webpack_require__(58)
	  , anObject    = __webpack_require__(13)
	  , toLength    = __webpack_require__(30)
	  , getIterFn   = __webpack_require__(60)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(13)
	  , aFunction = __webpack_require__(10)
	  , SPECIES   = __webpack_require__(54)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(9)
	  , invoke             = __webpack_require__(77)
	  , html               = __webpack_require__(52)
	  , cel                = __webpack_require__(18)
	  , global             = __webpack_require__(7)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(27)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , macrotask = __webpack_require__(76).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(27)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(11);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(7)
	  , core        = __webpack_require__(8)
	  , dP          = __webpack_require__(12)
	  , DESCRIPTORS = __webpack_require__(16)
	  , SPECIES     = __webpack_require__(54)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	module.exports = __webpack_require__(8).Object.getPrototypeOf;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(39)
	  , $getPrototypeOf = __webpack_require__(55);

	__webpack_require__(85)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(6)
	  , core    = __webpack_require__(8)
	  , fails   = __webpack_require__(17);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(87);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(88);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(91);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(43);
	__webpack_require__(68);
	module.exports = __webpack_require__(90).f('iterator');

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(54);

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	__webpack_require__(67);
	__webpack_require__(102);
	__webpack_require__(103);
	module.exports = __webpack_require__(8).Symbol;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(7)
	  , has            = __webpack_require__(24)
	  , DESCRIPTORS    = __webpack_require__(16)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(47)
	  , META           = __webpack_require__(94).KEY
	  , $fails         = __webpack_require__(17)
	  , shared         = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(53)
	  , uid            = __webpack_require__(35)
	  , wks            = __webpack_require__(54)
	  , wksExt         = __webpack_require__(90)
	  , wksDefine      = __webpack_require__(95)
	  , keyOf          = __webpack_require__(96)
	  , enumKeys       = __webpack_require__(97)
	  , isArray        = __webpack_require__(98)
	  , anObject       = __webpack_require__(13)
	  , toIObject      = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(19)
	  , createDesc     = __webpack_require__(20)
	  , _create        = __webpack_require__(50)
	  , gOPNExt        = __webpack_require__(99)
	  , $GOPD          = __webpack_require__(101)
	  , $DP            = __webpack_require__(12)
	  , $keys          = __webpack_require__(22)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(100).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(38).f  = $propertyIsEnumerable;
	  __webpack_require__(37).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(46)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(35)('meta')
	  , isObject = __webpack_require__(14)
	  , has      = __webpack_require__(24)
	  , setDesc  = __webpack_require__(12).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(7)
	  , core           = __webpack_require__(8)
	  , LIBRARY        = __webpack_require__(46)
	  , wksExt         = __webpack_require__(90)
	  , defineProperty = __webpack_require__(12).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(22)
	  , toIObject = __webpack_require__(25);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(22)
	  , gOPS    = __webpack_require__(37)
	  , pIE     = __webpack_require__(38);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(27);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(25)
	  , gOPN      = __webpack_require__(100).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(23)
	  , hiddenKeys = __webpack_require__(36).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(38)
	  , createDesc     = __webpack_require__(20)
	  , toIObject      = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(19)
	  , has            = __webpack_require__(24)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95)('asyncIterator');

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95)('observable');

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(105);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(109);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(87);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(107);
	module.exports = __webpack_require__(8).Object.setPrototypeOf;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(6);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(108).set});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(14)
	  , anObject = __webpack_require__(13);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(9)(Function.call, __webpack_require__(101).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(111);
	var $Object = __webpack_require__(8).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(50)});

/***/ },
/* 112 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(114);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(116);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.open=exports.stat=exports.mkdir=exports.exec=exports.spawn=exports.writeFile=exports.readFile=undefined;var _extends2=__webpack_require__(122);var _extends3=_interopRequireDefault(_extends2);var _regenerator=__webpack_require__(63);var _regenerator2=_interopRequireDefault(_regenerator);var _bluebird=__webpack_require__(81);var _toConsumableArray2=__webpack_require__(40);var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _promise=__webpack_require__(65);var _promise2=_interopRequireDefault(_promise);var exec=function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee(cmd){var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];return _regenerator2.default.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:return _context.abrupt('return',new _promise2.default(function(resolve,reject){_child_process2.default.exec(cmd,options,function(err,stdout,stderr){if(err){return reject(err);}return resolve({stdout:stdout,stderr:stderr});});}));case 1:case'end':return _context.stop();}}},_callee,this);}));return function exec(_x,_x2){return ref.apply(this,arguments);};}();var stat=function(){var ref=(0,_bluebird.coroutine)(_regenerator2.default.mark(function _callee2(target){var _stat,fileStat;return _regenerator2.default.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_stat=promisify(_fs2.default.stat);_context2.prev=1;_context2.next=4;return _stat(target);case 4:fileStat=_context2.sent;return _context2.abrupt('return',fileStat);case 8:_context2.prev=8;_context2.t0=_context2['catch'](1);return _context2.abrupt('return',null);case 11:case'end':return _context2.stop();}}},_callee2,this,[[1,8]]);}));return function stat(_x5){return ref.apply(this,arguments);};}();var _fs=__webpack_require__(118);var _fs2=_interopRequireDefault(_fs);var _child_process=__webpack_require__(123);var _child_process2=_interopRequireDefault(_child_process);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function promisify(fn){return function(){var _arguments=arguments;return new _promise2.default(function(resolve,reject){fn.apply(undefined,Array.prototype.slice.call(_arguments).concat([function(){if(arguments[0]instanceof Error){reject(arguments[0]);}else{resolve.apply(undefined,(0,_toConsumableArray3.default)(Array.prototype.slice.call(arguments,1)));}}]));});};}function spawn(cmd,args){var options=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];var cp=_child_process2.default.spawn(cmd,args,(0,_extends3.default)({},options,{shell:true}));cp.output={stdout:new Buffer(0),stderr:new Buffer(0)};cp.stdout.on('data',function(data){cp.output.stdout=concat(data,cp.output.stdout);});cp.stderr.on('data',function(data){cp.output.stderr=concat(data,cp.output.stderr);});return cp;}function concat(source,target){if(!(source instanceof Buffer)){source=new Buffer(source,'utf8');}if(!target instanceof Buffer){target=new Buffer(0);}return Buffer.concat([target,source]);}var open=promisify(_fs2.default.open),mkdir=promisify(_fs2.default.mkdir),readFile=promisify(_fs2.default.readFile),writeFile=promisify(_fs2.default.writeFile);exports.readFile=readFile;exports.writeFile=writeFile;exports.spawn=spawn;exports.exec=exec;exports.mkdir=mkdir;exports.stat=stat;exports.open=open;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(3);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ }
/******/ ])
});
;