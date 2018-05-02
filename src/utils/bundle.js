/* eslint-disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FourSightJS", [], factory);
	else if(typeof exports === 'object')
		exports["FourSightJS"] = factory();
	else
		root["FourSightJS"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/form-data/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/form-data/lib/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-env browser */
module.exports = typeof self == 'object' ? self.FormData : window.FormData;


/***/ }),

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
/*!***************************************************************!*\
  !*** ./node_modules/isomorphic-fetch/fetch-npm-browserify.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
module.exports = self.fetch.bind(self);


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),

/***/ "./src/engine_call.ts":
/*!****************************!*\
  !*** ./src/engine_call.ts ***!
  \****************************/
/*! exports provided: engine_init, setCookieHack, callEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "engine_init", function() { return engine_init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookieHack", function() { return setCookieHack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callEngine", function() { return callEngine; });
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");


var scicastUrl = 'http://ec2-34-236-36-40.compute-1.amazonaws.com';
function engine_init(url) {
    scicastUrl = url;
}
var sessionCookie = null;
var cookieHack = false;
function setCookieHack(hack) {
    if (hack === void 0) { hack = false; }
    cookieHack = hack;
}
function callEngine(service, makeResponse, method, body) {
    if (method === void 0) { method = 'GET'; }
    if (body === void 0) { body = null; }
    if (cookieHack) {
        return new es6_promise__WEBPACK_IMPORTED_MODULE_0__["Promise"](function (resolve, reject) {
            fetch(scicastUrl + service, {
                method: method,
                body: body,
                // mode: 'no-cors', // no-cors,
                credentials: 'same-origin',
                headers: { Cookie: sessionCookie },
            }).then(function (response) {
                if (cookieHack) {
                    var setCookie = response.headers.get('set-cookie');
                    sessionCookie = setCookie.substr(0, setCookie.indexOf(';'));
                }
                if (response.status >= 400 || response.status < 200) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["logError"])(' Bad response of ' + JSON.stringify(response));
                    reject('Bad response from server ' + JSON.stringify(response));
                }
                else {
                    // logError('Good response' +  JSON.stringify(response));
                    response.json().then(function (r) {
                        Object(_utils__WEBPACK_IMPORTED_MODULE_1__["logDebug"])('Response from ' + service + ' is ' + JSON.stringify(r));
                        resolve(makeResponse(r));
                    });
                }
            }, function (response) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_1__["logError"])('Rejected by server ' + response);
                reject('Rejected by from server');
            });
        });
    }
    else {
        return new es6_promise__WEBPACK_IMPORTED_MODULE_0__["Promise"](function (resolve, reject) {
            fetch(scicastUrl + service, {
                method: method,
                body: body,
                // mode: 'no-cors', // no-cors,
                credentials: 'same-origin',
            }).then(function (response) {
                if (response.status >= 400 || response.status < 200) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["logError"])(response);
                    reject('Bad response from server ' + JSON.stringify(response));
                }
                else {
                    // logError('Good response' +  JSON.stringify(response));
                    response.json().then(function (r) {
                        // console.log("Got back " + JSON.stringify(r))
                        resolve(makeResponse(r));
                    });
                }
            }, function (response) {
                Object(_utils__WEBPACK_IMPORTED_MODULE_1__["logError"])('Rejected by server ' + response);
                reject('Rejected by from server');
            });
        });
    }
}


/***/ }),

/***/ "./src/four_sight.ts":
/*!***************************!*\
  !*** ./src/four_sight.ts ***!
  \***************************/
/*! exports provided: FourSight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FourSight", function() { return FourSight; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _engine_call__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine_call */ "./src/engine_call.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models */ "./src/models.ts");
/*
 *  Copyright (c) 2018 Gold Brand Software, LLC.
 *
 *  All other rights reserved.
 */




