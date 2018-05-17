import Router from './router';
import page from './page';
import api from './api';

const router = new Router();
page(router);
api(router);

export default router;