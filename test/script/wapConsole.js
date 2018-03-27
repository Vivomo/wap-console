class WapConsole {
    static get logType () {
        return {
            input: 0,
            output: 1,
        }
    }

    constructor() {
        this.history = [];
        this.historyIndex = null;
        this.wrap = document.querySelector('.wap-console-wrap');
        if (!this.wrap) {
            this.init();
        }
        this.input = this.wrap.querySelector('.console-input');
        this.output = this.wrap.querySelector('.console-output');
        this.addEventListener();
    }

    init() {
        let wrap = this.wrap = document.createElement('div');
        wrap.className = 'wap-console-wrap';
        wrap.innerHTML = wapConsoleHTML;
        document.body.appendChild(wrap);

        let style = document.createElement('style');
        style.innerText = wapConsoleStyle;
        document.head.appendChild(style);
    }

    /**
     * add event listener
     */
    addEventListener() {
        let wrap = this.wrap;
        wrap.addEventListener('click', () => {
            if (wrap.classList.contains('min')) {
                this.max();
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
    run() {
        let code = this.input.value;
        this._addHistory(code);
        this.input.value = '';
        this.console(WapConsole.logType.input, code);
        let result = eval(code);
        this.console(WapConsole.logType.output, result);
    }

    /**
     *
     * @param code
     * @private
     */
    _addHistory(code) {
        if (this.history[this.history.length - 1] !== code) {
            this.history.push(code);
        }
        this.historyIndex = null;
    }

    /**
     * clear console.log
     */
    clear() {
        this.output.innerHTML = '';
    }

    /**
     * Minimize the console-wrap
     */
    min() {
        this.wrap.classList.add('min');
    }

    /**
     * Maximizing the console-wrap
     */
    max() {
        this.wrap.classList.remove('min');
    }

    /**
     *
     */
    prev() {
        if (this.historyIndex === null) {
            this.historyIndex = this.history.length - 1;
        } else if (this.historyIndex > 0) {
            this.historyIndex --;
        } else {
            return;
        }
        this.input.value = this.history[this.historyIndex];
    }

    next() {
        if (this.historyIndex !== null && this.historyIndex < this.history.length - 1) {
            this.historyIndex ++;
            this.input.value = this.history[this.historyIndex];
        }
    }

    /**
     * close the console
     */
    close() {
        this.wrap.classList.add('hide');
    }

    /**
     * print sth
     * @param type
     * @param args
     */
    console(type, ...args) {
        let content = document.createElement('div');
        if (type === WapConsole.logType.input) {
            content.className = 'input-log';
        } else {
            content.className = 'output-log';
        }
        content.innerHTML = WapConsole._createHtml(...args);
        this.output.appendChild(content);
    }

    /**
     * overwrite console.log
     * @private
     */
    _overwriteSystemConsoleLog() {
        let old = console.log;
        console.log = (...args) => {
            this.console(WapConsole.logType.output, ...args);
            old(...args);
        }
    }

    /**
     * create log's html
     *  future : support object fields
     * @param args
     * @private
     */
    static _createHtml(...args) {
        return args.map((arg) => (`<span class="${typeof arg}">${arg}</span>`)).join(' ');
    }


}