var FormData = __webpack_require__(/*! form-data */ "./node_modules/form-data/lib/browser.js");
var FourSight;
(function (FourSight) {
    function init(url) {
        Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["engine_init"])(url);
    }
    FourSight.init = init;
    // Methods
    function login(username, password) {
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        // console.log("Calling /session/create with " + username );
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/session/create', function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["BaseUserInfo"](res); }, 'POST', formData);
    }
    FourSight.login = login;
    function logout() {
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/session/destroy', function (res) { return true; }, 'POST');
    }
    FourSight.logout = logout;
    function getQuestions(categoryIds, showOpen, showCompleted, showWaiting, showPaused, sortBy, offset, limit) {
        var parms = {
            include_prob: true,
            include_comment_count: true,
            include_trade_count: true,
            include_user_roles: true,
            summary_view_only: false,
        };
        if (sortBy) {
            var sort_by = null;
            if (sortBy === 'SETTLEMENT_AT') {
                sort_by = 'question.settlement_at_sort';
            }
            if (sortBy === 'CREATED_AT') {
                sort_by = 'question.question.created_at_sort';
            }
            if (sortBy === 'CREATED_AT_DESC') {
                sort_by = '-question.created_at_sort';
            }
            parms['sort_by'] = sort_by;
        }
        if (offset) {
            parms['start'] = offset;
        }
        if (limit) {
            parms['limit'] = limit;
        }
        if (categoryIds) {
            parms['categories'] = categoryIds.join();
        }
        if (showOpen || showCompleted) {
            var status_filters = {};
            if (showCompleted) {
                status_filters['show_completed'] = showCompleted;
            }
            if (showWaiting) {
                status_filters['show_waiting'] = showWaiting;
            }
            if (showPaused) {
                status_filters['show_paused'] = showPaused;
            }
            if (showOpen) {
                status_filters['show_open'] = showOpen;
            }
            parms['status_filters'] = JSON.stringify(status_filters);
        }
        var service = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/questions', parms); // &include_question_relationship=True
        // logError('question detail is ' + service);
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(service, function (res) { return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res, _models__WEBPACK_IMPORTED_MODULE_3__["QuestionInfo"]); }, 'GET');
    }
    FourSight.getQuestions = getQuestions;
    function createUser(username, password, email, nameLast, nameFirst) {
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (email) {
            formData.append('email', email);
        }
        if (nameLast) {
            formData.append('name_last', nameLast);
        }
        if (nameFirst) {
            formData.append('name_first', nameFirst);
        }
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/users/create', function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["UserInfo"](res); }, 'POST', formData);
    }
    FourSight.createUser = createUser;
    //
    // export function updateUser(username: string, password: string, email: string, name_last: string, name_first: string): Promise<any> {
    //     return callEngine('/users/update', (res) => false)
    // }
    function getUserInfo(userId) {
        var service = '/users/show';
        if (userId) {
            service += '?user_id=' + userId;
        }
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(service, function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["UserInfo"](res); });
    }
    FourSight.getUserInfo = getUserInfo;
    function getQuestionCategories() {
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/question_categories', function (res) { return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res, _models__WEBPACK_IMPORTED_MODULE_3__["QuestionCategoryInfo"]); });
    }
    FourSight.getQuestionCategories = getQuestionCategories;
    function getQuestionDetails(questionId, assumptions) {
        var parms = {
            include_shadow_trades: true,
            include_cash: true,
            include_comments: true,
            include_trades: true,
            include_prob: true,
            question_id: questionId,
        };
        var service = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/questions/show', parms);
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(service, function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["QuestionDetails"](res); });
    }
    FourSight.getQuestionDetails = getQuestionDetails;
    function getComments(questionId, userId) {
        var parms = {};
        if (questionId) {
            parms.question_id = questionId;
        }
        if (userId) {
            parms.user_id = userId;
        }
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/comments', parms), function (res) { return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res, _models__WEBPACK_IMPORTED_MODULE_3__["Comment"]); });
    }
    FourSight.getComments = getComments;
    function addSurveyTrade(questionId, newProb, dimension, comment, assumptions, maxPercentAssets) {
        if (dimension === void 0) { dimension = 1; }
        if (maxPercentAssets === void 0) { maxPercentAssets = 2.0; }
        var decProb = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeProbToDecimal"])(newProb);
        var formData = new FormData();
        formData.append('question_id', questionId);
        formData.append('new_value', Array.isArray(decProb) ? decProb.join() : decProb);
        formData.append('dimension', dimension);
        formData.append('interface_type', 2);
        formData.append('max_percent_assets', maxPercentAssets / 100.0);
        formData.append('user_selection', JSON.stringify([dimension, newProb, null]));
        if (comment) {
            formData.append('comment', comment);
        }
        if (assumptions) {
            formData.append('assumptions', assumptions);
        }
        // logDebug('Requesting from trade create with ' + JSON.stringify(formData));
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/trades/create', function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["Trade"](res); }, 'POST', formData);
    }
    FourSight.addSurveyTrade = addSurveyTrade;
    function getTrades(questionId, userId, newerThan, olderThan, includeClosed, mergeShadowTrades) {
        if (includeClosed === void 0) { includeClosed = true; }
        if (mergeShadowTrades === void 0) { mergeShadowTrades = false; }
        var parms = {
            include_current_probs: true,
            include_closed: includeClosed,
            include_comments: true,
            merge_shadow_trades: mergeShadowTrades,
            summary_view_only: false,
        };
        if (questionId) {
            parms.question_id = questionId;
        }
        if (userId) {
            parms.user_id = userId;
        }
        if (newerThan) {
            parms.newer_than = newerThan;
        }
        if (olderThan) {
            parms.older_than = olderThan;
        }
        // logError('Calling ' + makeUrl('/trades', parms))
        // supports by questionId, turnId, filterByResolved, includeCountofPositiveVsNegativeResolutions
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/trades', parms), function (res) { return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res, _models__WEBPACK_IMPORTED_MODULE_3__["Trade"]); });
    }
    FourSight.getTrades = getTrades;
    function getTradeDetails(tradeId) {
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/trades/show', { trade_id: tradeId }), function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["Trade"](res); });
    }
    FourSight.getTradeDetails = getTradeDetails;
    function advanceTurn(turnDetails) {
        if (turnDetails === void 0) { turnDetails = ''; }
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/users/advance_turn', function (res) { return (res && res['turn'] ? true : false); });
    }
    FourSight.advanceTurn = advanceTurn;
    function getTurnInfo() {
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/users/turns', function (res) { return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res, _models__WEBPACK_IMPORTED_MODULE_3__["TurnInfo"]); });
    }
    FourSight.getTurnInfo = getTurnInfo;
    function getNarratives(scenario_id) {
        var parms = scenario_id ? { scenario_id: scenario_id } : null;
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/scenario/narratives', parms), function (res) { return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res, _models__WEBPACK_IMPORTED_MODULE_3__["Narrative"]); });
    }
    FourSight.getNarratives = getNarratives;
    function getAssets(scenario_id) {
        var parms = scenario_id ? { scenario_id: scenario_id } : null;
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/scenario/assets', parms), function (res) { return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res, _models__WEBPACK_IMPORTED_MODULE_3__["Asset"]); });
    }
    FourSight.getAssets = getAssets;
    function getUserFindings(scenario_id) {
        var parms = scenario_id ? { scenario_id: scenario_id } : null;
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/scenario/user_findings', parms), function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["UserFindings"](res); });
    }
    FourSight.getUserFindings = getUserFindings;
    function getScenarioAlerts(scenario_id) {
        var parms = scenario_id ? { scenario_id: scenario_id } : null;
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeUrl"])('/scenario/user_alerts', parms), function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["UserFindings"](res); });
    }
    FourSight.getScenarioAlerts = getScenarioAlerts;
    function setUserFindings(findings, scenario_id) {
        var formData = new FormData();
        formData.append('findings', JSON.stringify(findings));
        if (scenario_id) {
            formData.append('scenario_id', scenario_id);
        }
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/scenario/store_user_findings', function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["UserFindings"](res); }, 'POST', formData);
    }
    FourSight.setUserFindings = setUserFindings;
    function getUserPerformance() {
        return Object(_engine_call__WEBPACK_IMPORTED_MODULE_2__["callEngine"])('/users/performance_summary', function (res) { return new _models__WEBPACK_IMPORTED_MODULE_3__["UserPerformance"](res); });
    }
    FourSight.getUserPerformance = getUserPerformance;
    // These below are placeholders
    // export function getQuestionStatsAt(questionId: IdType, startTurn: number): Promise<any> {
    //     return callEngine('/questions/tbd', (res) => false);
    // }
    //
    // export function getUserTradeEv(turn: number): Promise<any> {
    //     // sum ev of all trades at this time (open only?) do not include assets?
    //     // Current trades have a EV of 0 since they are worth what you paid until things move
    //     return callEngine('/questions/tbd', (res) => false);
    // }
    // export function createComment(commentText: string, questionId?: IdType, tradeId?: IdType,
    //                               parentCommentId?: IdType): Promise<any> {
    //     return callEngine('/comments/create', (res) => false);
    // }
    //
    // export function deleteComment(commentId: IdType): Promise<any> {
    //     return callEngine('/comments/delete', (res) => false);
    // }
})(FourSight || (FourSight = {}));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: FourSight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _four_sight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./four_sight */ "./src/four_sight.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FourSight", function() { return _four_sight__WEBPACK_IMPORTED_MODULE_0__["FourSight"]; });




