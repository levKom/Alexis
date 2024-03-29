"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WebComp =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(WebComp, _HTMLElement);

  function WebComp() {
    var _this;

    _classCallCheck(this, WebComp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebComp).call(this));
    _this.shadow = _this.attachShadow({
      mode: 'open'
    });
    return _this;
  }

  _createClass(WebComp, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldVal, newVal) {
      var _this2 = this;

      fetch(newVal).then(function (response) {
        return response.text();
      }).then(function (response) {
        switch (attrName) {
          case 'markup':
            var styles = _this2.shadow.innerHTML.split('<style>').length === 1 ? '' : _this2.shadow.innerHTML.split('<style>')[1].split('</style>')[0];
            _this2.shadow.innerHTML = response + "<style>".concat(styles, "</style>");
            break;

          /* case 'styles':
            const html = this.shadow.innerHTML.split('<style>');
            const end = html.length === 1 ? '' : html[1].split('</style>')[1];
            this.shadow.innerHTML = html[0] +
                `<style>${response}</style>` + end;
            break; */
        }
      });
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['markup', 'styles'];
    }
  }]);

  return WebComp;
}(_wrapNativeSuper(HTMLElement));

;
customElements.define('web-comp', WebComp);
var main = document.querySelector('main');
var webComp = main.appendChild(document.createElement('web-comp'));
webComp.setAttribute('markup', 'chunks/about.html'); // webComp.setAttribute('styles', 'chunks/about.css');

function changeAttrs(event) {
  event.preventDefault();
  webComp.setAttribute('markup', "chunks/".concat(event.target.getAttribute('href'), ".html"));
  /* webComp.setAttribute(
      'styles',
      `chunks/${event.target.getAttribute('href')}.css`
  ); */
}

var items = document.querySelectorAll('.web-component');
items.forEach(function (item) {
  item.addEventListener('click', changeAttrs);
});