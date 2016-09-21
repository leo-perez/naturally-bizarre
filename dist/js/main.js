(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:12,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};"object"===typeof module&&(module.exports=Stats);

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('../data/colors.json');

var _colors2 = _interopRequireDefault(_colors);

var _statsJs = require('stats-js');

var _statsJs2 = _interopRequireDefault(_statsJs);

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Experiments = function () {
  function Experiments() {
    _classCallCheck(this, Experiments);

    this.colors = _colors2.default;

    this.stats = null;
    this.canvas = null;
    this.context = null;

    this.center = new _Vector2.default(window.innerWidth / 2, window.innerHeight / 2);
    this.mouse = new _Vector2.default(window.innerWidth / 2, window.innerHeight / 2);

    this.eventDown = this.mousedown.bind(this);
    this.eventMove = this.mousemove.bind(this);
    this.eventUp = this.mouseup.bind(this);

    this.eventClick = this.click.bind(this);
    this.eventClickDouble = this.dblclick.bind(this);

    this.eventResize = this.resize.bind(this);

    this.eventUpdate = this.update.bind(this);

    this.animationFrame = null;

    this.createStats();
    this.createCanvas();
    this.createContext();
    this.createEvents();
  }

  _createClass(Experiments, [{
    key: 'createStats',
    value: function createStats() {
      var _this = this;

      this.stats = new _statsJs2.default();

      this.stats.domElement.style.display = 'none';
      this.stats.domElement.style.left = 0;
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.top = 0;
      this.stats.domElement.style.zIndex = 50;

      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 68) {
          _this.stats.domElement.style.display = _this.stats.domElement.style.display === 'block' ? 'none' : 'block';
        }
      });

      document.body.appendChild(this.stats.domElement);
    }
  }, {
    key: 'createCanvas',
    value: function createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.classList.add('canvas');

      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;

      document.body.appendChild(this.canvas);
    }
  }, {
    key: 'createContext',
    value: function createContext() {
      this.context = this.canvas.getContext('2d');

      this.context.fillStyle = '#050505';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }, {
    key: 'createEvents',
    value: function createEvents() {
      this.canvas.addEventListener('mousedown', this.eventDown);
      this.canvas.addEventListener('mousemove', this.eventMove);
      this.canvas.addEventListener('mouseup', this.eventUp);

      this.canvas.addEventListener('touchstart', this.eventDown);
      this.canvas.addEventListener('touchmove', this.eventMove);
      this.canvas.addEventListener('touchend', this.eventUp);

      this.canvas.addEventListener('click', this.eventClick);
      this.canvas.addEventListener('dblclick', this.eventClickDouble);

      window.addEventListener('resize', this.eventResize);
    }
  }, {
    key: 'click',
    value: function click(e) {}
  }, {
    key: 'dblclick',
    value: function dblclick(e) {
      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = '#050505';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }, {
    key: 'mousedown',
    value: function mousedown(e) {}
  }, {
    key: 'mousemove',
    value: function mousemove(e) {
      if (e.touches) {
        this.mouse.set(e.touches[0].pageX, e.touches[0].pageY);
      } else {
        this.mouse.set(e.pageX, e.pageY);
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup(e) {}
  }, {
    key: 'resize',
    value: function resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.center.set(window.innerWidth / 2, window.innerHeight / 2);
    }
  }, {
    key: 'update',
    value: function update() {
      this.animationFrame = window.requestAnimationFrame(this.update.bind(this));
    }
  }, {
    key: 'destroyStats',
    value: function destroyStats() {
      this.stats.domElement.parentNode.removeChild(this.stats.domElement);
    }
  }, {
    key: 'destroyCanvas',
    value: function destroyCanvas() {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }, {
    key: 'destroyContext',
    value: function destroyContext() {
      this.context = null;
    }
  }, {
    key: 'destroyEvents',
    value: function destroyEvents() {
      this.canvas.removeEventListener('mousedown', this.eventDown);
      this.canvas.removeEventListener('mousemove', this.eventMove);
      this.canvas.removeEventListener('mouseup', this.eventUp);

      this.canvas.removeEventListener('touchstart', this.eventDown);
      this.canvas.removeEventListener('touchmove', this.eventMove);
      this.canvas.removeEventListener('touchend', this.eventUp);

      this.canvas.removeEventListener('click', this.eventClick);
      this.canvas.removeEventListener('dblclick', this.eventClickDouble);

      window.removeEventListener('resize', this.eventResize);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.cancelAnimationFrame(this.animationFrame);

      this.destroyEvents();
      this.destroyCanvas();
      this.destroyContext();
      this.destroyStats();
    }
  }]);

  return Experiments;
}();

exports.default = Experiments;

},{"../data/colors.json":4,"./Vector":3,"stats-js":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  function Vector() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
    this.z = z;
  }

  _createClass(Vector, [{
    key: "set",
    value: function set(x, y, z) {
      if (x instanceof Vector) {
        this.x = x.x || 0;
        this.y = x.y || 0;
        this.z = x.z || 0;

        return this;
      }

      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;

      return this;
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Vector(this.x, this.y, this.z);
    }
  }, {
    key: "add",
    value: function add(x, y, z) {
      if (x instanceof Vector) {
        this.x += x.x || 0;
        this.y += x.y || 0;
        this.z += x.z || 0;

        return this;
      }

      this.x += x || 0;
      this.y += y || 0;
      this.z += z || 0;

      return this;
    }
  }, {
    key: "sub",
    value: function sub(x, y, z) {
      if (x instanceof Vector) {
        this.x -= x.x || 0;
        this.y -= x.y || 0;
        this.z -= x.z || 0;

        return this;
      }

      this.x -= x || 0;
      this.y -= y || 0;
      this.z -= z || 0;

      return this;
    }
  }, {
    key: "mult",
    value: function mult() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this.x *= n;
      this.y *= n;
      this.z *= n;

      return this;
    }
  }, {
    key: "div",
    value: function div(n) {
      this.x /= n;
      this.y /= n;
      this.z /= n;

      return this;
    }
  }, {
    key: "mag",
    value: function mag() {
      return Math.sqrt(this.magSq());
    }
  }, {
    key: "magSq",
    value: function magSq() {
      var x = this.x;
      var y = this.y;
      var z = this.z;

      return x * x + y * y + z * z;
    }
  }, {
    key: "dot",
    value: function dot() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      if (x instanceof Vector) {
        return this.dot(x.x, x.y, x.z);
      }

      return this.x * x + this.y * y + this.z * z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      var x = this.y * v.z - this.z * v.y;
      var y = this.z * v.x - this.x * v.z;
      var z = this.x * v.y - this.y * v.x;

      return new Vector(x, y, z);
    }
  }, {
    key: "dist",
    value: function dist(v) {
      var d = v.copy().sub(this);

      return d.mag();
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.div(this.mag());
    }
  }, {
    key: "limit",
    value: function limit(l) {
      var mSq = this.magSq();

      if (mSq > l * l) {
        this.div(Math.sqrt(mSq));
        this.mult(l);
      }

      return this;
    }
  }, {
    key: "setMag",
    value: function setMag(n) {
      return this.normalize().mult(n);
    }
  }, {
    key: "heading",
    value: function heading() {
      return Math.atan2(this.y, this.x);
    }
  }, {
    key: "rotate",
    value: function rotate(a) {
      var newHeading = this.heading() + a;
      var mag = this.mag();

      this.x = Math.cos(newHeading) * mag;
      this.y = Math.sin(newHeading) * mag;

      return this;
    }
  }, {
    key: "lerp",
    value: function lerp(x, y, z, amt) {
      if (x instanceof Vector) {
        return this.lerp(x.x, x.y, x.z, y);
      }

      this.x += (x - this.x) * amt || 0;
      this.y += (y - this.y) * amt || 0;
      this.z += (z - this.z) * amt || 0;

      return this;
    }
  }, {
    key: "array",
    value: function array() {
      return [this.x || 0, this.y || 0, this.z || 0];
    }
  }, {
    key: "equals",
    value: function equals(x, y, z) {
      var a = void 0,
          b = void 0,
          c = void 0;

      if (x instanceof Vector) {
        a = x.x || 0;
        b = x.y || 0;
        c = x.z || 0;
      } else {
        a = x || 0;
        b = y || 0;
        c = z || 0;
      }

      return this.x === a && this.y === b && this.z === c;
    }
  }], [{
    key: "fromAngle",
    value: function fromAngle(angle) {
      return new Vector(Math.cos(angle), Math.sin(angle), 0);
    }
  }, {
    key: "random2D",
    value: function random2D() {
      return this.fromAngle(Math.random() * Math.PI * 2);
    }
  }, {
    key: "random3D",
    value: function random3D() {
      var angle = Math.random() * Math.PI * 2;
      var vz = Math.random() * 2 - 1;

      var vx = Math.sqrt(1 - vz * vz) * Math.cos(angle);
      var vy = Math.sqrt(1 - vz * vz) * Math.sin(angle);

      return new Vector(vx, vy, vz);
    }
  }, {
    key: "add",
    value: function add(v1, v2, target) {
      if (!target) {
        target = v1.copy();
      } else {
        target.set(v1);
      }

      target.add(v2);

      return target;
    }
  }, {
    key: "sub",
    value: function sub(v1, v2, target) {
      if (!target) {
        target = v1.copy();
      } else {
        target.set(v1);
      }

      target.sub(v2);

      return target;
    }
  }, {
    key: "mult",
    value: function mult(v, n, target) {
      if (!target) {
        target = v.copy();
      } else {
        target.set(v);
      }

      target.mult(n);

      return target;
    }
  }, {
    key: "div",
    value: function div(v, n, target) {
      if (!target) {
        target = v.copy();
      } else {
        target.set(v);
      }

      target.div(n);

      return target;
    }
  }, {
    key: "dot",
    value: function dot(v1, v2) {
      return v1.dot(v2);
    }
  }, {
    key: "cross",
    value: function cross(v1, v2) {
      return v1.cross(v2);
    }
  }, {
    key: "dist",
    value: function dist(v1, v2) {
      return v1.dist(v2);
    }
  }, {
    key: "lerp",
    value: function lerp(v1, v2, amt, target) {
      if (!target) {
        target = v1.copy();
      } else {
        target.set(v1);
      }

      target.lerp(v2, amt);

      return target;
    }
  }, {
    key: "angleBetween",
    value: function angleBetween(v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    }
  }]);

  return Vector;
}();

exports.default = Vector;

},{}],4:[function(require,module,exports){
module.exports=[
  ["#0ad7d7", "#232832", "#ff2d64", "#e6e6e6"],
  ["#ffdc00", "#f5508c", "#9f19a4", "#462d46"],
  ["#fa5555", "#f5fa78", "#8ceb8c", "#2d7d91"],
  ["#004182", "#0e8cf0", "#faffa4", "#ff4b69"],
  ["#3c1e69", "#5a3c87", "#e65a87", "#ffaaaa"]
]

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _random = require('../../lib/random');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Walker = function () {
  function Walker(color, x, y) {
    _classCallCheck(this, Walker);

    this.color = color;
    this.x = x;
    this.y = y;
  }

  _createClass(Walker, [{
    key: 'step',
    value: function step() {
      var random = (0, _random.randomInt)(0, 3);

      if (random === 0) {
        this.x++;
      } else if (random === 1) {
        this.x--;
      } else if (random === 2) {
        this.y++;
      } else {
        this.y--;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.lineWidth = 1;
      context.strokeStyle = this.color;

      context.beginPath();
      context.moveTo(this.x, this.y);

      this.step();

      context.lineTo(this.x, this.y);
      context.stroke();
    }
  }]);

  return Walker;
}();

exports.default = Walker;

},{"../../lib/random":18}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Walker = require('./Walker');

var _Walker2 = _interopRequireDefault(_Walker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_Experiments) {
  _inherits(Root, _Experiments);

  function Root() {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Root).call(this));

    _this.walkers = null;
    _this.walkersLength = null;
    _this.walkersColor = null;

    _this.createWalkers();

    _this.update();
    return _this;
  }

  _createClass(Root, [{
    key: 'createWalker',
    value: function createWalker() {
      var color = this.colors[this.walkersColor][(0, _random.randomInt)(0, this.colors.length - 1)];
      var x = (0, _random.randomInt)(0, window.innerWidth);
      var y = (0, _random.randomInt)(0, window.innerHeight);

      var walker = new _Walker2.default(color, x, y);

      this.walkers.push(walker);
    }
  }, {
    key: 'createWalkers',
    value: function createWalkers() {
      this.walkers = [];
      this.walkersLength = 2500;
      this.walkersColor = (0, _random.randomInt)(0, this.colors.length - 1);

      for (var i = 0; i <= this.walkersLength; i++) {
        this.createWalker();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Root.prototype), 'update', this).call(this);

      this.stats.begin();

      this.walkers.forEach(function (walker) {
        return walker.draw(_this2.context);
      });

      this.context.globalAlpha = 0.1;
      this.context.globalCompositeOperation = 'lighter';

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Root.prototype), 'dblclick', this).call(this);

      this.createWalkers();
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Root.prototype), 'resize', this).call(this);

      this.createWalkers();
    }
  }]);

  return Root;
}(_Experiments3.default);

exports.default = Root;

},{"../../classes/Experiments":2,"../../lib/random":18,"./Walker":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require('../../lib/math');

var _random = require('../../lib/random');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    function Circle(x, y, radius, color) {
        _classCallCheck(this, Circle);

        this.radius = radius;

        this.color = color;

        this.x = x;
        this.y = y;

        this.opacity = 0;

        this.lerp = (0, _random.randomArbitrary)(0.05, 0.1);
    }

    _createClass(Circle, [{
        key: 'move',
        value: function move(x, y) {
            this.opacity = (0, _math.constrain)(this.opacity + 0.1, 0, 1);

            this.radius = (0, _math.lerp)(this.radius, 0, this.lerp);

            this.x = (0, _math.lerp)(this.x, x, this.lerp);
            this.y = (0, _math.lerp)(this.y, y, this.lerp);

            this.alive = this.radius > 0.01;
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            context.lineWidth = 2;

            context.globalAlpha = this.opacity;
            context.globalCompositeOperation = 'lighter';

            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.closePath();

            context.strokeStyle = this.color;
            context.stroke();
        }
    }]);

    return Circle;
}();

