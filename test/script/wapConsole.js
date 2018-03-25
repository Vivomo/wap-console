class WapConsole {
    static get logType () {
        return {
            input: 0,
            output: 1,
        }
    }

    constructor() {
        let wrap = this.wrap = document.querySelector('.wap-console-wrap');
        this.input = wrap.querySelector('.console-input');
        this.output = wrap.querySelector('.console-output');
        this.addEventListener();
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
        this._overwriteSystemConsoleLog();
    }

    /**
     * run the code which in this.input.value
     */
    run() {
        let code = this.input.value;
        this.input.value = '';
        this.console(WapConsole.logType.input, code);
        let result = eval(code);
        this.console(WapConsole.logType.output, result);
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