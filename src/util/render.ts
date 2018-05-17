import * as ejs from 'ejs';
import * as fs from "fs";
import * as path from "path";

const defaultOptions = {
    root: './',
    cache: false,
    layout: 'layout',
    viewExt: 'html',
    locals: {},
    compileDebug: false,
    debug: false,
    writeResp: true
};

interface Options {
    root?: string;
    cache?: boolean;
    layout?: string;
    viewExt?: string;
    locals: object;
    compileDebug?: boolean;
    debug?: boolean;
    writeResp?: boolean;
}

function koaEjs (app: any, options: any): void {
    options = Object.assign({}, defaultOptions, options);
    async function render (view: string, data: object) {
        const ctx:any = this;
        const viewPath:string = path.join(options.root, view) + '.' + options.viewExt;
        let temp:string;
        try {
            temp = fs.readFileSync(viewPath, 'utf-8');
        } catch (error) {
            console.error('fs read file sync::', error);
            ctx.body = '未找到temp';
            return;
        }
        ctx.body = ejs.render(temp, data);
    }
    app.context.render = render;
}

export default koaEjs;
