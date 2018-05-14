import Router from './router';

const router = new Router();

router.get('/', async (ctx: any) => {
    await ctx.render('index');
});

router.get('/index', async (ctx: any) => {
    await ctx.render('index');
});

router.get('/aaa', async (ctx: any) => {
    await ctx.render('index');
});

export default router;