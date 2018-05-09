import * as ejs from 'ejs';
import * as path from 'path';

const defaultSettings = {
    cache: true,
    layout: 'layout',
    viewExt: 'html',
    locals: {},
    compileDebug: false,
    debug: false,
    writeResp: true
};

async function koaEjs (app: object, settings: object) {
    if (app.context.render) {
        return;
    }

    settings = Object.assign({}, defaultSettings, settings);

    async function render(view, options) {
        view += settings.viewExt;
        const viewPath = path.join(settings.root, view);
        debug(`render: ${viewPath}`);
        // get from cache
        if (settings.cache && cache[viewPath]) {
            return cache[viewPath].call(options.scope, options);
        }

        const tpl = await fs.readFile(viewPath, 'utf8');

        // override `ejs` node_module `resolveInclude` function
        ejs.resolveInclude = function(name, filename, isDir) {
            if (!path.extname(name)) {
                name += settings.viewExt;
            }
            return parentResolveInclude(name, filename, isDir);
        }

        const fn = ejs.compile(tpl, {
            filename: viewPath,
            _with: settings._with,
            compileDebug: settings.debug && settings.compileDebug,
            debug: settings.debug,
            delimiter: settings.delimiter
        });
        if (settings.cache) {
            cache[viewPath] = fn;
        }

        return fn.call(options.scope, options);
    }
}

export default render