exports.default = Circle;

},{"../../lib/math":16,"../../lib/random":18}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Circle = require('./Circle');

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Neon = function (_Experiments) {
  _inherits(Neon, _Experiments);

  function Neon() {
    _classCallCheck(this, Neon);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Neon).call(this));

    _this.circles = null;
    _this.circlesLength = null;
    _this.circlesColor = null;

    _this.createCircles();

    _this.update();
    return _this;
  }

  _createClass(Neon, [{
    key: 'createCircle',
    value: function createCircle() {
      var x = this.mouse.x + (0, _random.randomNormalized)() * 200;
      var y = this.mouse.y + (0, _random.randomNormalized)() * 200;
      var radius = 10 + Math.abs((0, _random.randomNormalized)() * 10);
      var color = this.colors[this.circlesColor][(0, _random.randomInt)(0, this.colors.length - 1)];

      var circle = new _Circle2.default(x, y, radius, color);

      this.circles.push(circle);
    }
  }, {
    key: 'destroyCircle',
    value: function destroyCircle(index) {
      this.circles.splice(index, 1);
    }
  }, {
    key: 'createCircles',
    value: function createCircles() {
      this.circles = [];
      this.circlesLength = 500;
      this.circlesColor = (0, _random.randomInt)(0, this.colors.length - 1);

      for (var i = 0; i <= this.circlesLength; i++) {
        this.createCircle();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Neon.prototype), 'update', this).call(this);

      this.stats.begin();

      this.circles.forEach(function (circle, index) {
        circle.move(_this2.mouse.x, _this2.mouse.y);
        circle.draw(_this2.context);

        if (!circle.alive) {
          _this2.destroyCircle(index);
          _this2.createCircle();
        }
      });

      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Neon.prototype), 'dblclick', this).call(this);

      this.createCircles();
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Neon.prototype), 'resize', this).call(this);

      this.createCircles();
    }
  }]);

  return Neon;
}(_Experiments3.default);

exports.default = Neon;

},{"../../classes/Experiments":2,"../../lib/random":18,"./Circle":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _random = require('../../lib/random');

var _Vector = require('../../classes/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mover = function () {
  function Mover(x, y, radius, color) {
    _classCallCheck(this, Mover);

    this.radius = radius;

    this.color = color;

    this.position = new _Vector2.default(x, y);
    this.velocity = new _Vector2.default(0, 0);
    this.acceleration = new _Vector2.default(0, 0);
    this.direction = new _Vector2.default(0, 0);

    this.multiplier = (0, _random.randomArbitrary)(0.5, 1);
  }

  _createClass(Mover, [{
    key: 'check',
    value: function check() {
      if (this.position.x > window.innerWidth) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = window.innerWidth;
      }

      if (this.position.y > window.innerHeight) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = window.innerHeight;
      }
    }
  }, {
    key: 'update',
    value: function update(mouse, multiplier) {
      this.direction = _Vector2.default.sub(mouse, this.position);
      this.direction.normalize();
      this.direction.mult(this.multiplier);
      this.direction.mult(multiplier);

      this.acceleration = this.direction;

      this.velocity.add(this.acceleration);
      this.velocity.limit(15);

      this.position.add(this.velocity);
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      this.check();

      context.globalCompositeOperation = 'lighter';

      context.beginPath();
      context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      context.closePath();

      context.fillStyle = this.color;
      context.fill();
    }
  }]);

  return Mover;
}();

exports.default = Mover;

},{"../../classes/Vector":3,"../../lib/random":18}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Mover = require('./Mover');

var _Mover2 = _interopRequireDefault(_Mover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Atom = function (_Experiments) {
  _inherits(Atom, _Experiments);

  function Atom() {
    _classCallCheck(this, Atom);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Atom).call(this));

    _this.movers = null;
    _this.moversLength = null;
    _this.moversColor = null;
    _this.moversMultiply = null;

    _this.createMovers();

    _this.update();
    return _this;
  }

  _createClass(Atom, [{
    key: 'createMover',
    value: function createMover() {
      var x = (0, _random.randomInt)(0, window.innerWidth);
      var y = (0, _random.randomInt)(0, window.innerHeight);
      var radius = (0, _random.randomInt)(1, 5);
      var color = this.colors[this.moversColor][(0, _random.randomInt)(0, this.colors.length - 1)];

      var mover = new _Mover2.default(x, y, radius, color);

      this.movers.push(mover);
    }
  }, {
    key: 'createMovers',
    value: function createMovers() {
      this.movers = [];
      this.moversLength = 250;
      this.moversColor = (0, _random.randomInt)(0, this.colors.length - 1);
      this.moversMultiply = 1;

      for (var i = 0; i <= this.moversLength; i++) {
        this.createMover();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Atom.prototype), 'update', this).call(this);

      this.stats.begin();

      this.movers.forEach(function (mover, index) {
        mover.update(_this2.mouse, _this2.moversMultiply);
        mover.draw(_this2.context);
      });

      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Atom.prototype), 'dblclick', this).call(this);

      this.createMovers();
    }
  }, {
    key: 'mousedown',
    value: function mousedown() {
      _get(Object.getPrototypeOf(Atom.prototype), 'mousedown', this).call(this);

      this.moversMultiply *= -1;
    }
  }, {
    key: 'mouseup',
    value: function mouseup() {
      _get(Object.getPrototypeOf(Atom.prototype), 'mouseup', this).call(this);

      this.moversMultiply *= -1;
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Atom.prototype), 'resize', this).call(this);

      this.createMovers();
    }
  }]);

  return Atom;
}(_Experiments3.default);

exports.default = Atom;

},{"../../classes/Experiments":2,"../../lib/random":18,"./Mover":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// import Cell from './Cell'


var _math = require('../../lib/math');

var _perlin = require('../../lib/perlin');

var _Vector = require('../../classes/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _perlin.noiseSeed)(Math.floor(Math.random() * 100));

var Field = function () {
  function Field() {
    _classCallCheck(this, Field);

    this.resolution = 10;

    this.columns = Math.ceil(window.innerWidth / this.resolution);
    this.rows = Math.ceil(window.innerHeight / this.resolution);

    // this.cell = Array(this.columns).fill().map(() => [])

    this.field = Array(this.columns).fill().map(function () {
      return [];
    });

    this.noise = 0;

    this.create();
  }

  _createClass(Field, [{
    key: 'create',
    value: function create() {
      for (var i = 0, x = 0; i < this.columns; i++) {
        for (var j = 0, y = 0; j < this.rows; j++) {
          var angle = (0, _math.map)((0, _perlin.noise)(x, y, this.noise), 0, 1, 0, Math.PI * 2);

          // this.cell[i][j] = new Cell(i, j, angle)
          this.field[i][j] = new _Vector2.default(Math.cos(angle), Math.sin(angle));

          y += 0.1;
        }

        x += 0.1;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      for (var i = 0, x = 0; i < this.columns; i++) {
        for (var j = 0, y = 0; j < this.rows; j++) {
          var angle = (0, _math.map)((0, _perlin.noise)(x, y, this.noise), 0, 1, 0, Math.PI * 2);

          // this.cell[i][j].update(angle)
          this.field[i][j].set(Math.cos(angle), Math.sin(angle));

          y += 0.1;
        }

        x += 0.1;
      }

      this.noise += 0.01;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      for (var i = 0; i < this.columns; i++) {
        for (var j = 0; j < this.rows; j++) {
          // this.cell[i][j].draw(context)
        }
      }
    }
  }, {
    key: 'lookup',
    value: function lookup(position) {
      var column = Math.floor((0, _math.constrain)(position.x / this.resolution, 0, this.columns - 1));
      var row = Math.floor((0, _math.constrain)(position.y / this.resolution, 0, this.rows - 1));

      return this.field[column][row].copy();
    }
  }]);

  return Field;
}();

exports.default = Field;

},{"../../classes/Vector":3,"../../lib/math":16,"../../lib/perlin":17}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('../../classes/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
  function Particle(x, y, color, radius, speed, force) {
    _classCallCheck(this, Particle);

    this.color = color;

    this.position = new _Vector2.default(x, y);
    this.acceleration = new _Vector2.default(0, 0);
    this.velocity = new _Vector2.default(0, 0);

    this.radius = radius;
    this.speed = speed;
    this.force = force;
  }

  _createClass(Particle, [{
    key: 'follow',
    value: function follow(flow) {
      var desired = flow.lookup(this.position);

      desired.mult(this.speed);

      var steer = _Vector2.default.sub(desired, this.velocity);

      steer.limit(this.force);

      this.apply(steer);
    }
  }, {
    key: 'apply',
    value: function apply(force) {
      this.acceleration.add(force);
    }
  }, {
    key: 'update',
    value: function update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.speed);

      this.position.add(this.velocity);

      this.acceleration.mult(0);
    }
  }, {
    key: 'check',
    value: function check() {
      if (this.position.x > window.innerWidth) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = window.innerWidth;
      }

      if (this.position.y > window.innerHeight) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = window.innerHeight;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.lineWidth = 2;

      context.globalCompositeOperation = 'lighter';

      context.beginPath();
      context.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI);
      context.closePath();

      context.fillStyle = this.color;
      context.fill();
    }
  }]);

  return Particle;
}();

exports.default = Particle;

},{"../../classes/Vector":3}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Particle = require('./Particle');

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flow = function (_Experiments) {
  _inherits(Flow, _Experiments);

  function Flow() {
    _classCallCheck(this, Flow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Flow).call(this));

    _this.field = null;

    _this.particles = null;
    _this.particlesLength = null;
    _this.particlesColor = null;

    _this.createField();
    _this.createParticles();

    _this.update();
    return _this;
  }

  _createClass(Flow, [{
    key: 'createField',
    value: function createField() {
      this.field = new _Field2.default();
      this.field.draw(this.context);
    }
  }, {
    key: 'createParticle',
    value: function createParticle() {
      var x = (0, _random.randomInt)(0, window.innerWidth);
      var y = (0, _random.randomInt)(0, window.innerHeight);
      var color = this.colors[this.particlesColor][(0, _random.randomInt)(0, this.colors.length - 1)];
      var radius = (0, _random.randomArbitrary)(1, 6);
      var speed = (0, _random.randomInt)(4, 12);
      var force = (0, _random.randomArbitrary)(0.4, 1);

      var particle = new _Particle2.default(x, y, color, radius, speed, force);

      this.particles.push(particle);
    }
  }, {
    key: 'createParticles',
    value: function createParticles() {
      this.particles = [];
      this.particlesLength = 1000;
      this.particlesColor = (0, _random.randomInt)(0, this.colors.length - 1);

      for (var i = 0; i <= this.particlesLength; i++) {
        this.createParticle();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Flow.prototype), 'update', this).call(this);

      this.stats.begin();

      this.field.update();

      this.particles.forEach(function (particle, index) {
        particle.follow(_this2.field);
        particle.update();
        particle.check();
        particle.draw(_this2.context);
      });

      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Flow.prototype), 'dblclick', this).call(this);

      this.createField();
      this.createParticles();
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Flow.prototype), 'resize', this).call(this);

      this.createField();
      this.createParticles();
    }
  }]);

  return Flow;
}(_Experiments3.default);

exports.default = Flow;

},{"../../classes/Experiments":2,"../../lib/random":18,"./Field":11,"./Particle":12}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('../../classes/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
  function Circle(x, y, radius, color) {
    _classCallCheck(this, Circle);

    this.radius = radius;

    this.color = color;

    this.position = new _Vector2.default(x, y);
    this.acceleration = new _Vector2.default(0, 0);
    this.velocity = new _Vector2.default(0, 0);
  }

  _createClass(Circle, [{
    key: 'check',
    value: function check() {
      if (this.position.x > window.innerWidth) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = window.innerWidth;
      }

      if (this.position.y > window.innerHeight) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = window.innerHeight;
      }
    }
  }, {
    key: 'separate',
    value: function separate(circles) {
      var _this = this;

      var sum = new _Vector2.default();

      var counter = 0;

      circles.forEach(function (circle, index) {
        var distance = _Vector2.default.dist(_this.position, circle.position);

        if (distance < 50) {
          var difference = _Vector2.default.sub(_this.position, circle.position);

          difference.normalize();
          difference.div(distance);

          sum.add(difference);

          counter++;
        }
      });

      if (counter > 0) {
        sum.div(counter);
        sum.normalize();

        var steer = _Vector2.default.sub(sum, this.velocity);

        steer.limit();

        this.apply(steer);
      }
    }
  }, {
    key: 'apply',
    value: function apply(force) {
      this.acceleration.add(force);
    }
  }, {
    key: 'update',
    value: function update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(10);

      this.position.add(this.velocity);

      this.acceleration.mult(0);
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      this.check();

      context.globalCompositeOperation = 'lighter';

      context.beginPath();
      context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      context.closePath();

      context.fillStyle = this.color;
      context.fill();
    }
  }]);

  return Circle;
}();

exports.default = Circle;

},{"../../classes/Vector":3}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Circle = require('./Circle');

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flow = function (_Experiments) {
  _inherits(Flow, _Experiments);

  function Flow() {
    _classCallCheck(this, Flow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Flow).call(this));

    _this.circles = null;
    _this.circlesLength = null;
    _this.circlesColor = null;

    _this.createCircles();

    _this.update();
    return _this;
  }

  _createClass(Flow, [{
    key: 'createCircle',
    value: function createCircle() {
      var x = (0, _random.randomInt)(0, window.innerWidth);
      var y = (0, _random.randomInt)(0, window.innerHeight);
      var color = this.colors[this.circlesColor][(0, _random.randomInt)(0, this.colors.length - 1)];

      var circle = new _Circle2.default(x, y, 1, color);

      this.circles.push(circle);
    }
  }, {
    key: 'createCircles',
    value: function createCircles() {
      this.circles = [];
      this.circlesLength = 500;
      this.circlesColor = (0, _random.randomInt)(0, this.colors.length - 1);

      for (var i = 0; i <= this.circlesLength; i++) {
        this.createCircle();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Flow.prototype), 'update', this).call(this);

      this.stats.begin();

      this.circles.forEach(function (circle, index) {
        circle.separate(_this2.circles);
        circle.update();
        circle.draw(_this2.context);
      });

      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Flow.prototype), 'dblclick', this).call(this);

      this.createCircles();
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Flow.prototype), 'resize', this).call(this);

      this.createCircles();
    }
  }]);

  return Flow;
}(_Experiments3.default);

