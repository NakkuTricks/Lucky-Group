// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_URL = void 0;
var API_URL = "https://jsonplaceholder.typicode.com";
exports.API_URL = API_URL;
},{}],"js/api/photos.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.photos = void 0;

var _constants = require("../constants");

var photos = [{
  "albumId": 1,
  "id": 1,
  "title": "accusamus beatae ad facilis cum similique qui sunt",
  "url": "https://via.placeholder.com/600/92c952",
  "thumbnailUrl": "https://via.placeholder.com/150/92c952"
}, {
  "albumId": 1,
  "id": 2,
  "title": "reprehenderit est deserunt velit ipsam",
  "url": "https://via.placeholder.com/600/771796",
  "thumbnailUrl": "https://via.placeholder.com/150/771796"
}, {
  "albumId": 1,
  "id": 3,
  "title": "officia porro iure quia iusto qui ipsa ut modi",
  "url": "https://via.placeholder.com/600/24f355",
  "thumbnailUrl": "https://via.placeholder.com/150/24f355"
}, {
  "albumId": 1,
  "id": 4,
  "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
  "url": "https://via.placeholder.com/600/d32776",
  "thumbnailUrl": "https://via.placeholder.com/150/d32776"
}, {
  "albumId": 1,
  "id": 5,
  "title": "natus nisi omnis corporis facere molestiae rerum in",
  "url": "https://via.placeholder.com/600/f66b97",
  "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
}, {
  "albumId": 1,
  "id": 6,
  "title": "accusamus ea aliquid et amet sequi nemo",
  "url": "https://via.placeholder.com/600/56a8c2",
  "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
}, {
  "albumId": 1,
  "id": 7,
  "title": "officia delectus consequatur vero aut veniam explicabo molestias",
  "url": "https://via.placeholder.com/600/b0f7cc",
  "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
}, {
  "albumId": 1,
  "id": 8,
  "title": "aut porro officiis laborum odit ea laudantium corporis",
  "url": "https://via.placeholder.com/600/54176f",
  "thumbnailUrl": "https://via.placeholder.com/150/54176f"
}, {
  "albumId": 1,
  "id": 9,
  "title": "qui eius qui autem sed",
  "url": "https://via.placeholder.com/600/51aa97",
  "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
}, {
  "albumId": 1,
  "id": 10,
  "title": "beatae et provident et ut vel",
  "url": "https://via.placeholder.com/600/810b14",
  "thumbnailUrl": "https://via.placeholder.com/150/810b14"
}, {
  "albumId": 1,
  "id": 11,
  "title": "nihil at amet non hic quia qui",
  "url": "https://via.placeholder.com/600/1ee8a4",
  "thumbnailUrl": "https://via.placeholder.com/150/1ee8a4"
}, {
  "albumId": 1,
  "id": 12,
  "title": "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
  "url": "https://via.placeholder.com/600/66b7d2",
  "thumbnailUrl": "https://via.placeholder.com/150/66b7d2"
}, {
  "albumId": 1,
  "id": 13,
  "title": "repudiandae iusto deleniti rerum",
  "url": "https://via.placeholder.com/600/197d29",
  "thumbnailUrl": "https://via.placeholder.com/150/197d29"
}, {
  "albumId": 1,
  "id": 14,
  "title": "est necessitatibus architecto ut laborum",
  "url": "https://via.placeholder.com/600/61a65",
  "thumbnailUrl": "https://via.placeholder.com/150/61a65"
}, {
  "albumId": 1,
  "id": 15,
  "title": "harum dicta similique quis dolore earum ex qui",
  "url": "https://via.placeholder.com/600/f9cee5",
  "thumbnailUrl": "https://via.placeholder.com/150/f9cee5"
}, {
  "albumId": 1,
  "id": 16,
  "title": "iusto sunt nobis quasi veritatis quas expedita voluptatum deserunt",
  "url": "https://via.placeholder.com/600/fdf73e",
  "thumbnailUrl": "https://via.placeholder.com/150/fdf73e"
}, {
  "albumId": 1,
  "id": 17,
  "title": "natus doloribus necessitatibus ipsa",
  "url": "https://via.placeholder.com/600/9c184f",
  "thumbnailUrl": "https://via.placeholder.com/150/9c184f"
}, {
  "albumId": 1,
  "id": 18,
  "title": "laboriosam odit nam necessitatibus et illum dolores reiciendis",
  "url": "https://via.placeholder.com/600/1fe46f",
  "thumbnailUrl": "https://via.placeholder.com/150/1fe46f"
}, {
  "albumId": 1,
  "id": 19,
  "title": "perferendis nesciunt eveniet et optio a",
  "url": "https://via.placeholder.com/600/56acb2",
  "thumbnailUrl": "https://via.placeholder.com/150/56acb2"
}, {
  "albumId": 1,
  "id": 20,
  "title": "assumenda voluptatem laboriosam enim consequatur veniam placeat reiciendis error",
  "url": "https://via.placeholder.com/600/8985dc",
  "thumbnailUrl": "https://via.placeholder.com/150/8985dc"
}, {
  "albumId": 1,
  "id": 21,
  "title": "ad et natus qui",
  "url": "https://via.placeholder.com/600/5e12c6",
  "thumbnailUrl": "https://via.placeholder.com/150/5e12c6"
}, {
  "albumId": 1,
  "id": 22,
  "title": "et ea illo et sit voluptas animi blanditiis porro",
  "url": "https://via.placeholder.com/600/45601a",
  "thumbnailUrl": "https://via.placeholder.com/150/45601a"
}, {
  "albumId": 1,
  "id": 23,
  "title": "harum velit vero totam",
  "url": "https://via.placeholder.com/600/e924e6",
  "thumbnailUrl": "https://via.placeholder.com/150/e924e6"
}, {
  "albumId": 1,
  "id": 24,
  "title": "beatae officiis ut aut",
  "url": "https://via.placeholder.com/600/8f209a",
  "thumbnailUrl": "https://via.placeholder.com/150/8f209a"
}, {
  "albumId": 1,
  "id": 25,
  "title": "facere non quis fuga fugit vitae",
  "url": "https://via.placeholder.com/600/5e3a73",
  "thumbnailUrl": "https://via.placeholder.com/150/5e3a73"
}, {
  "albumId": 1,
  "id": 26,
  "title": "asperiores nobis voluptate qui",
  "url": "https://via.placeholder.com/600/474645",
  "thumbnailUrl": "https://via.placeholder.com/150/474645"
}, {
  "albumId": 1,
  "id": 27,
  "title": "sit asperiores est quos quis nisi veniam error",
  "url": "https://via.placeholder.com/600/c984bf",
  "thumbnailUrl": "https://via.placeholder.com/150/c984bf"
}, {
  "albumId": 1,
  "id": 28,
  "title": "non neque eligendi molestiae repudiandae illum voluptatem qui aut",
  "url": "https://via.placeholder.com/600/392537",
  "thumbnailUrl": "https://via.placeholder.com/150/392537"
}, {
  "albumId": 1,
  "id": 29,
  "title": "aut ipsam quos ab placeat omnis",
  "url": "https://via.placeholder.com/600/602b9e",
  "thumbnailUrl": "https://via.placeholder.com/150/602b9e"
}, {
  "albumId": 1,
  "id": 30,
  "title": "odio enim voluptatem quidem aut nihil illum",
  "url": "https://via.placeholder.com/600/372c93",
  "thumbnailUrl": "https://via.placeholder.com/150/372c93"
}];
exports.photos = photos;

