class WapConsole {
    static get logType () {
        return {
            input: 0,
            output: 1,
        }
    }

    constructor() {
        let wrap = document.querySelector('.wap-console-wrap');
        this.input = wrap.querySelector('.console-input');
        this.output = wrap.querySelector('.console-output');

        wrap.querySelector('.run').addEventListener('click', this.run.bind(this));
        wrap.querySelector('.clear').addEventListener('click', this.clear.bind(this));

    }

    run() {
        let code = this.input.value;
        this.input.value = '';
        this.console(WapConsole.logType.input, code);
        let result = eval(code);
        this.console(WapConsole.logType.output, result);
    }

    clear() {
        this.output.innerHTML = '';
    }

    console(type, sth) {
        let content = document.createElement('div');
        if (type === WapConsole.logType.input) {
            content.className = 'input-log';
        } else {
            content.className = 'output-log';
        }
        content.innerHTML = sth;
        this.output.appendChild(content);
    }


}