exports.default = Flow;

},{"../../classes/Experiments":2,"../../lib/random":18,"./Circle":14}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constrain = constrain;
exports.dist = dist;
exports.lerp = lerp;
exports.mag = mag;
exports.map = map;
exports.max = max;
exports.min = min;
exports.norm = norm;
/**
 * Constrains a value between a minimum and maximum value.
 */
function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

/**
 * Calculates the distance between two points.
 */
function dist(x1, y1, z1, x2, y2, z2) {
  if (arguments.length === 4) {
    return Math.sqrt((z1 - x1) * (z1 - x1) + (x2 - y1) * (x2 - y1));
  } else if (arguments.length === 6) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
  }
}

/**
 * Calculates a number between two numbers at a specific increment. The amt
 * parameter is the amount to interpolate between the two values where 0.0
 * equal to the first point, 0.1 is very near the first point, 0.5 is
 * half-way in between, etc. The lerp function is convenient for creating
 * motion along a straight path and for drawing dotted lines.
 */
function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}

/**
 * Calculates the magnitude (or length) of a vector. A vector is a direction
 * in space commonly used in computer graphics and linear algebra. Because it
 * has no "start" position, the magnitude of a vector can be thought of as
 * the distance from the coordinate 0,0 to its x,y value. Therefore, mag() is
 * a shortcut for writing dist(0, 0, x, y).
 */
function mag(x, y) {
  return Math.sqrt(x * x + y * y);
}

/**
 * Re-maps a number from one range to another.
 *
 * In the first example above, the number 25 is converted from a value in the
 * range of 0 to 100 into a value that ranges from the left edge of the
 * window (0) to the right edge (width).
 */
