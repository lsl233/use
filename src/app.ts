///<reference path="../node_modules/@types/node/index.d.ts"/>
import * as Koa from 'koa';
import router from './router';
import koaEjs from './utils/render'
import * as path from "path";

const app = new Koa();

koaEjs(app, {
    root: path.join(__dirname, 'views'),
});

app.use(async (ctx, next) => router.router(ctx, next));

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.listen(3001);

console.info('koa server start', 3001);