function getPhotos() {
  fetch("".concat(_constants.API_URL, "/photos")).then(function (value) {
    return value.json();
  }).then(function (value) {
    return photos.push(value);
  }).catch(function (error) {
    return console.log(error);
  });
}

;
getPhotos();
},{"../constants":"js/constants.js"}],"js/pagination.js":[function(require,module,exports) {
"use strict";

var _photos = require("./api/photos");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var list = document.querySelector(".content__list");
var emptyElem = document.querySelector(".empty-elem");
var query = window.location.search;
var params = new URLSearchParams(query);
var perPage = Number(params.get("per-page"));

function pagination() {
  var photoCount = _photos.photos.splice(0, perPage);

  if (photoCount.length) {
    var _iterator = _createForOfIteratorHelper(photoCount),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _step.value,
            url = _step$value.url,
            title = _step$value.title;
        list.insertAdjacentHTML("beforeend", "\n                <li class=\"content__item\">\n                    <figure class=\"content__item-wrapper\">\n                        <img class=\"content__item-img\" src=\"".concat(url, "\" />\n                        <figcaption class=\"content__item-text\">\"").concat(title, "\"</figcaption>\n                    </figure>\n                </li>\n            "));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    ;
    list.appendChild(emptyElem);
  }
}

var intersectionObserver = new IntersectionObserver(function (entries) {
  if (entries.some(function (elem) {
    return elem.intersectionRatio > 0;
  })) {
    pagination();
  }
});
intersectionObserver.observe(emptyElem);
},{"./api/photos":"js/api/photos.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("./styles/index.scss");

require("./js/pagination");
},{"./styles/index.scss":"styles/index.scss","./js/pagination":"js/pagination.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61068" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map