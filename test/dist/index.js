"use strict";

var wapConsoleHTML = "\n<div class=\"wap-console-wrap\">\n    <div class=\"console-output\" id=\"console-output\"></div>\n    <div class=\"opt-wrap\">\n        <button class=\"btn run\">Run</button>\n        <button class=\"btn min\">Min</button>\n        <button class=\"btn prev\">Prev</button>\n        <button class=\"btn next\">Next</button>\n        <button class=\"btn close fr\">Close</button>\n        <button class=\"btn clear fr\">Clear</button>\n    </div>\n    <textarea class=\"console-input\" placeholder=\"input some code...\"></textarea>\n</div>\n";
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WapConsole = function () {
    _createClass(WapConsole, null, [{
        key: 'logType',
        get: function get() {
            return {
                input: 0,
                output: 1
            };
        }
    }]);

    function WapConsole() {
        _classCallCheck(this, WapConsole);

        this.history = [];
        this.historyIndex = null;
        var wrap = this.wrap = document.querySelector('.wap-console-wrap');
        this.input = wrap.querySelector('.console-input');
        this.output = wrap.querySelector('.console-output');
        this.addEventListener();
    }

    /**
     * add event listener
     */


    _createClass(WapConsole, [{
        key: 'addEventListener',
        value: function addEventListener() {
            var _this = this;

            var wrap = this.wrap;
            wrap.addEventListener('click', function () {
                if (wrap.classList.contains('min')) {
                    _this.max();
                }
            }, true);
            wrap.querySelector('.run').addEventListener('click', this.run.bind(this));
            wrap.querySelector('.clear').addEventListener('click', this.clear.bind(this));
            wrap.querySelector('.min').addEventListener('click', this.min.bind(this));
            wrap.querySelector('.close').addEventListener('click', this.close.bind(this));
            wrap.querySelector('.prev').addEventListener('click', this.prev.bind(this));
            wrap.querySelector('.next').addEventListener('click', this.next.bind(this));
            this._overwriteSystemConsoleLog();
        }

        /**
         * run the code which in this.input.value
         */

    }, {
        key: 'run',
        value: function run() {
            var code = this.input.value;
            this._addHistory(code);
            this.input.value = '';
            this.console(WapConsole.logType.input, code);
            var result = eval(code);
            this.console(WapConsole.logType.output, result);
        }

        /**
         *
         * @param code
         * @private
         */

    }, {
        key: '_addHistory',
        value: function _addHistory(code) {
            if (this.history[this.history.length - 1] !== code) {
                this.history.push(code);
            }
            this.historyIndex = null;
        }

        /**
         * clear console.log
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.output.innerHTML = '';
        }

        /**
         * Minimize the console-wrap
         */

    }, {
        key: 'min',
        value: function min() {
            this.wrap.classList.add('min');
        }

        /**
         * Maximizing the console-wrap
         */

    }, {
        key: 'max',
        value: function max() {
            this.wrap.classList.remove('min');
        }

        /**
         *
         */

    }, {
        key: 'prev',
        value: function prev() {
            if (this.historyIndex === null) {
                this.historyIndex = this.history.length - 1;
            } else if (this.historyIndex > 0) {
                this.historyIndex--;
            } else {
                return;
            }
            this.input.value = this.history[this.historyIndex];
        }
    }, {
        key: 'next',
        value: function next() {
            if (this.historyIndex !== null && this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.input.value = this.history[this.historyIndex];
            }
        }

        /**
         * close the console
         */

    }, {
        key: 'close',
        value: function close() {
            this.wrap.classList.add('hide');
        }

        /**
         * print sth
         * @param type
         * @param args
         */

    }, {
        key: 'console',
        value: function console(type) {
            var content = document.createElement('div');
            if (type === WapConsole.logType.input) {
                content.className = 'input-log';
            } else {
                content.className = 'output-log';
            }

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            content.innerHTML = WapConsole._createHtml.apply(WapConsole, args);
            this.output.appendChild(content);
        }

        /**
         * overwrite console.log
         * @private
         */

    }, {
        key: '_overwriteSystemConsoleLog',
        value: function _overwriteSystemConsoleLog() {
            var _this2 = this;

            var old = console.log;
            console.log = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                _this2.console.apply(_this2, [WapConsole.logType.output].concat(args));
                old.apply(undefined, args);
            };
        }

        /**
         * create log's html
         *  future : support object fields
         * @param args
         * @private
         */

    }], [{
        key: '_createHtml',
        value: function _createHtml() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return args.map(function (arg) {
                return '<span class="' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + '">' + arg + '</span>';
            }).join(' ');
        }
    }]);

    return WapConsole;
}();