/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/*! exports provided: BaseUserInfo, UserInfo, QuestionCategoryInfo, QuestionInfo, TurnInfo, Comment, Trade, ShadowTrade, QuestionDetails, Asset, Narrative, UserFindings, UserPerformance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseUserInfo", function() { return BaseUserInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInfo", function() { return UserInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionCategoryInfo", function() { return QuestionCategoryInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionInfo", function() { return QuestionInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TurnInfo", function() { return TurnInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comment", function() { return Comment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Trade", function() { return Trade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShadowTrade", function() { return ShadowTrade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionDetails", function() { return QuestionDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Asset", function() { return Asset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Narrative", function() { return Narrative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFindings", function() { return UserFindings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPerformance", function() { return UserPerformance; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/*
 *  Copyright (c) 2018 Gold Brand Software, LLC.
 *
 *  All other rights reserved.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BaseUserInfo = /** @class */ (function () {
    function BaseUserInfo(res) {
        this.id = res.user_id ? res.user_id : res['id'];
        this.name = res.username;
        this.roles = res.roles;
    }
    return BaseUserInfo;
}());

var UserInfo = /** @class */ (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo(res) {
        var _this = _super.call(this, res) || this;
        _this.uninvested_assets = res.uninvested_assets;
        _this.is_active = res.is_active;
        _this.image_url = res.image_uri;
        _this.gravatar = res.gravitar;
        _this.badges = res.badges;
        _this.email = res.email;
        return _this;
    }
    return UserInfo;
}(BaseUserInfo));

