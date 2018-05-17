interface routerMap {
    [key: string]: {
        [key: string]: (ctx: any, next:() => void) => any;
    }
}

interface Ctx {
    [key: string]: any;
}

class Router {
    private routerMap: routerMap = {};

    constructor () {}

    router(ctx: Ctx, next: () => void): void {
        if (this.routerMap[ctx.url] && this.routerMap[ctx.url][ctx.method]) {
            this.routerMap[ctx.url][ctx.method](ctx, next);
        } else {
            console.error(ctx.url, 404);
            ctx.status = 404;
        }
    }

    isUrlExist (url: string): boolean {
        return !!this.routerMap[url];
    }

    private addMethod (url: string, callback: any) {
        if (!this.isUrlExist(url)) {
            this.routerMap[url] = {};
        }
        this.routerMap[url]['GET'] = callback;
        return this;
    }

    get(url: string, callback: any): any {
        this.addMethod(url, callback);
    }
}

export default Router;
