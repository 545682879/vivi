webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	let React = __webpack_require__(1);
	let ReactDOM = __webpack_require__(158);
	var Hello = __webpack_require__(159);
	ReactDOM.render(React.createElement(Hello, { name: "Nate" }), document.body);

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(3);

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ____Class1 = React.Component;for (var ____Class1____Key in ____Class1) {
	  if (____Class1.hasOwnProperty(____Class1____Key)) {
	    Hello[____Class1____Key] = ____Class1[____Class1____Key];
	  }
	}var ____SuperProtoOf____Class1 = ____Class1 === null ? null : ____Class1.prototype;Hello.prototype = Object.create(____SuperProtoOf____Class1);Hello.prototype.constructor = Hello;Hello.__superConstructor__ = ____Class1;function Hello() {
	  "use strict";
	  if (____Class1 !== null) {
	    ____Class1.apply(this, arguments);
	  }
	}
	Object.defineProperty(Hello.prototype, "render", { writable: true, configurable: true, value: function () {
	    "use strict";

	    return React.createElement("h1", null, "Hello ", this.props.name, "!");
	  } });

/***/ }

});