// {"username": "daggre_admin", "email": "HIDDEN", "referral_id": null, "is_active": true, "uninvested_assets": 5000.0, "name_first": "HIDDEN", "name_last":
// "HIDDEN", "id": 1, "opt_out_email": null, "default_trade_preference": null, "interests": null, "about_me": null, "status": null, "options": null, "email_verified": false,
// "wants_comment_emails": true, "wants_daily_digest_emails": true, "wants_market_alert_emails": true, "wants_admin_emails": true, "wants_question_resolution_emails": true,
//     "api_key": "HIDDEN", "is_api_active": null, "turn_number": 0, "social_networks": {"google": false, "facebook": false, "linkedin": false, "twitter": false},
//     "roles": [{"id": 1, "name": "Admin", "is_permanent": true, "description": null, "invitation_display": null, "is_public": false, "is_selectable": null,
//     "image_uri": null, "short_description": null, "referral_code": null, "kind": null}, {"id": 3, "name": "User", "is_permanent": true, "description": null,
//     "invitation_display": null, "is_public": false, "is_selectable": null, "image_uri": null, "short_description": null, "referral_code": null, "kind": null},
//     {"id": 5, "name": "SuperAdmin", "is_permanent": true, "description": null, "invitation_display": null, "is_public": false, "is_selectable": null,
//         "image_uri": null, "short_description": null, "referral_code": null, "kind": null}, {"id": 6, "name": "UserAdmin", "is_permanent": true,
//         "description": null, "invitation_display": null, "is_public": false, "is_selectable": null, "image_uri": null, "short_description": null,
//         "referral_code": null, "kind": null}], "badges": [], "invitations": [], "gravatar": "b1a4b2518dbbdd47dd4a713d5cd1df94",
//     "image_uri": "https://www.gravatar.com/avatar/b1a4b2518dbbdd47dd4a713d5cd1df94"}
var QuestionCategoryInfo = /** @class */ (function () {
    function QuestionCategoryInfo(res) {
        // console.log(res)
        this.id = res.id;
        this.name = res.name;
        this.description = res.description;
        this.image_uri = res.image_uri;
        this.alt_image_uri = res.alt_image_uri;
        this.is_topic = res.is_topic;
        this.is_selectable = res.is_selectable;
        this.count = res.count;
    }
    return QuestionCategoryInfo;
}());

