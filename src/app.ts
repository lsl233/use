import * as Koa from 'koa';
import router from './router';
import render from './utils/render'

const app = new Koa();

app.use(render);

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(router.routes());

app.listen(3000);

console.info('koa server start', 3000);