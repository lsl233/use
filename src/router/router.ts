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
        console.log('router map:', this.getRouterMap(), ctx.url);
        if (this.routerMap[ctx.url] || this.routerMap[ctx.url][ctx.method]) {
            this.routerMap[ctx.url][ctx.method](ctx, next);
        } else {
            next();
        }
    }

    getRouterMap () {
        return this.routerMap;
    }

    isUrlExist (url: string): boolean {
        return !!this.routerMap[url];
    }

    addMethod (url: string, callback: any) {
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