var QuestionInfo = /** @class */ (function () {
    function QuestionInfo(res) {
        // logError("Calling Question Info with "+ JSON.stringify(res));
        // console.log(res)
        this.categories = res.question_categories;
        this.groups = res.question_user_roles;
        this.prob = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeProbArray"])(res.prob);
        this.prob_at = res.prob_at;
        this.comment_count = res.comment_count;
        this.trade_count = res.trade_count;
        var q = res.question ? res.question : res; // if we are passing an inner part then we collapse
        this.choices = res.question_choices ? res.question_choices : (q.choices ? q.choices : q.question_choices);
        this.id = q.id;
        this.name = q.name;
        this.desc = q.desc;
        this.type = q.type;
        this.is_visible = q.is_visible;
        this.image_uri = q.image_uri;
        this.is_locked = q.is_locked;
        this.serialized_model = q.serialized_model;
        this.created_at = q.created_at;
        this.updated_at = q.updated_at;
        this.provisional_settled_at = q.provisional_settled_at;
        this.settled_at = q.settled_at;
        this.max_settled_dimension = q.settled_value;
        this.provisional_serialized_settled_prob = q.provisional_serialized_settled_values;
        this.serialized_settled_prob = q.serialized_settled_values;
        this.marginal_prob_at_settlement = q.marginal_prob_at_settlement;
    }
    return QuestionInfo;
}());

var TurnInfo = /** @class */ (function () {
    function TurnInfo(res) {
        this.turn = res.turn;
        this.startedAt = res.started_at;
        this.endedAt = res.ended_at;
    }
    return TurnInfo;
}());

var Comment = /** @class */ (function () {
    function Comment(res) {
        this.id = res.id;
        this.comment_text = res.comment_text;
        this.parent_id = res.comment_id;
        this.trade_id = res.trade_id;
        this.created_at = res.created_at;
        this.user_id = res.user_id;
        this.user = res.user ? new BaseUserInfo(res.user) : null;
    }
    return Comment;
}());