function map(n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

/**
 * Determines the largest value in a sequence of numbers, and then returns
 * that value. max() accepts any number of Number parameters, or an Array
 * of any length.
 */
function max() {
  if (arguments[0] instanceof Array) {
    return Math.max.apply(null, arguments[0]);
  } else {
    return Math.max.apply(null, arguments);
  }
}

/**
 * Determines the smallest value in a sequence of numbers, and then returns
 * that value. min() accepts any number of Number parameters, or an Array
 * of any length.
 */
function min() {
  if (arguments[0] instanceof Array) {
    return Math.min.apply(null, arguments[0]);
  } else {
    return Math.min.apply(null, arguments);
  }
}

/**
 * Normalizes a number from another range into a value between 0 and 1.
 * Identical to map(value, low, high, 0, 1).
 *
 * Numbers outside of the range are not clamped to 0 and 1, because
 * out-of-range values are often intentional and useful. (See the second
 * example above.)
 */
function norm(n, start, stop) {
  return this.map(n, start, stop, 0, 1);
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noise = noise;
exports.noiseDetail = noiseDetail;
exports.noiseSeed = noiseSeed;
var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;

var perlin_octaves = 4; // default to medium smooth
var perlin_amp_falloff = 0.5; // 50% reduction/octave

var scaled_cosine = function scaled_cosine(i) {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
};

var perlin; // will be initialized lazily by noise() or noiseSeed()

function noise(x, y, z) {
  y = y || 0;
  z = z || 0;

  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (var i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  var xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z);
  var xf = x - xi;
  var yf = y - yi;
  var zf = z - zi;
  var rxf, ryf;

  var r = 0;
  var ampl = 0.5;

  var n1, n2, n3;

  for (var o = 0; o < perlin_octaves; o++) {
    var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
    n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
    n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) {
      xi++;xf--;
    }
    if (yf >= 1.0) {
      yi++;yf--;
    }
    if (zf >= 1.0) {
      zi++;zf--;
    }
  }
  return r;
};

function noiseDetail(lod, falloff) {
  // Adjusts the character and level of detail produced by the Perlin noise
  // By default, noise is computed over 4 octaves
  // https://p5js.org/reference/#/p5/noiseDetail
  if (lod > 0) {
    perlin_octaves = lod;
  }
  if (falloff > 0) {
    perlin_amp_falloff = falloff;
  }
};

function noiseSeed(seed) {
  // Linear Congruential Generator
  // Variant of a Lehman Generator
  var lcg = function () {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    var m = 4294967296,

    // a - 1 should be divisible by m's prime factors
    a = 1664525,

    // c and m should be co-prime
    c = 1013904223,
        seed,
        z;
    return {
      setSeed: function setSeed(val) {
        // pick a random seed if val is undefined or null
        // the >>> 0 casts the seed to an unsigned 32-bit integer
        z = seed = (val == null ? Math.random() * m : val) >>> 0;
      },
      getSeed: function getSeed() {
        return seed;
      },
      rand: function rand() {
        // define the recurrence relationship
        z = (a * z + c) % m;
        // return a float in [0, 1)
        // if z = m then z / m = 0 therefore (z % m) / m < 1 always
        return z / m;
      }
    };
  }();

  lcg.setSeed(seed);

  perlin = new Array(PERLIN_SIZE + 1);

  for (var i = 0; i < PERLIN_SIZE + 1; i++) {
    perlin[i] = lcg.rand();
  }
};

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomArbitrary = randomArbitrary;
exports.randomInt = randomInt;
exports.randomNormalized = randomNormalized;
function randomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomNormalized() {
  var x1 = void 0,
      x2 = void 0,
      rad = void 0;

  do {
    x1 = 2 * Math.random() - 1;
    x2 = 2 * Math.random() - 1;

    rad = x1 * x1 + x2 * x2;
  } while (rad >= 1 || rad === 0);

  var c = Math.sqrt(-2 * Math.log(rad) / rad);

  return x1 * c;
}

},{}],19:[function(require,module,exports){
'use strict';

var _index = require('./experiments/1/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./experiments/2/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./experiments/3/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./experiments/4/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./experiments/5/index');

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var experiments = {
  'root': _index2.default,
  'neon': _index4.default,
  'atom': _index6.default,
  'flow': _index8.default,
  'away': _index10.default
};

var experimentsNames = Object.getOwnPropertyNames(experiments);
var experimentsSelected = window.location.hash ? window.location.hash.replace('#', '') : experimentsNames[0];

var experimentsActive = void 0;

if (experiments[experimentsSelected]) {
  experimentsActive = new experiments[experimentsSelected]();
} else {
  experimentsActive = new experiments['root']();
}

window.addEventListener('hashchange', function (e) {
  var hash = window.location.hash.replace('#', '');

  if (experimentsNames.indexOf(hash) > -1) {
    experimentsActive.destroy();

    experimentsActive = new experiments[hash]();
  }
});

},{"./experiments/1/index":6,"./experiments/2/index":8,"./experiments/3/index":10,"./experiments/4/index":13,"./experiments/5/index":15}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc3RhdHMtanMvYnVpbGQvc3RhdHMubWluLmpzIiwic3JjXFxqc1xcY2xhc3Nlc1xcRXhwZXJpbWVudHMuanMiLCJzcmNcXGpzXFxjbGFzc2VzXFxWZWN0b3IuanMiLCJzcmMvanMvZGF0YS9jb2xvcnMuanNvbiIsInNyY1xcanNcXGV4cGVyaW1lbnRzXFwxXFxXYWxrZXIuanMiLCJzcmNcXGpzXFxleHBlcmltZW50c1xcMVxcaW5kZXguanMiLCJzcmNcXGpzXFxleHBlcmltZW50c1xcMlxcQ2lyY2xlLmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDJcXGluZGV4LmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDNcXE1vdmVyLmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDNcXGluZGV4LmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDRcXEZpZWxkLmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDRcXFBhcnRpY2xlLmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDRcXGluZGV4LmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDVcXENpcmNsZS5qcyIsInNyY1xcanNcXGV4cGVyaW1lbnRzXFw1XFxpbmRleC5qcyIsInNyY1xcanNcXGxpYlxcbWF0aC5qcyIsInNyY1xcanNcXGxpYlxccGVybGluLmpzIiwic3JjXFxqc1xcbGliXFxyYW5kb20uanMiLCJzcmNcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNOQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFc7QUFDbkIseUJBQWU7QUFBQTs7QUFDYixTQUFLLE1BQUw7O0FBRUEsU0FBSyxLQUFMLEdBQWEsSUFBYjtBQUNBLFNBQUssTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLLE9B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SUFBTSxzQkFBdUIsT0FBTyxRQUFQLENBQWdCLElBQWpCLEdBQXlCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixPQUFyQixDQUE2QixHQUE3QixFQUFrQyxFQUFsQyxDQUF6QixHQUFpRSxpQkFBaUIsQ0FBakIsQ0FBN0Y7O0FBRUEsSUFBSSwwQkFBSjs7QUFFQSxJQUFJLFlBQVksbUJBQVosQ0FBSixFQUFzQztBQUNwQyxzQkFBb0IsSUFBSSxZQUFZLG1CQUFaLENBQUosRUFBcEI7QUFDRCxDQUZELE1BRU87QUFDTCxzQkFBb0IsSUFBSSxZQUFZLE1BQVosQ0FBSixFQUFwQjtBQUNEOztBQUVELE9BQU8sZ0JBQVAsQ0FBd0IsWUFBeEIsRUFBc0MsVUFBVSxDQUFWLEVBQWE7QUFDakQsTUFBTSxPQUFPLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixPQUFyQixDQUE2QixHQUE3QixFQUFrQyxFQUFsQyxDQUFiOztBQUVBLE1BQUksaUJBQWlCLE9BQWpCLENBQXlCLElBQXpCLElBQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDdkMsc0JBQWtCLE9BQWxCOztBQUVBLHdCQUFvQixJQUFJLFlBQVksSUFBWixDQUFKLEVBQXBCO0FBQ0Q7QUFDRixDQVJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHN0YXRzLmpzIC0gaHR0cDovL2dpdGh1Yi5jb20vbXJkb29iL3N0YXRzLmpzXG52YXIgU3RhdHM9ZnVuY3Rpb24oKXt2YXIgbD1EYXRlLm5vdygpLG09bCxnPTAsbj1JbmZpbml0eSxvPTAsaD0wLHA9SW5maW5pdHkscT0wLHI9MCxzPTAsZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2YuaWQ9XCJzdGF0c1wiO2YuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLGZ1bmN0aW9uKGIpe2IucHJldmVudERlZmF1bHQoKTt0KCsrcyUyKX0sITEpO2Yuc3R5bGUuY3NzVGV4dD1cIndpZHRoOjgwcHg7b3BhY2l0eTowLjk7Y3Vyc29yOnBvaW50ZXJcIjt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2EuaWQ9XCJmcHNcIjthLnN0eWxlLmNzc1RleHQ9XCJwYWRkaW5nOjAgMCAzcHggM3B4O3RleHQtYWxpZ246bGVmdDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDJcIjtmLmFwcGVuZENoaWxkKGEpO3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5pZD1cImZwc1RleHRcIjtpLnN0eWxlLmNzc1RleHQ9XCJjb2xvcjojMGZmO2ZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtc2l6ZTo5cHg7Zm9udC13ZWlnaHQ6Ym9sZDtsaW5lLWhlaWdodDoxNXB4XCI7XG5pLmlubmVySFRNTD1cIkZQU1wiO2EuYXBwZW5kQ2hpbGQoaSk7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjLmlkPVwiZnBzR3JhcGhcIjtjLnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3NHB4O2hlaWdodDozMHB4O2JhY2tncm91bmQtY29sb3I6IzBmZlwiO2ZvcihhLmFwcGVuZENoaWxkKGMpOzc0PmMuY2hpbGRyZW4ubGVuZ3RoOyl7dmFyIGo9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7ai5zdHlsZS5jc3NUZXh0PVwid2lkdGg6MXB4O2hlaWdodDozMHB4O2Zsb2F0OmxlZnQ7YmFja2dyb3VuZC1jb2xvcjojMTEzXCI7Yy5hcHBlbmRDaGlsZChqKX12YXIgZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2QuaWQ9XCJtc1wiO2Quc3R5bGUuY3NzVGV4dD1cInBhZGRpbmc6MCAwIDNweCAzcHg7dGV4dC1hbGlnbjpsZWZ0O2JhY2tncm91bmQtY29sb3I6IzAyMDtkaXNwbGF5Om5vbmVcIjtmLmFwcGVuZENoaWxkKGQpO3ZhciBrPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5rLmlkPVwibXNUZXh0XCI7ay5zdHlsZS5jc3NUZXh0PVwiY29sb3I6IzBmMDtmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtmb250LXNpemU6OXB4O2ZvbnQtd2VpZ2h0OmJvbGQ7bGluZS1oZWlnaHQ6MTVweFwiO2suaW5uZXJIVE1MPVwiTVNcIjtkLmFwcGVuZENoaWxkKGspO3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5pZD1cIm1zR3JhcGhcIjtlLnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3NHB4O2hlaWdodDozMHB4O2JhY2tncm91bmQtY29sb3I6IzBmMFwiO2ZvcihkLmFwcGVuZENoaWxkKGUpOzc0PmUuY2hpbGRyZW4ubGVuZ3RoOylqPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLGouc3R5bGUuY3NzVGV4dD1cIndpZHRoOjFweDtoZWlnaHQ6MzBweDtmbG9hdDpsZWZ0O2JhY2tncm91bmQtY29sb3I6IzEzMVwiLGUuYXBwZW5kQ2hpbGQoaik7dmFyIHQ9ZnVuY3Rpb24oYil7cz1iO3N3aXRjaChzKXtjYXNlIDA6YS5zdHlsZS5kaXNwbGF5PVxuXCJibG9ja1wiO2Quc3R5bGUuZGlzcGxheT1cIm5vbmVcIjticmVhaztjYXNlIDE6YS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGQuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9fTtyZXR1cm57UkVWSVNJT046MTIsZG9tRWxlbWVudDpmLHNldE1vZGU6dCxiZWdpbjpmdW5jdGlvbigpe2w9RGF0ZS5ub3coKX0sZW5kOmZ1bmN0aW9uKCl7dmFyIGI9RGF0ZS5ub3coKTtnPWItbDtuPU1hdGgubWluKG4sZyk7bz1NYXRoLm1heChvLGcpO2sudGV4dENvbnRlbnQ9ZytcIiBNUyAoXCIrbitcIi1cIitvK1wiKVwiO3ZhciBhPU1hdGgubWluKDMwLDMwLTMwKihnLzIwMCkpO2UuYXBwZW5kQ2hpbGQoZS5maXJzdENoaWxkKS5zdHlsZS5oZWlnaHQ9YStcInB4XCI7cisrO2I+bSsxRTMmJihoPU1hdGgucm91bmQoMUUzKnIvKGItbSkpLHA9TWF0aC5taW4ocCxoKSxxPU1hdGgubWF4KHEsaCksaS50ZXh0Q29udGVudD1oK1wiIEZQUyAoXCIrcCtcIi1cIitxK1wiKVwiLGE9TWF0aC5taW4oMzAsMzAtMzAqKGgvMTAwKSksYy5hcHBlbmRDaGlsZChjLmZpcnN0Q2hpbGQpLnN0eWxlLmhlaWdodD1cbmErXCJweFwiLG09YixyPTApO3JldHVybiBifSx1cGRhdGU6ZnVuY3Rpb24oKXtsPXRoaXMuZW5kKCl9fX07XCJvYmplY3RcIj09PXR5cGVvZiBtb2R1bGUmJihtb2R1bGUuZXhwb3J0cz1TdGF0cyk7XG4iLCJpbXBvcnQgQ29sb3JzIGZyb20gJy4uL2RhdGEvY29sb3JzLmpzb24nXHJcbmltcG9ydCBTdGF0cyBmcm9tICdzdGF0cy1qcydcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3RvcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cGVyaW1lbnRzIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzLmNvbG9ycyA9IENvbG9yc1xyXG5cclxuICAgIHRoaXMuc3RhdHMgPSBudWxsXHJcbiAgICB0aGlzLmNhbnZhcyA9IG51bGxcclxuICAgIHRoaXMuY29udGV4dCA9IG51bGxcclxuXHJcbiAgICB0aGlzLmNlbnRlciA9IG5ldyBWZWN0b3Iod2luZG93LmlubmVyV2lkdGggLyAyLCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKVxyXG4gICAgdGhpcy5tb3VzZSA9IG5ldyBWZWN0b3Iod2luZG93LmlubmVyV2lkdGggLyAyLCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKVxyXG5cclxuICAgIHRoaXMuZXZlbnREb3duID0gdGhpcy5tb3VzZWRvd24uYmluZCh0aGlzKVxyXG4gICAgdGhpcy5ldmVudE1vdmUgPSB0aGlzLm1vdXNlbW92ZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmV2ZW50VXAgPSB0aGlzLm1vdXNldXAuYmluZCh0aGlzKVxyXG5cclxuICAgIHRoaXMuZXZlbnRDbGljayA9IHRoaXMuY2xpY2suYmluZCh0aGlzKVxyXG4gICAgdGhpcy5ldmVudENsaWNrRG91YmxlID0gdGhpcy5kYmxjbGljay5iaW5kKHRoaXMpXHJcblxyXG4gICAgdGhpcy5ldmVudFJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcylcclxuXHJcbiAgICB0aGlzLmV2ZW50VXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKVxyXG5cclxuICAgIHRoaXMuYW5pbWF0aW9uRnJhbWUgPSBudWxsXHJcblxyXG4gICAgdGhpcy5jcmVhdGVTdGF0cygpXHJcbiAgICB0aGlzLmNyZWF0ZUNhbnZhcygpXHJcbiAgICB0aGlzLmNyZWF0ZUNvbnRleHQoKVxyXG4gICAgdGhpcy5jcmVhdGVFdmVudHMoKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlU3RhdHMgKCkge1xyXG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cygpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIHRoaXMuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gMFxyXG4gICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG4gICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnRvcCA9IDBcclxuICAgIHRoaXMuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS56SW5kZXggPSA1MFxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gNjgpIHtcclxuICAgICAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICh0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykgPyAnbm9uZScgOiAnYmxvY2snXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzLmRvbUVsZW1lbnQpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVDYW52YXMgKCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG4gICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZCgnY2FudmFzJylcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ29udGV4dCAoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjMDUwNTA1J1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVFdmVudHMgKCkge1xyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5ldmVudERvd24pXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmV2ZW50TW92ZSlcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmV2ZW50VXApXHJcblxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuZXZlbnREb3duKVxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ldmVudE1vdmUpXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuZXZlbnRVcClcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZXZlbnRDbGljaylcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5ldmVudENsaWNrRG91YmxlKVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmV2ZW50UmVzaXplKVxyXG4gIH1cclxuXHJcbiAgY2xpY2sgKGUpIHtcclxuXHJcbiAgfVxyXG5cclxuICBkYmxjbGljayAoZSkge1xyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMVxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3ZlcidcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyMwNTA1MDUnXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcclxuICB9XHJcblxyXG4gIG1vdXNlZG93biAoZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG1vdXNlbW92ZSAoZSkge1xyXG4gICAgaWYgKGUudG91Y2hlcykge1xyXG4gICAgICB0aGlzLm1vdXNlLnNldChlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW91c2Uuc2V0KGUucGFnZVgsIGUucGFnZVkpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3VzZXVwIChlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcmVzaXplICgpIHtcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxyXG5cclxuICAgIHRoaXMuY2VudGVyLnNldCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpXHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKCkge1xyXG4gICAgdGhpcy5hbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSlcclxuICB9XHJcblxyXG4gIGRlc3Ryb3lTdGF0cyAoKSB7XHJcbiAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnN0YXRzLmRvbUVsZW1lbnQpXHJcbiAgfVxyXG5cclxuICBkZXN0cm95Q2FudmFzICgpIHtcclxuICAgIHRoaXMuY2FudmFzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jYW52YXMpXHJcbiAgfVxyXG5cclxuICBkZXN0cm95Q29udGV4dCAoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsXHJcbiAgfVxyXG5cclxuICBkZXN0cm95RXZlbnRzICgpIHtcclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZXZlbnREb3duKVxyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ldmVudE1vdmUpXHJcbiAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ldmVudFVwKVxyXG5cclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmV2ZW50RG93bilcclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuZXZlbnRNb3ZlKVxyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmV2ZW50VXApXHJcblxyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmV2ZW50Q2xpY2spXHJcbiAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuZXZlbnRDbGlja0RvdWJsZSlcclxuXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5ldmVudFJlc2l6ZSlcclxuICB9XHJcblxyXG4gIGRlc3Ryb3kgKCkge1xyXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWUpXHJcblxyXG4gICAgdGhpcy5kZXN0cm95RXZlbnRzKClcclxuICAgIHRoaXMuZGVzdHJveUNhbnZhcygpXHJcbiAgICB0aGlzLmRlc3Ryb3lDb250ZXh0KClcclxuICAgIHRoaXMuZGVzdHJveVN0YXRzKClcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3RvciAoeCA9IDAsIHkgPSAwLCB6ID0gMCkge1xyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gICAgdGhpcy56ID0gelxyXG4gIH1cclxuXHJcbiAgc2V0ICh4LCB5LCB6KSB7XHJcbiAgICBpZiAoeCBpbnN0YW5jZW9mIFZlY3Rvcikge1xyXG4gICAgICB0aGlzLnggPSB4LnggfHwgMFxyXG4gICAgICB0aGlzLnkgPSB4LnkgfHwgMFxyXG4gICAgICB0aGlzLnogPSB4LnogfHwgMFxyXG5cclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnggPSB4IHx8IDBcclxuICAgIHRoaXMueSA9IHkgfHwgMFxyXG4gICAgdGhpcy56ID0geiB8fCAwXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIGNvcHkgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnksIHRoaXMueilcclxuICB9XHJcblxyXG4gIGFkZCAoeCwgeSwgeikge1xyXG4gICAgaWYgKHggaW5zdGFuY2VvZiBWZWN0b3IpIHtcclxuICAgICAgdGhpcy54ICs9IHgueCB8fCAwXHJcbiAgICAgIHRoaXMueSArPSB4LnkgfHwgMFxyXG4gICAgICB0aGlzLnogKz0geC56IHx8IDBcclxuXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy54ICs9IHggfHwgMFxyXG4gICAgdGhpcy55ICs9IHkgfHwgMFxyXG4gICAgdGhpcy56ICs9IHogfHwgMFxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBzdWIgKHgsIHksIHopIHtcclxuICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XHJcbiAgICAgIHRoaXMueCAtPSB4LnggfHwgMFxyXG4gICAgICB0aGlzLnkgLT0geC55IHx8IDBcclxuICAgICAgdGhpcy56IC09IHgueiB8fCAwXHJcblxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMueCAtPSB4IHx8IDBcclxuICAgIHRoaXMueSAtPSB5IHx8IDBcclxuICAgIHRoaXMueiAtPSB6IHx8IDBcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgbXVsdCAobiA9IDApIHtcclxuICAgIHRoaXMueCAqPSBuXHJcbiAgICB0aGlzLnkgKj0gblxyXG4gICAgdGhpcy56ICo9IG5cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZGl2IChuKSB7XHJcbiAgICB0aGlzLnggLz0gblxyXG4gICAgdGhpcy55IC89IG5cclxuICAgIHRoaXMueiAvPSBuXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIG1hZyAoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubWFnU3EoKSlcclxuICB9XHJcblxyXG4gIG1hZ1NxICgpIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLnhcclxuICAgIGNvbnN0IHkgPSB0aGlzLnlcclxuICAgIGNvbnN0IHogPSB0aGlzLnpcclxuXHJcbiAgICByZXR1cm4gKHggKiB4ICsgeSAqIHkgKyB6ICogeilcclxuICB9XHJcblxyXG4gIGRvdCAoeCA9IDAsIHkgPSAwLCB6ID0gMCkge1xyXG4gICAgaWYgKHggaW5zdGFuY2VvZiBWZWN0b3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZG90KHgueCwgeC55LCB4LnopXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5ICsgdGhpcy56ICogelxyXG4gIH1cclxuXHJcbiAgY3Jvc3MgKHYpIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLnkgKiB2LnogLSB0aGlzLnogKiB2LnlcclxuICAgIGNvbnN0IHkgPSB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnpcclxuICAgIGNvbnN0IHogPSB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LnhcclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih4LCB5LCB6KVxyXG4gIH1cclxuXHJcbiAgZGlzdCAodikge1xyXG4gICAgY29uc3QgZCA9IHYuY29weSgpLnN1Yih0aGlzKVxyXG5cclxuICAgIHJldHVybiBkLm1hZygpXHJcbiAgfVxyXG5cclxuICBub3JtYWxpemUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2KHRoaXMubWFnKCkpXHJcbiAgfVxyXG5cclxuICBsaW1pdCAobCkge1xyXG4gICAgdmFyIG1TcSA9IHRoaXMubWFnU3EoKVxyXG5cclxuICAgIGlmIChtU3EgPiBsICogbCkge1xyXG4gICAgICB0aGlzLmRpdihNYXRoLnNxcnQobVNxKSlcclxuICAgICAgdGhpcy5tdWx0KGwpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIHNldE1hZyAobikge1xyXG4gICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKCkubXVsdChuKVxyXG4gIH1cclxuXHJcbiAgaGVhZGluZyAoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueClcclxuICB9XHJcblxyXG4gIHJvdGF0ZSAoYSkge1xyXG4gICAgY29uc3QgbmV3SGVhZGluZyA9IHRoaXMuaGVhZGluZygpICsgYVxyXG4gICAgY29uc3QgbWFnID0gdGhpcy5tYWcoKVxyXG5cclxuICAgIHRoaXMueCA9IE1hdGguY29zKG5ld0hlYWRpbmcpICogbWFnXHJcbiAgICB0aGlzLnkgPSBNYXRoLnNpbihuZXdIZWFkaW5nKSAqIG1hZ1xyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBsZXJwICh4LCB5LCB6LCBhbXQpIHtcclxuICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxlcnAoeC54LCB4LnksIHgueiwgeSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnggKz0gKHggLSB0aGlzLngpICogYW10IHx8IDBcclxuICAgIHRoaXMueSArPSAoeSAtIHRoaXMueSkgKiBhbXQgfHwgMFxyXG4gICAgdGhpcy56ICs9ICh6IC0gdGhpcy56KSAqIGFtdCB8fCAwXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIGFycmF5ICgpIHtcclxuICAgIHJldHVybiBbdGhpcy54IHx8IDAsIHRoaXMueSB8fCAwLCB0aGlzLnogfHwgMF1cclxuICB9XHJcblxyXG4gIGVxdWFscyAoeCwgeSwgeikge1xyXG4gICAgbGV0IGEsIGIsIGNcclxuXHJcbiAgICBpZiAoeCBpbnN0YW5jZW9mIFZlY3Rvcikge1xyXG4gICAgICBhID0geC54IHx8IDBcclxuICAgICAgYiA9IHgueSB8fCAwXHJcbiAgICAgIGMgPSB4LnogfHwgMFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYSA9IHggfHwgMFxyXG4gICAgICBiID0geSB8fCAwXHJcbiAgICAgIGMgPSB6IHx8IDBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy54ID09PSBhICYmIHRoaXMueSA9PT0gYiAmJiB0aGlzLnogPT09IGNcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tQW5nbGUgKGFuZ2xlKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcihNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSwgMClcclxuICB9XHJcblxyXG4gIHN0YXRpYyByYW5kb20yRCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5mcm9tQW5nbGUoTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJhbmRvbTNEICgpIHtcclxuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyXHJcbiAgICBjb25zdCB2eiA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMVxyXG5cclxuICAgIHZhciB2eCA9IE1hdGguc3FydCgxIC0gdnogKiB2eikgKiBNYXRoLmNvcyhhbmdsZSlcclxuICAgIHZhciB2eSA9IE1hdGguc3FydCgxIC0gdnogKiB2eikgKiBNYXRoLnNpbihhbmdsZSlcclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih2eCwgdnksIHZ6KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZCAodjEsIHYyLCB0YXJnZXQpIHtcclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgIHRhcmdldCA9IHYxLmNvcHkoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFyZ2V0LnNldCh2MSlcclxuICAgIH1cclxuXHJcbiAgICB0YXJnZXQuYWRkKHYyKVxyXG5cclxuICAgIHJldHVybiB0YXJnZXRcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdWIgKHYxLCB2MiwgdGFyZ2V0KSB7XHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICB0YXJnZXQgPSB2MS5jb3B5KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRhcmdldC5zZXQodjEpXHJcbiAgICB9XHJcblxyXG4gICAgdGFyZ2V0LnN1Yih2MilcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbXVsdCAodiwgbiwgdGFyZ2V0KSB7XHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICB0YXJnZXQgPSB2LmNvcHkoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFyZ2V0LnNldCh2KVxyXG4gICAgfVxyXG5cclxuICAgIHRhcmdldC5tdWx0KG4pXHJcblxyXG4gICAgcmV0dXJuIHRhcmdldFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpdiAodiwgbiwgdGFyZ2V0KSB7XHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICB0YXJnZXQgPSB2LmNvcHkoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFyZ2V0LnNldCh2KVxyXG4gICAgfVxyXG5cclxuICAgIHRhcmdldC5kaXYobilcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZG90ICh2MSwgdjIpIHtcclxuICAgIHJldHVybiB2MS5kb3QodjIpXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3Jvc3MgKHYxLCB2Mikge1xyXG4gICAgcmV0dXJuIHYxLmNyb3NzKHYyKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpc3QgKHYxLCB2Mikge1xyXG4gICAgcmV0dXJuIHYxLmRpc3QodjIpXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbGVycCAodjEsIHYyLCBhbXQsIHRhcmdldCkge1xyXG4gICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgdGFyZ2V0ID0gdjEuY29weSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0YXJnZXQuc2V0KHYxKVxyXG4gICAgfVxyXG5cclxuICAgIHRhcmdldC5sZXJwKHYyLCBhbXQpXHJcblxyXG4gICAgcmV0dXJuIHRhcmdldFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFuZ2xlQmV0d2VlbiAodjEsIHYyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5hY29zKHYxLmRvdCh2MikgLyAodjEubWFnKCkgKiB2Mi5tYWcoKSkpXHJcbiAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzPVtcclxuICBbXCIjMGFkN2Q3XCIsIFwiIzIzMjgzMlwiLCBcIiNmZjJkNjRcIiwgXCIjZTZlNmU2XCJdLFxyXG4gIFtcIiNmZmRjMDBcIiwgXCIjZjU1MDhjXCIsIFwiIzlmMTlhNFwiLCBcIiM0NjJkNDZcIl0sXHJcbiAgW1wiI2ZhNTU1NVwiLCBcIiNmNWZhNzhcIiwgXCIjOGNlYjhjXCIsIFwiIzJkN2Q5MVwiXSxcclxuICBbXCIjMDA0MTgyXCIsIFwiIzBlOGNmMFwiLCBcIiNmYWZmYTRcIiwgXCIjZmY0YjY5XCJdLFxyXG4gIFtcIiMzYzFlNjlcIiwgXCIjNWEzYzg3XCIsIFwiI2U2NWE4N1wiLCBcIiNmZmFhYWFcIl1cclxuXVxyXG4iLCJpbXBvcnQgeyByYW5kb21JbnQgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Fsa2VyIHtcclxuICBjb25zdHJ1Y3RvciAoY29sb3IsIHgsIHkpIHtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvclxyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gIH1cclxuXHJcbiAgc3RlcCAoKSB7XHJcbiAgICBjb25zdCByYW5kb20gPSByYW5kb21JbnQoMCwgMylcclxuXHJcbiAgICBpZiAocmFuZG9tID09PSAwKSB7XHJcbiAgICAgIHRoaXMueCsrXHJcbiAgICB9IGVsc2UgaWYgKHJhbmRvbSA9PT0gMSkge1xyXG4gICAgICB0aGlzLngtLVxyXG4gICAgfSBlbHNlIGlmIChyYW5kb20gPT09IDIpIHtcclxuICAgICAgdGhpcy55KytcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMueS0tXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkcmF3IChjb250ZXh0KSB7XHJcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDFcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yXHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKVxyXG4gICAgY29udGV4dC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpXHJcblxyXG4gICAgdGhpcy5zdGVwKClcclxuXHJcbiAgICBjb250ZXh0LmxpbmVUbyh0aGlzLngsIHRoaXMueSlcclxuICAgIGNvbnRleHQuc3Ryb2tlKClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcmFuZG9tSW50IH0gZnJvbSAnLi4vLi4vbGliL3JhbmRvbSdcclxuXHJcbmltcG9ydCBFeHBlcmltZW50cyBmcm9tICcuLi8uLi9jbGFzc2VzL0V4cGVyaW1lbnRzJ1xyXG5pbXBvcnQgV2Fsa2VyIGZyb20gJy4vV2Fsa2VyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vdCBleHRlbmRzIEV4cGVyaW1lbnRzIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcblxyXG4gICAgdGhpcy53YWxrZXJzID0gbnVsbFxyXG4gICAgdGhpcy53YWxrZXJzTGVuZ3RoID0gbnVsbFxyXG4gICAgdGhpcy53YWxrZXJzQ29sb3IgPSBudWxsXHJcblxyXG4gICAgdGhpcy5jcmVhdGVXYWxrZXJzKClcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVXYWxrZXIgKCkge1xyXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yc1t0aGlzLndhbGtlcnNDb2xvcl1bcmFuZG9tSW50KDAsIHRoaXMuY29sb3JzLmxlbmd0aCAtIDEpXVxyXG4gICAgY29uc3QgeCA9IHJhbmRvbUludCgwLCB3aW5kb3cuaW5uZXJXaWR0aClcclxuICAgIGNvbnN0IHkgPSByYW5kb21JbnQoMCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG5cclxuICAgIGNvbnN0IHdhbGtlciA9IG5ldyBXYWxrZXIoY29sb3IsIHgsIHkpXHJcblxyXG4gICAgdGhpcy53YWxrZXJzLnB1c2god2Fsa2VyKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlV2Fsa2VycyAoKSB7XHJcbiAgICB0aGlzLndhbGtlcnMgPSBbXVxyXG4gICAgdGhpcy53YWxrZXJzTGVuZ3RoID0gMjUwMFxyXG4gICAgdGhpcy53YWxrZXJzQ29sb3IgPSByYW5kb21JbnQoMCwgdGhpcy5jb2xvcnMubGVuZ3RoIC0gMSlcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLndhbGtlcnNMZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLmNyZWF0ZVdhbGtlcigpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKCkge1xyXG4gICAgc3VwZXIudXBkYXRlKClcclxuXHJcbiAgICB0aGlzLnN0YXRzLmJlZ2luKClcclxuXHJcbiAgICB0aGlzLndhbGtlcnMuZm9yRWFjaCh3YWxrZXIgPT4gd2Fsa2VyLmRyYXcodGhpcy5jb250ZXh0KSlcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjFcclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbGlnaHRlcidcclxuXHJcbiAgICB0aGlzLnN0YXRzLmVuZCgpXHJcbiAgfVxyXG5cclxuICBkYmxjbGljayAoKSB7XHJcbiAgICBzdXBlci5kYmxjbGljaygpXHJcblxyXG4gICAgdGhpcy5jcmVhdGVXYWxrZXJzKClcclxuICB9XHJcblxyXG4gIHJlc2l6ZSAoKSB7XHJcbiAgICBzdXBlci5yZXNpemUoKVxyXG5cclxuICAgIHRoaXMuY3JlYXRlV2Fsa2VycygpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGNvbnN0cmFpbiwgbGVycCB9IGZyb20gJy4uLy4uL2xpYi9tYXRoJ1xyXG5pbXBvcnQgeyByYW5kb21BcmJpdHJhcnkgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlIHtcclxuICBjb25zdHJ1Y3RvciAoeCwgeSwgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXNcclxuXHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3JcclxuXHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcblxyXG4gICAgdGhpcy5vcGFjaXR5ID0gMFxyXG5cclxuICAgIHRoaXMubGVycCA9IHJhbmRvbUFyYml0cmFyeSgwLjA1LCAwLjEpXHJcbiAgfVxyXG5cclxuICBtb3ZlICh4LCB5KSB7XHJcbiAgICB0aGlzLm9wYWNpdHkgPSBjb25zdHJhaW4odGhpcy5vcGFjaXR5ICsgMC4xLCAwLCAxKVxyXG5cclxuICAgIHRoaXMucmFkaXVzID0gbGVycCh0aGlzLnJhZGl1cywgMCwgdGhpcy5sZXJwKVxyXG5cclxuICAgIHRoaXMueCA9IGxlcnAodGhpcy54LCB4LCB0aGlzLmxlcnApXHJcbiAgICB0aGlzLnkgPSBsZXJwKHRoaXMueSwgeSwgdGhpcy5sZXJwKVxyXG5cclxuICAgIHRoaXMuYWxpdmUgPSB0aGlzLnJhZGl1cyA+IDAuMDFcclxuICB9XHJcblxyXG4gIGRyYXcgKGNvbnRleHQpIHtcclxuICAgIGNvbnRleHQubGluZVdpZHRoID0gMlxyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLm9wYWNpdHlcclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZXInXHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKVxyXG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSlcclxuICAgIGNvbnRleHQuY2xvc2VQYXRoKClcclxuXHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvclxyXG4gICAgY29udGV4dC5zdHJva2UoKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByYW5kb21JbnQsIHJhbmRvbU5vcm1hbGl6ZWQgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuaW1wb3J0IEV4cGVyaW1lbnRzIGZyb20gJy4uLy4uL2NsYXNzZXMvRXhwZXJpbWVudHMnXHJcbmltcG9ydCBDaXJjbGUgZnJvbSAnLi9DaXJjbGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZW9uIGV4dGVuZHMgRXhwZXJpbWVudHMge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuXHJcbiAgICB0aGlzLmNpcmNsZXMgPSBudWxsXHJcbiAgICB0aGlzLmNpcmNsZXNMZW5ndGggPSBudWxsXHJcbiAgICB0aGlzLmNpcmNsZXNDb2xvciA9IG51bGxcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUNpcmNsZXMoKVxyXG5cclxuICAgIHRoaXMudXBkYXRlKClcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNpcmNsZSAoKSB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy5tb3VzZS54ICsgKHJhbmRvbU5vcm1hbGl6ZWQoKSAqIDIwMClcclxuICAgIGNvbnN0IHkgPSB0aGlzLm1vdXNlLnkgKyAocmFuZG9tTm9ybWFsaXplZCgpICogMjAwKVxyXG4gICAgY29uc3QgcmFkaXVzID0gMTAgKyBNYXRoLmFicyhyYW5kb21Ob3JtYWxpemVkKCkgKiAxMClcclxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnNbdGhpcy5jaXJjbGVzQ29sb3JdW3JhbmRvbUludCgwLCB0aGlzLmNvbG9ycy5sZW5ndGggLSAxKV1cclxuXHJcbiAgICBjb25zdCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHgsIHksIHJhZGl1cywgY29sb3IpXHJcblxyXG4gICAgdGhpcy5jaXJjbGVzLnB1c2goY2lyY2xlKVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveUNpcmNsZSAoaW5kZXgpIHtcclxuICAgIHRoaXMuY2lyY2xlcy5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaXJjbGVzICgpIHtcclxuICAgIHRoaXMuY2lyY2xlcyA9IFtdXHJcbiAgICB0aGlzLmNpcmNsZXNMZW5ndGggPSA1MDBcclxuICAgIHRoaXMuY2lyY2xlc0NvbG9yID0gcmFuZG9tSW50KDAsIHRoaXMuY29sb3JzLmxlbmd0aCAtIDEpXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5jaXJjbGVzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5jcmVhdGVDaXJjbGUoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlICgpIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5iZWdpbigpXHJcblxyXG4gICAgdGhpcy5jaXJjbGVzLmZvckVhY2goKGNpcmNsZSwgaW5kZXgpID0+IHtcclxuICAgICAgY2lyY2xlLm1vdmUodGhpcy5tb3VzZS54LCB0aGlzLm1vdXNlLnkpXHJcbiAgICAgIGNpcmNsZS5kcmF3KHRoaXMuY29udGV4dClcclxuXHJcbiAgICAgIGlmICghY2lyY2xlLmFsaXZlKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95Q2lyY2xlKGluZGV4KVxyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2lyY2xlKClcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJ1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwLjEpJ1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5lbmQoKVxyXG4gIH1cclxuXHJcbiAgZGJsY2xpY2sgKCkge1xyXG4gICAgc3VwZXIuZGJsY2xpY2soKVxyXG5cclxuICAgIHRoaXMuY3JlYXRlQ2lyY2xlcygpXHJcbiAgfVxyXG5cclxuICByZXNpemUgKCkge1xyXG4gICAgc3VwZXIucmVzaXplKClcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUNpcmNsZXMoKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByYW5kb21BcmJpdHJhcnkgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9jbGFzc2VzL1ZlY3RvcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmVyIHtcclxuICBjb25zdHJ1Y3RvciAoeCwgeSwgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXNcclxuXHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3JcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3Rvcih4LCB5KVxyXG4gICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMClcclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gbmV3IFZlY3RvcigwLCAwKVxyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBuZXcgVmVjdG9yKDAsIDApXHJcblxyXG4gICAgdGhpcy5tdWx0aXBsaWVyID0gcmFuZG9tQXJiaXRyYXJ5KDAuNSwgMSlcclxuICB9XHJcblxyXG4gIGNoZWNrICgpIHtcclxuICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnggPSAwXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueCA8IDApIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi54ID0gd2luZG93LmlubmVyV2lkdGhcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbi55ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24ueSA9IDBcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbi55IDwgMCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSAobW91c2UsIG11bHRpcGxpZXIpIHtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gVmVjdG9yLnN1Yihtb3VzZSwgdGhpcy5wb3NpdGlvbilcclxuICAgIHRoaXMuZGlyZWN0aW9uLm5vcm1hbGl6ZSgpXHJcbiAgICB0aGlzLmRpcmVjdGlvbi5tdWx0KHRoaXMubXVsdGlwbGllcilcclxuICAgIHRoaXMuZGlyZWN0aW9uLm11bHQobXVsdGlwbGllcilcclxuXHJcbiAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMuZGlyZWN0aW9uXHJcblxyXG4gICAgdGhpcy52ZWxvY2l0eS5hZGQodGhpcy5hY2NlbGVyYXRpb24pXHJcbiAgICB0aGlzLnZlbG9jaXR5LmxpbWl0KDE1KVxyXG5cclxuICAgIHRoaXMucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpXHJcbiAgfVxyXG5cclxuICBkcmF3IChjb250ZXh0KSB7XHJcbiAgICB0aGlzLmNoZWNrKClcclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdsaWdodGVyJ1xyXG5cclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKClcclxuICAgIGNvbnRleHQuYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpXHJcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yXHJcbiAgICBjb250ZXh0LmZpbGwoKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByYW5kb21JbnQgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuaW1wb3J0IEV4cGVyaW1lbnRzIGZyb20gJy4uLy4uL2NsYXNzZXMvRXhwZXJpbWVudHMnXHJcbmltcG9ydCBNb3ZlciBmcm9tICcuL01vdmVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXRvbSBleHRlbmRzIEV4cGVyaW1lbnRzIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcblxyXG4gICAgdGhpcy5tb3ZlcnMgPSBudWxsXHJcbiAgICB0aGlzLm1vdmVyc0xlbmd0aCA9IG51bGxcclxuICAgIHRoaXMubW92ZXJzQ29sb3IgPSBudWxsXHJcbiAgICB0aGlzLm1vdmVyc011bHRpcGx5ID0gbnVsbFxyXG5cclxuICAgIHRoaXMuY3JlYXRlTW92ZXJzKClcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVNb3ZlciAoKSB7XHJcbiAgICBjb25zdCB4ID0gcmFuZG9tSW50KDAsIHdpbmRvdy5pbm5lcldpZHRoKVxyXG4gICAgY29uc3QgeSA9IHJhbmRvbUludCgwLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcbiAgICBjb25zdCByYWRpdXMgPSByYW5kb21JbnQoMSwgNSlcclxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnNbdGhpcy5tb3ZlcnNDb2xvcl1bcmFuZG9tSW50KDAsIHRoaXMuY29sb3JzLmxlbmd0aCAtIDEpXVxyXG5cclxuICAgIGNvbnN0IG1vdmVyID0gbmV3IE1vdmVyKHgsIHksIHJhZGl1cywgY29sb3IpXHJcblxyXG4gICAgdGhpcy5tb3ZlcnMucHVzaChtb3ZlcilcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1vdmVycyAoKSB7XHJcbiAgICB0aGlzLm1vdmVycyA9IFtdXHJcbiAgICB0aGlzLm1vdmVyc0xlbmd0aCA9IDI1MFxyXG4gICAgdGhpcy5tb3ZlcnNDb2xvciA9IHJhbmRvbUludCgwLCB0aGlzLmNvbG9ycy5sZW5ndGggLSAxKVxyXG4gICAgdGhpcy5tb3ZlcnNNdWx0aXBseSA9IDFcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLm1vdmVyc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlTW92ZXIoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlICgpIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5iZWdpbigpXHJcblxyXG4gICAgdGhpcy5tb3ZlcnMuZm9yRWFjaCgobW92ZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgIG1vdmVyLnVwZGF0ZSh0aGlzLm1vdXNlLCB0aGlzLm1vdmVyc011bHRpcGx5KVxyXG4gICAgICBtb3Zlci5kcmF3KHRoaXMuY29udGV4dClcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMVxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3ZlcidcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMC4xKSdcclxuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG5cclxuICAgIHRoaXMuc3RhdHMuZW5kKClcclxuICB9XHJcblxyXG4gIGRibGNsaWNrICgpIHtcclxuICAgIHN1cGVyLmRibGNsaWNrKClcclxuXHJcbiAgICB0aGlzLmNyZWF0ZU1vdmVycygpXHJcbiAgfVxyXG5cclxuICBtb3VzZWRvd24gKCkge1xyXG4gICAgc3VwZXIubW91c2Vkb3duKClcclxuXHJcbiAgICB0aGlzLm1vdmVyc011bHRpcGx5ICo9IC0xXHJcbiAgfVxyXG5cclxuICBtb3VzZXVwICgpIHtcclxuICAgIHN1cGVyLm1vdXNldXAoKVxyXG5cclxuICAgIHRoaXMubW92ZXJzTXVsdGlwbHkgKj0gLTFcclxuICB9XHJcblxyXG4gIHJlc2l6ZSAoKSB7XHJcbiAgICBzdXBlci5yZXNpemUoKVxyXG5cclxuICAgIHRoaXMuY3JlYXRlTW92ZXJzKClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgY29uc3RyYWluLCBtYXAgfSBmcm9tICcuLi8uLi9saWIvbWF0aCdcclxuaW1wb3J0IHsgbm9pc2UsIG5vaXNlU2VlZCB9IGZyb20gJy4uLy4uL2xpYi9wZXJsaW4nXHJcblxyXG4vLyBpbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vY2xhc3Nlcy9WZWN0b3InXHJcblxyXG5ub2lzZVNlZWQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpZWxkIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxMFxyXG5cclxuICAgIHRoaXMuY29sdW1ucyA9IE1hdGguY2VpbCh3aW5kb3cuaW5uZXJXaWR0aCAvIHRoaXMucmVzb2x1dGlvbilcclxuICAgIHRoaXMucm93cyA9IE1hdGguY2VpbCh3aW5kb3cuaW5uZXJIZWlnaHQgLyB0aGlzLnJlc29sdXRpb24pXHJcblxyXG4gICAgLy8gdGhpcy5jZWxsID0gQXJyYXkodGhpcy5jb2x1bW5zKS5maWxsKCkubWFwKCgpID0+IFtdKVxyXG5cclxuICAgIHRoaXMuZmllbGQgPSBBcnJheSh0aGlzLmNvbHVtbnMpLmZpbGwoKS5tYXAoKCkgPT4gW10pXHJcblxyXG4gICAgdGhpcy5ub2lzZSA9IDBcclxuXHJcbiAgICB0aGlzLmNyZWF0ZSgpXHJcbiAgfVxyXG5cclxuICBjcmVhdGUgKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIHggPSAwOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDAsIHkgPSAwOyBqIDwgdGhpcy5yb3dzOyBqKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9IG1hcChub2lzZSh4LCB5LCB0aGlzLm5vaXNlKSwgMCwgMSwgMCwgTWF0aC5QSSAqIDIpXHJcblxyXG4gICAgICAgIC8vIHRoaXMuY2VsbFtpXVtqXSA9IG5ldyBDZWxsKGksIGosIGFuZ2xlKVxyXG4gICAgICAgIHRoaXMuZmllbGRbaV1bal0gPSBuZXcgVmVjdG9yKE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpKVxyXG5cclxuICAgICAgICB5ICs9IDAuMVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4ICs9IDAuMVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlICgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwLCB4ID0gMDsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwLCB5ID0gMDsgaiA8IHRoaXMucm93czsgaisrKSB7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSBtYXAobm9pc2UoeCwgeSwgdGhpcy5ub2lzZSksIDAsIDEsIDAsIE1hdGguUEkgKiAyKVxyXG5cclxuICAgICAgICAvLyB0aGlzLmNlbGxbaV1bal0udXBkYXRlKGFuZ2xlKVxyXG4gICAgICAgIHRoaXMuZmllbGRbaV1bal0uc2V0KE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpKVxyXG5cclxuICAgICAgICB5ICs9IDAuMVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4ICs9IDAuMVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubm9pc2UgKz0gMC4wMVxyXG4gIH1cclxuXHJcbiAgZHJhdyAoY29udGV4dCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucm93czsgaisrKSB7XHJcbiAgICAgICAgLy8gdGhpcy5jZWxsW2ldW2pdLmRyYXcoY29udGV4dClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9va3VwIChwb3NpdGlvbikge1xyXG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihjb25zdHJhaW4ocG9zaXRpb24ueCAvIHRoaXMucmVzb2x1dGlvbiwgMCwgdGhpcy5jb2x1bW5zIC0gMSkpXHJcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKGNvbnN0cmFpbihwb3NpdGlvbi55IC8gdGhpcy5yZXNvbHV0aW9uLCAwLCB0aGlzLnJvd3MgLSAxKSlcclxuXHJcbiAgICByZXR1cm4gdGhpcy5maWVsZFtjb2x1bW5dW3Jvd10uY29weSgpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vY2xhc3Nlcy9WZWN0b3InXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XHJcbiAgY29uc3RydWN0b3IgKHgsIHksIGNvbG9yLCByYWRpdXMsIHNwZWVkLCBmb3JjZSkge1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yXHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoeCwgeSlcclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gbmV3IFZlY3RvcigwLCAwKVxyXG4gICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMClcclxuXHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1c1xyXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkXHJcbiAgICB0aGlzLmZvcmNlID0gZm9yY2VcclxuICB9XHJcblxyXG4gIGZvbGxvdyAoZmxvdykge1xyXG4gICAgY29uc3QgZGVzaXJlZCA9IGZsb3cubG9va3VwKHRoaXMucG9zaXRpb24pXHJcblxuICAgIGRlc2lyZWQubXVsdCh0aGlzLnNwZWVkKVxyXG5cclxuICAgIGNvbnN0IHN0ZWVyID0gVmVjdG9yLnN1YihkZXNpcmVkLCB0aGlzLnZlbG9jaXR5KVxyXG5cbiAgICBzdGVlci5saW1pdCh0aGlzLmZvcmNlKVxyXG5cclxuICAgIHRoaXMuYXBwbHkoc3RlZXIpXHJcbiAgfVxyXG5cclxuICBhcHBseSAoZm9yY2UpIHtcclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uLmFkZChmb3JjZSlcclxuICB9XHJcblxyXG4gIHVwZGF0ZSAoKSB7XHJcbiAgICB0aGlzLnZlbG9jaXR5LmFkZCh0aGlzLmFjY2VsZXJhdGlvbilcclxuICAgIHRoaXMudmVsb2NpdHkubGltaXQodGhpcy5zcGVlZClcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnZlbG9jaXR5KVxyXG5cclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uLm11bHQoMClcclxuICB9XHJcblxyXG4gIGNoZWNrICgpIHtcclxuICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnggPSAwXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueCA8IDApIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi54ID0gd2luZG93LmlubmVyV2lkdGhcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbi55ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24ueSA9IDBcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbi55IDwgMCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRyYXcgKGNvbnRleHQpIHtcclxuICAgIGNvbnRleHQubGluZVdpZHRoID0gMlxyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZXInXHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKVxyXG4gICAgY29udGV4dC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIDEsIDAsIDIgKiBNYXRoLlBJKVxyXG4gICAgY29udGV4dC5jbG9zZVBhdGgoKVxyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvclxyXG4gICAgY29udGV4dC5maWxsKClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcmFuZG9tQXJiaXRyYXJ5LCByYW5kb21JbnQgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuaW1wb3J0IEV4cGVyaW1lbnRzIGZyb20gJy4uLy4uL2NsYXNzZXMvRXhwZXJpbWVudHMnXHJcbmltcG9ydCBGaWVsZCBmcm9tICcuL0ZpZWxkJ1xyXG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi9QYXJ0aWNsZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb3cgZXh0ZW5kcyBFeHBlcmltZW50cyB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG5cclxuICAgIHRoaXMuZmllbGQgPSBudWxsXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBudWxsXHJcbiAgICB0aGlzLnBhcnRpY2xlc0xlbmd0aCA9IG51bGxcclxuICAgIHRoaXMucGFydGljbGVzQ29sb3IgPSBudWxsXHJcblxyXG4gICAgdGhpcy5jcmVhdGVGaWVsZCgpXHJcbiAgICB0aGlzLmNyZWF0ZVBhcnRpY2xlcygpXHJcblxyXG4gICAgdGhpcy51cGRhdGUoKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlRmllbGQgKCkge1xyXG4gICAgdGhpcy5maWVsZCA9IG5ldyBGaWVsZCgpXHJcbiAgICB0aGlzLmZpZWxkLmRyYXcodGhpcy5jb250ZXh0KVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlUGFydGljbGUgKCkge1xyXG4gICAgY29uc3QgeCA9IHJhbmRvbUludCgwLCB3aW5kb3cuaW5uZXJXaWR0aClcclxuICAgIGNvbnN0IHkgPSByYW5kb21JbnQoMCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yc1t0aGlzLnBhcnRpY2xlc0NvbG9yXVtyYW5kb21JbnQoMCwgdGhpcy5jb2xvcnMubGVuZ3RoIC0gMSldXHJcbiAgICBjb25zdCByYWRpdXMgPSByYW5kb21BcmJpdHJhcnkoMSwgNilcclxuICAgIGNvbnN0IHNwZWVkID0gcmFuZG9tSW50KDQsIDEyKVxyXG4gICAgY29uc3QgZm9yY2UgPSByYW5kb21BcmJpdHJhcnkoMC40LCAxKVxyXG5cclxuICAgIGNvbnN0IHBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKHgsIHksIGNvbG9yLCByYWRpdXMsIHNwZWVkLCBmb3JjZSlcclxuXHJcbiAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlUGFydGljbGVzICgpIHtcclxuICAgIHRoaXMucGFydGljbGVzID0gW11cclxuICAgIHRoaXMucGFydGljbGVzTGVuZ3RoID0gMTAwMFxyXG4gICAgdGhpcy5wYXJ0aWNsZXNDb2xvciA9IHJhbmRvbUludCgwLCB0aGlzLmNvbG9ycy5sZW5ndGggLSAxKVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMucGFydGljbGVzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKCkge1xyXG4gICAgc3VwZXIudXBkYXRlKClcclxuXHJcbiAgICB0aGlzLnN0YXRzLmJlZ2luKClcclxuXHJcbiAgICB0aGlzLmZpZWxkLnVwZGF0ZSgpXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZXMuZm9yRWFjaCgocGFydGljbGUsIGluZGV4KSA9PiB7XHJcbiAgICAgIHBhcnRpY2xlLmZvbGxvdyh0aGlzLmZpZWxkKVxyXG4gICAgICBwYXJ0aWNsZS51cGRhdGUoKVxyXG4gICAgICBwYXJ0aWNsZS5jaGVjaygpXHJcbiAgICAgIHBhcnRpY2xlLmRyYXcodGhpcy5jb250ZXh0KVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJ1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwLjEpJ1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5lbmQoKVxyXG4gIH1cclxuXHJcbiAgZGJsY2xpY2sgKCkge1xyXG4gICAgc3VwZXIuZGJsY2xpY2soKVxyXG5cclxuICAgIHRoaXMuY3JlYXRlRmllbGQoKVxyXG4gICAgdGhpcy5jcmVhdGVQYXJ0aWNsZXMoKVxyXG4gIH1cclxuXHJcbiAgcmVzaXplICgpIHtcclxuICAgIHN1cGVyLnJlc2l6ZSgpXHJcblxyXG4gICAgdGhpcy5jcmVhdGVGaWVsZCgpXHJcbiAgICB0aGlzLmNyZWF0ZVBhcnRpY2xlcygpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vY2xhc3Nlcy9WZWN0b3InXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGUge1xyXG4gIGNvbnN0cnVjdG9yICh4LCB5LCByYWRpdXMsIGNvbG9yKSB7XHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1c1xyXG5cclxuICAgIHRoaXMuY29sb3IgPSBjb2xvclxyXG5cclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yKHgsIHkpXHJcbiAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IG5ldyBWZWN0b3IoMCwgMClcclxuICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yKDAsIDApXHJcbiAgfVxyXG5cclxuICBjaGVjayAoKSB7XHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbi54ID4gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMFxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uLnggPCAwKSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24ueCA9IHdpbmRvdy5pbm5lcldpZHRoXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24ueSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkgPSAwXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueSA8IDApIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi55ID0gd2luZG93LmlubmVySGVpZ2h0XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXBhcmF0ZSAoY2lyY2xlcykge1xyXG4gICAgY29uc3Qgc3VtID0gbmV3IFZlY3RvcigpXHJcblxyXG4gICAgbGV0IGNvdW50ZXIgPSAwXHJcblxyXG4gICAgY2lyY2xlcy5mb3JFYWNoKChjaXJjbGUsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gVmVjdG9yLmRpc3QodGhpcy5wb3NpdGlvbiwgY2lyY2xlLnBvc2l0aW9uKVxyXG5cclxuICAgICAgaWYgKGRpc3RhbmNlIDwgNTApIHtcclxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gVmVjdG9yLnN1Yih0aGlzLnBvc2l0aW9uLCBjaXJjbGUucG9zaXRpb24pXHJcblxyXG4gICAgICAgIGRpZmZlcmVuY2Uubm9ybWFsaXplKClcclxuICAgICAgICBkaWZmZXJlbmNlLmRpdihkaXN0YW5jZSlcclxuXHJcbiAgICAgICAgc3VtLmFkZChkaWZmZXJlbmNlKVxyXG5cclxuICAgICAgICBjb3VudGVyKytcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAoY291bnRlciA+IDApIHtcclxuICAgICAgc3VtLmRpdihjb3VudGVyKVxyXG4gICAgICBzdW0ubm9ybWFsaXplKClcclxuXHJcbiAgICAgIGNvbnN0IHN0ZWVyID0gVmVjdG9yLnN1YihzdW0sIHRoaXMudmVsb2NpdHkpXHJcblxyXG4gICAgICBzdGVlci5saW1pdCgpXHJcblxyXG4gICAgICB0aGlzLmFwcGx5KHN0ZWVyKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXBwbHkgKGZvcmNlKSB7XHJcbiAgICB0aGlzLmFjY2VsZXJhdGlvbi5hZGQoZm9yY2UpXHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKCkge1xyXG4gICAgdGhpcy52ZWxvY2l0eS5hZGQodGhpcy5hY2NlbGVyYXRpb24pXHJcbiAgICB0aGlzLnZlbG9jaXR5LmxpbWl0KDEwKVxyXG5cclxuICAgIHRoaXMucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpXHJcblxyXG4gICAgdGhpcy5hY2NlbGVyYXRpb24ubXVsdCgwKVxyXG4gIH1cclxuXHJcbiAgZHJhdyAoY29udGV4dCkge1xyXG4gICAgdGhpcy5jaGVjaygpXHJcblxyXG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbGlnaHRlcidcclxuXHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpXHJcbiAgICBjb250ZXh0LmFyYyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKVxyXG4gICAgY29udGV4dC5jbG9zZVBhdGgoKVxyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvclxyXG4gICAgY29udGV4dC5maWxsKClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcmFuZG9tSW50IH0gZnJvbSAnLi4vLi4vbGliL3JhbmRvbSdcclxuXHJcbmltcG9ydCBFeHBlcmltZW50cyBmcm9tICcuLi8uLi9jbGFzc2VzL0V4cGVyaW1lbnRzJ1xyXG5pbXBvcnQgQ2lyY2xlIGZyb20gJy4vQ2lyY2xlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxvdyBleHRlbmRzIEV4cGVyaW1lbnRzIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcblxyXG4gICAgdGhpcy5jaXJjbGVzID0gbnVsbFxyXG4gICAgdGhpcy5jaXJjbGVzTGVuZ3RoID0gbnVsbFxyXG4gICAgdGhpcy5jaXJjbGVzQ29sb3IgPSBudWxsXHJcblxyXG4gICAgdGhpcy5jcmVhdGVDaXJjbGVzKClcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaXJjbGUgKCkge1xyXG4gICAgY29uc3QgeCA9IHJhbmRvbUludCgwLCB3aW5kb3cuaW5uZXJXaWR0aClcclxuICAgIGNvbnN0IHkgPSByYW5kb21JbnQoMCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yc1t0aGlzLmNpcmNsZXNDb2xvcl1bcmFuZG9tSW50KDAsIHRoaXMuY29sb3JzLmxlbmd0aCAtIDEpXVxyXG5cclxuICAgIGNvbnN0IGNpcmNsZSA9IG5ldyBDaXJjbGUoeCwgeSwgMSwgY29sb3IpXHJcblxyXG4gICAgdGhpcy5jaXJjbGVzLnB1c2goY2lyY2xlKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ2lyY2xlcyAoKSB7XHJcbiAgICB0aGlzLmNpcmNsZXMgPSBbXVxyXG4gICAgdGhpcy5jaXJjbGVzTGVuZ3RoID0gNTAwXHJcbiAgICB0aGlzLmNpcmNsZXNDb2xvciA9IHJhbmRvbUludCgwLCB0aGlzLmNvbG9ycy5sZW5ndGggLSAxKVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuY2lyY2xlc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlQ2lyY2xlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSAoKSB7XHJcbiAgICBzdXBlci51cGRhdGUoKVxyXG5cclxuICAgIHRoaXMuc3RhdHMuYmVnaW4oKVxyXG5cclxuICAgIHRoaXMuY2lyY2xlcy5mb3JFYWNoKChjaXJjbGUsIGluZGV4KSA9PiB7XG4gICAgICBjaXJjbGUuc2VwYXJhdGUodGhpcy5jaXJjbGVzKVxyXG4gICAgICBjaXJjbGUudXBkYXRlKClcclxuICAgICAgY2lyY2xlLmRyYXcodGhpcy5jb250ZXh0KVxyXG4gICAgfSlcblxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDFcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJ1xuXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDAuMSknXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG5cclxuICAgIHRoaXMuc3RhdHMuZW5kKClcclxuICB9XHJcblxyXG4gIGRibGNsaWNrICgpIHtcclxuICAgIHN1cGVyLmRibGNsaWNrKClcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUNpcmNsZXMoKVxyXG4gIH1cclxuXHJcbiAgcmVzaXplICgpIHtcclxuICAgIHN1cGVyLnJlc2l6ZSgpXHJcblxyXG4gICAgdGhpcy5jcmVhdGVDaXJjbGVzKClcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvbnN0cmFpbnMgYSB2YWx1ZSBiZXR3ZWVuIGEgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJhaW4gKG4sIGxvdywgaGlnaCkge1xyXG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihuLCBoaWdoKSwgbG93KVxyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3QgKHgxLCB5MSwgejEsIHgyLCB5MiwgejIpIHtcclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCgoejEgLSB4MSkgKiAoejEgLSB4MSkgKyAoeDIgLSB5MSkgKiAoeDIgLSB5MSkpXHJcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA2KSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4MiAtIHgxKSAqICh4MiAtIHgxKSArICh5MiAtIHkxKSAqICh5MiAtIHkxKSArICh6MiAtIHoxKSAqICh6MiAtIHoxKSlcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGEgbnVtYmVyIGJldHdlZW4gdHdvIG51bWJlcnMgYXQgYSBzcGVjaWZpYyBpbmNyZW1lbnQuIFRoZSBhbXRcclxuICogcGFyYW1ldGVyIGlzIHRoZSBhbW91bnQgdG8gaW50ZXJwb2xhdGUgYmV0d2VlbiB0aGUgdHdvIHZhbHVlcyB3aGVyZSAwLjBcclxuICogZXF1YWwgdG8gdGhlIGZpcnN0IHBvaW50LCAwLjEgaXMgdmVyeSBuZWFyIHRoZSBmaXJzdCBwb2ludCwgMC41IGlzXHJcbiAqIGhhbGYtd2F5IGluIGJldHdlZW4sIGV0Yy4gVGhlIGxlcnAgZnVuY3Rpb24gaXMgY29udmVuaWVudCBmb3IgY3JlYXRpbmdcclxuICogbW90aW9uIGFsb25nIGEgc3RyYWlnaHQgcGF0aCBhbmQgZm9yIGRyYXdpbmcgZG90dGVkIGxpbmVzLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAgKHN0YXJ0LCBzdG9wLCBhbXQpIHtcclxuICByZXR1cm4gYW10ICogKHN0b3AgLSBzdGFydCkgKyBzdGFydFxyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgbWFnbml0dWRlIChvciBsZW5ndGgpIG9mIGEgdmVjdG9yLiBBIHZlY3RvciBpcyBhIGRpcmVjdGlvblxyXG4gKiBpbiBzcGFjZSBjb21tb25seSB1c2VkIGluIGNvbXB1dGVyIGdyYXBoaWNzIGFuZCBsaW5lYXIgYWxnZWJyYS4gQmVjYXVzZSBpdFxyXG4gKiBoYXMgbm8gXCJzdGFydFwiIHBvc2l0aW9uLCB0aGUgbWFnbml0dWRlIG9mIGEgdmVjdG9yIGNhbiBiZSB0aG91Z2h0IG9mIGFzXHJcbiAqIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBjb29yZGluYXRlIDAsMCB0byBpdHMgeCx5IHZhbHVlLiBUaGVyZWZvcmUsIG1hZygpIGlzXHJcbiAqIGEgc2hvcnRjdXQgZm9yIHdyaXRpbmcgZGlzdCgwLCAwLCB4LCB5KS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWcgKHgsIHkpIHtcclxuICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZS1tYXBzIGEgbnVtYmVyIGZyb20gb25lIHJhbmdlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIEluIHRoZSBmaXJzdCBleGFtcGxlIGFib3ZlLCB0aGUgbnVtYmVyIDI1IGlzIGNvbnZlcnRlZCBmcm9tIGEgdmFsdWUgaW4gdGhlXHJcbiAqIHJhbmdlIG9mIDAgdG8gMTAwIGludG8gYSB2YWx1ZSB0aGF0IHJhbmdlcyBmcm9tIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlXHJcbiAqIHdpbmRvdyAoMCkgdG8gdGhlIHJpZ2h0IGVkZ2UgKHdpZHRoKS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXAgKG4sIHN0YXJ0MSwgc3RvcDEsIHN0YXJ0Miwgc3RvcDIpIHtcclxuICByZXR1cm4gKChuIC0gc3RhcnQxKSAvIChzdG9wMSAtIHN0YXJ0MSkpICogKHN0b3AyIC0gc3RhcnQyKSArIHN0YXJ0MlxyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lcyB0aGUgbGFyZ2VzdCB2YWx1ZSBpbiBhIHNlcXVlbmNlIG9mIG51bWJlcnMsIGFuZCB0aGVuIHJldHVybnNcclxuICogdGhhdCB2YWx1ZS4gbWF4KCkgYWNjZXB0cyBhbnkgbnVtYmVyIG9mIE51bWJlciBwYXJhbWV0ZXJzLCBvciBhbiBBcnJheVxyXG4gKiBvZiBhbnkgbGVuZ3RoLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1heCAoKSB7XHJcbiAgaWYgKGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgYXJndW1lbnRzWzBdKVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZXMgdGhlIHNtYWxsZXN0IHZhbHVlIGluIGEgc2VxdWVuY2Ugb2YgbnVtYmVycywgYW5kIHRoZW4gcmV0dXJuc1xyXG4gKiB0aGF0IHZhbHVlLiBtaW4oKSBhY2NlcHRzIGFueSBudW1iZXIgb2YgTnVtYmVyIHBhcmFtZXRlcnMsIG9yIGFuIEFycmF5XHJcbiAqIG9mIGFueSBsZW5ndGguXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWluICgpIHtcclxuICBpZiAoYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgIHJldHVybiBNYXRoLm1pbi5hcHBseShudWxsLCBhcmd1bWVudHNbMF0pXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBNYXRoLm1pbi5hcHBseShudWxsLCBhcmd1bWVudHMpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplcyBhIG51bWJlciBmcm9tIGFub3RoZXIgcmFuZ2UgaW50byBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMS5cclxuICogSWRlbnRpY2FsIHRvIG1hcCh2YWx1ZSwgbG93LCBoaWdoLCAwLCAxKS5cclxuICpcclxuICogTnVtYmVycyBvdXRzaWRlIG9mIHRoZSByYW5nZSBhcmUgbm90IGNsYW1wZWQgdG8gMCBhbmQgMSwgYmVjYXVzZVxyXG4gKiBvdXQtb2YtcmFuZ2UgdmFsdWVzIGFyZSBvZnRlbiBpbnRlbnRpb25hbCBhbmQgdXNlZnVsLiAoU2VlIHRoZSBzZWNvbmRcclxuICogZXhhbXBsZSBhYm92ZS4pXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbm9ybSAobiwgc3RhcnQsIHN0b3ApIHtcclxuICByZXR1cm4gdGhpcy5tYXAobiwgc3RhcnQsIHN0b3AsIDAsIDEpXHJcbn1cclxuIiwidmFyIFBFUkxJTl9ZV1JBUEIgPSA0O1xyXG52YXIgUEVSTElOX1lXUkFQID0gMTw8UEVSTElOX1lXUkFQQjtcclxudmFyIFBFUkxJTl9aV1JBUEIgPSA4O1xyXG52YXIgUEVSTElOX1pXUkFQID0gMTw8UEVSTElOX1pXUkFQQjtcclxudmFyIFBFUkxJTl9TSVpFID0gNDA5NTtcclxuXHJcbnZhciBwZXJsaW5fb2N0YXZlcyA9IDQ7IC8vIGRlZmF1bHQgdG8gbWVkaXVtIHNtb290aFxyXG52YXIgcGVybGluX2FtcF9mYWxsb2ZmID0gMC41OyAvLyA1MCUgcmVkdWN0aW9uL29jdGF2ZVxyXG5cclxudmFyIHNjYWxlZF9jb3NpbmUgPSBmdW5jdGlvbihpKSB7XHJcbiAgcmV0dXJuIDAuNSooMS4wLU1hdGguY29zKGkqTWF0aC5QSSkpO1xyXG59O1xyXG5cclxudmFyIHBlcmxpbjsgLy8gd2lsbCBiZSBpbml0aWFsaXplZCBsYXppbHkgYnkgbm9pc2UoKSBvciBub2lzZVNlZWQoKVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5vaXNlKHgseSx6KSB7XHJcbiAgeSA9IHkgfHwgMDtcclxuICB6ID0geiB8fCAwO1xyXG5cclxuICBpZiAocGVybGluID09IG51bGwpIHtcclxuICAgIHBlcmxpbiA9IG5ldyBBcnJheShQRVJMSU5fU0laRSArIDEpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBQRVJMSU5fU0laRSArIDE7IGkrKykge1xyXG4gICAgICBwZXJsaW5baV0gPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHg8MCkgeyB4PS14OyB9XHJcbiAgaWYgKHk8MCkgeyB5PS15OyB9XHJcbiAgaWYgKHo8MCkgeyB6PS16OyB9XHJcblxyXG4gIHZhciB4aT1NYXRoLmZsb29yKHgpLCB5aT1NYXRoLmZsb29yKHkpLCB6aT1NYXRoLmZsb29yKHopO1xyXG4gIHZhciB4ZiA9IHggLSB4aTtcclxuICB2YXIgeWYgPSB5IC0geWk7XHJcbiAgdmFyIHpmID0geiAtIHppO1xyXG4gIHZhciByeGYsIHJ5ZjtcclxuXHJcbiAgdmFyIHI9MDtcclxuICB2YXIgYW1wbD0wLjU7XHJcblxyXG4gIHZhciBuMSxuMixuMztcclxuXHJcbiAgZm9yICh2YXIgbz0wOyBvPHBlcmxpbl9vY3RhdmVzOyBvKyspIHtcclxuICAgIHZhciBvZj14aSsoeWk8PFBFUkxJTl9ZV1JBUEIpKyh6aTw8UEVSTElOX1pXUkFQQik7XHJcblxyXG4gICAgcnhmID0gc2NhbGVkX2Nvc2luZSh4Zik7XHJcbiAgICByeWYgPSBzY2FsZWRfY29zaW5lKHlmKTtcclxuXHJcbiAgICBuMSAgPSBwZXJsaW5bb2YmUEVSTElOX1NJWkVdO1xyXG4gICAgbjEgKz0gcnhmKihwZXJsaW5bKG9mKzEpJlBFUkxJTl9TSVpFXS1uMSk7XHJcbiAgICBuMiAgPSBwZXJsaW5bKG9mK1BFUkxJTl9ZV1JBUCkmUEVSTElOX1NJWkVdO1xyXG4gICAgbjIgKz0gcnhmKihwZXJsaW5bKG9mK1BFUkxJTl9ZV1JBUCsxKSZQRVJMSU5fU0laRV0tbjIpO1xyXG4gICAgbjEgKz0gcnlmKihuMi1uMSk7XHJcblxyXG4gICAgb2YgKz0gUEVSTElOX1pXUkFQO1xyXG4gICAgbjIgID0gcGVybGluW29mJlBFUkxJTl9TSVpFXTtcclxuICAgIG4yICs9IHJ4ZioocGVybGluWyhvZisxKSZQRVJMSU5fU0laRV0tbjIpO1xyXG4gICAgbjMgID0gcGVybGluWyhvZitQRVJMSU5fWVdSQVApJlBFUkxJTl9TSVpFXTtcclxuICAgIG4zICs9IHJ4ZioocGVybGluWyhvZitQRVJMSU5fWVdSQVArMSkmUEVSTElOX1NJWkVdLW4zKTtcclxuICAgIG4yICs9IHJ5ZioobjMtbjIpO1xyXG5cclxuICAgIG4xICs9IHNjYWxlZF9jb3NpbmUoemYpKihuMi1uMSk7XHJcblxyXG4gICAgciArPSBuMSphbXBsO1xyXG4gICAgYW1wbCAqPSBwZXJsaW5fYW1wX2ZhbGxvZmY7XHJcbiAgICB4aTw8PTE7XHJcbiAgICB4Zio9MjtcclxuICAgIHlpPDw9MTtcclxuICAgIHlmKj0yO1xyXG4gICAgemk8PD0xO1xyXG4gICAgemYqPTI7XHJcblxyXG4gICAgaWYgKHhmPj0xLjApIHsgeGkrKzsgeGYtLTsgfVxyXG4gICAgaWYgKHlmPj0xLjApIHsgeWkrKzsgeWYtLTsgfVxyXG4gICAgaWYgKHpmPj0xLjApIHsgemkrKzsgemYtLTsgfVxyXG4gIH1cclxuICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBub2lzZURldGFpbChsb2QsIGZhbGxvZmYpIHtcclxuICAvLyBBZGp1c3RzIHRoZSBjaGFyYWN0ZXIgYW5kIGxldmVsIG9mIGRldGFpbCBwcm9kdWNlZCBieSB0aGUgUGVybGluIG5vaXNlXHJcbiAgLy8gQnkgZGVmYXVsdCwgbm9pc2UgaXMgY29tcHV0ZWQgb3ZlciA0IG9jdGF2ZXNcclxuICAvLyBodHRwczovL3A1anMub3JnL3JlZmVyZW5jZS8jL3A1L25vaXNlRGV0YWlsXHJcbiAgaWYgKGxvZD4wKSAgICAgeyBwZXJsaW5fb2N0YXZlcz1sb2Q7IH1cclxuICBpZiAoZmFsbG9mZj4wKSB7IHBlcmxpbl9hbXBfZmFsbG9mZj1mYWxsb2ZmOyB9XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm9pc2VTZWVkKHNlZWQpIHtcclxuICAvLyBMaW5lYXIgQ29uZ3J1ZW50aWFsIEdlbmVyYXRvclxyXG4gIC8vIFZhcmlhbnQgb2YgYSBMZWhtYW4gR2VuZXJhdG9yXHJcbiAgdmFyIGxjZyA9IChmdW5jdGlvbigpIHtcclxuICAgIC8vIFNldCB0byB2YWx1ZXMgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL051bWVyaWNhbF9SZWNpcGVzXHJcbiAgICAvLyBtIGlzIGJhc2ljYWxseSBjaG9zZW4gdG8gYmUgbGFyZ2UgKGFzIGl0IGlzIHRoZSBtYXggcGVyaW9kKVxyXG4gICAgLy8gYW5kIGZvciBpdHMgcmVsYXRpb25zaGlwcyB0byBhIGFuZCBjXHJcbiAgICB2YXIgbSA9IDQyOTQ5NjcyOTYsXHJcbiAgICAvLyBhIC0gMSBzaG91bGQgYmUgZGl2aXNpYmxlIGJ5IG0ncyBwcmltZSBmYWN0b3JzXHJcbiAgICBhID0gMTY2NDUyNSxcclxuICAgICAvLyBjIGFuZCBtIHNob3VsZCBiZSBjby1wcmltZVxyXG4gICAgYyA9IDEwMTM5MDQyMjMsXHJcbiAgICBzZWVkLCB6O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2V0U2VlZCA6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIC8vIHBpY2sgYSByYW5kb20gc2VlZCBpZiB2YWwgaXMgdW5kZWZpbmVkIG9yIG51bGxcclxuICAgICAgICAvLyB0aGUgPj4+IDAgY2FzdHMgdGhlIHNlZWQgdG8gYW4gdW5zaWduZWQgMzItYml0IGludGVnZXJcclxuICAgICAgICB6ID0gc2VlZCA9ICh2YWwgPT0gbnVsbCA/IE1hdGgucmFuZG9tKCkgKiBtIDogdmFsKSA+Pj4gMDtcclxuICAgICAgfSxcclxuICAgICAgZ2V0U2VlZCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBzZWVkO1xyXG4gICAgICB9LFxyXG4gICAgICByYW5kIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZGVmaW5lIHRoZSByZWN1cnJlbmNlIHJlbGF0aW9uc2hpcFxyXG4gICAgICAgIHogPSAoYSAqIHogKyBjKSAlIG07XHJcbiAgICAgICAgLy8gcmV0dXJuIGEgZmxvYXQgaW4gWzAsIDEpXHJcbiAgICAgICAgLy8gaWYgeiA9IG0gdGhlbiB6IC8gbSA9IDAgdGhlcmVmb3JlICh6ICUgbSkgLyBtIDwgMSBhbHdheXNcclxuICAgICAgICByZXR1cm4geiAvIG07XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSgpKTtcclxuXHJcbiAgbGNnLnNldFNlZWQoc2VlZCk7XHJcblxyXG4gIHBlcmxpbiA9IG5ldyBBcnJheShQRVJMSU5fU0laRSArIDEpO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IFBFUkxJTl9TSVpFICsgMTsgaSsrKSB7XHJcbiAgICBwZXJsaW5baV0gPSBsY2cucmFuZCgpO1xyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUFyYml0cmFyeSAobWluLCBtYXgpIHtcclxuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21JbnQgKG1pbiwgbWF4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbU5vcm1hbGl6ZWQgKCkge1xyXG4gIGxldCB4MSwgeDIsIHJhZFxyXG5cclxuICBkbyB7XHJcbiAgICB4MSA9IDIgKiBNYXRoLnJhbmRvbSgpIC0gMVxyXG4gICAgeDIgPSAyICogTWF0aC5yYW5kb20oKSAtIDFcclxuXHJcbiAgICByYWQgPSAoeDEgKiB4MSkgKyAoeDIgKiB4MilcclxuICB9IHdoaWxlIChyYWQgPj0gMSB8fCByYWQgPT09IDApXHJcblxyXG4gIGNvbnN0IGMgPSBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhyYWQpIC8gcmFkKVxyXG5cclxuICByZXR1cm4geDEgKiBjXHJcbn1cclxuIiwiaW1wb3J0IFJvb3QgZnJvbSAnLi9leHBlcmltZW50cy8xL2luZGV4J1xyXG5pbXBvcnQgTmVvbiBmcm9tICcuL2V4cGVyaW1lbnRzLzIvaW5kZXgnXHJcbmltcG9ydCBBdG9tIGZyb20gJy4vZXhwZXJpbWVudHMvMy9pbmRleCdcclxuaW1wb3J0IEZsb3cgZnJvbSAnLi9leHBlcmltZW50cy80L2luZGV4J1xyXG5pbXBvcnQgQXdheSBmcm9tICcuL2V4cGVyaW1lbnRzLzUvaW5kZXgnXHJcblxyXG5jb25zdCBleHBlcmltZW50cyA9IHtcclxuICAncm9vdCc6IFJvb3QsXHJcbiAgJ25lb24nOiBOZW9uLFxyXG4gICdhdG9tJzogQXRvbSxcclxuICAnZmxvdyc6IEZsb3csXHJcbiAgJ2F3YXknOiBBd2F5XHJcbn1cclxuXHJcbmNvbnN0IGV4cGVyaW1lbnRzTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhleHBlcmltZW50cylcclxuY29uc3QgZXhwZXJpbWVudHNTZWxlY3RlZCA9ICh3aW5kb3cubG9jYXRpb24uaGFzaCkgPyB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpIDogZXhwZXJpbWVudHNOYW1lc1swXVxyXG5cclxubGV0IGV4cGVyaW1lbnRzQWN0aXZlXHJcblxyXG5pZiAoZXhwZXJpbWVudHNbZXhwZXJpbWVudHNTZWxlY3RlZF0pIHtcclxuICBleHBlcmltZW50c0FjdGl2ZSA9IG5ldyBleHBlcmltZW50c1tleHBlcmltZW50c1NlbGVjdGVkXSgpXHJcbn0gZWxzZSB7XHJcbiAgZXhwZXJpbWVudHNBY3RpdmUgPSBuZXcgZXhwZXJpbWVudHNbJ3Jvb3QnXSgpXHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKVxyXG5cclxuICBpZiAoZXhwZXJpbWVudHNOYW1lcy5pbmRleE9mKGhhc2gpID4gLTEpIHtcclxuICAgIGV4cGVyaW1lbnRzQWN0aXZlLmRlc3Ryb3koKVxyXG5cclxuICAgIGV4cGVyaW1lbnRzQWN0aXZlID0gbmV3IGV4cGVyaW1lbnRzW2hhc2hdKClcclxuICB9XHJcbn0pXHJcbiJdfQ==
