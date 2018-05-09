import * as Router from 'koa-router';

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = 'Hello World';
});

router.get('/login', (ctx) => {
    ctx.render('login');
});

router.get('/test', (ctx) => {
    ctx.body = 'Hello33333 World';
});

export default router;