var Trade = /** @class */ (function () {
    function Trade(res) {
        // logError("Calling trade with "+ JSON.stringify(res));
        var base_trade = res.trade ? res.trade : res;
        this.id = base_trade.id;
        this.user_id = base_trade.user_id;
        this.created_at = base_trade.created_at;
        this.old_prob = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeProbArray"])(base_trade.old_value_list);
        this.new_prob = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeProbArray"])(base_trade.new_value_list);
        this.old_marginal_prob = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeProbArray"])(base_trade.old_marginal);
        this.new_marginal_prob = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeProbArray"])(base_trade.new_marginal);
        this.serialized_assumptions = base_trade.serialized_assumptions;
        this.user = res.user ? new BaseUserInfo(res.user) : null;
        this.dimension = base_trade.dimension;
        this.user_selection = base_trade.user_selection;
        this.asset_payout = base_trade.assets_per_option;
        this.asset_resolution = base_trade.asset_resolution;
        this.comment = res.comment ? new Comment(res.comment) : null;
        this.question = res.question ? new QuestionInfo(res.question) : null;
    }
    return Trade;
}());

var ShadowTrade = /** @class */ (function (_super) {
    __extends(ShadowTrade, _super);
    function ShadowTrade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ShadowTrade;
}(Trade));

var QuestionDetails = /** @class */ (function (_super) {
    __extends(QuestionDetails, _super);
    function QuestionDetails(res) {
        var _this = 
        // logError('Base is ' + JSON.stringify(res));
        _super.call(this, res) || this;
        _this.last_traded_at = res.last_traded_at;
        _this.comments = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res.comments, Comment);
        _this.trades = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res.trades, Trade);
        _this.shadow_trades = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeList"])(res.shadow_trades, ShadowTrade);
        return _this;
    }
    return QuestionDetails;
}(QuestionInfo));

var Asset = /** @class */ (function () {
    function Asset(res) {
        this.name = res.name;
        this.description = res.description;
        this.url = res.url;
    }
    return Asset;
}());

var Narrative = /** @class */ (function () {
    function Narrative(res) {
        this.text = res;
    }
    return Narrative;
}());

var UserFindings = /** @class */ (function () {
    function UserFindings(res) {
        this.findings = res;
    }
    return UserFindings;
}());

var UserPerformance = /** @class */ (function () {
    function UserPerformance(res) {
        this.perfDictionary = {};
        this.perfDictionary = res;
    }
    UserPerformance.prototype.getQuestionPerformance = function (userId, questionId) {
        var key = userId.toString() + ':' + questionId.toString();
        return this.perfDictionary[key];
    };
    return UserPerformance;
}());



/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: makeList, makeUrl, makeProbArray, makeProbToDecimal, logError, logDebug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeList", function() { return makeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUrl", function() { return makeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeProbArray", function() { return makeProbArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeProbToDecimal", function() { return makeProbToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logError", function() { return logError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logDebug", function() { return logDebug; });
/*
 *  Copyright (c) 2018 Gold Brand Software, LLC.
 *
 *  All other rights reserved.
 */
function makeList(res, cls) {
    // logError ("List Converting " + JSON.stringify(res));
    var retval = res ? res.map(function (r) { return r ? new cls(r) : r; }) : res;
    // logError ("Made " + JSON.stringify(retval));
    return retval;
}
function makeUrl(base, parms) {
    if (parms) {
        var urlParm = Object.keys(parms).map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(parms[k]); }).join('&');
        return (urlParm && urlParm.length > 0) ? base + '?' + urlParm : base;
    }
    else {
        return base;
    }
}
function makeProbArray(initArray) {
    // we might want to convert string at a later point
    //return initArray ? initArray.map((r) => 100.0 * r) : null;
    return initArray ? (Array.isArray(initArray) ? initArray.map(function (r) { return r * 100.0; }) : initArray * 100.0) : 0.0;
}
function makeProbToDecimal(initArray) {
    // we might want to convert string at a later point
    return initArray ? (Array.isArray(initArray) ? initArray.map(function (r) { return r / 100.0; }) : initArray / 100.0) : 0.0;
}
function logError(msg) {
    // noinspection TsLint
    console.log('ERROR' + msg);
}
function logDebug(msg) {
    // noinspection TsLint
    console.log('DEBUG:' + msg);
}


/***/ })

/******/ });
});
//# sourceMappingURL=bundle.js.map