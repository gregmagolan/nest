"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("./builder");
const container_1 = require("./container");
const resolver_1 = require("./resolver");
const invalid_middleware_exception_1 = require("../errors/exceptions/invalid-middleware.exception");
const routes_mapper_1 = require("./routes-mapper");
const router_proxy_1 = require("../router/router-proxy");
const router_method_factory_1 = require("../helpers/router-method-factory");
const runtime_exception_1 = require("../errors/exceptions/runtime.exception");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const router_exception_filters_1 = require("./../router/router-exception-filters");
class MiddlewaresModule {
    static setup(container, config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.routerExceptionFilter = new router_exception_filters_1.RouterExceptionFilters(config);
            this.resolver = new resolver_1.MiddlewaresResolver(this.container);
            const modules = container.getModules();
            yield this.resolveMiddlewares(modules);
        });
    }
    static getContainer() {
        return this.container;
    }
    static resolveMiddlewares(modules) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([...modules.entries()].map(([name, module]) => __awaiter(this, void 0, void 0, function* () {
                const instance = module.instance;
                this.loadConfiguration(instance, name);
                yield this.resolver.resolveInstances(module, name);
            })));
        });
    }
    static loadConfiguration(instance, module) {
        if (!instance.configure)
            return;
        const middlewaresBuilder = new builder_1.MiddlewareBuilder(this.routesMapper);
        instance.configure(middlewaresBuilder);
        if (!(middlewaresBuilder instanceof builder_1.MiddlewareBuilder))
            return;
        const config = middlewaresBuilder.build();
        this.container.addConfig(config, module);
    }
    static setupMiddlewares(app) {
        return __awaiter(this, void 0, void 0, function* () {
            const configs = this.container.getConfigs();
            yield Promise.all([...configs.entries()].map(([module, moduleConfigs]) => __awaiter(this, void 0, void 0, function* () {
                yield Promise.all([...moduleConfigs].map((config) => __awaiter(this, void 0, void 0, function* () {
                    yield this.setupMiddlewareConfig(config, module, app);
                })));
            })));
        });
    }
    static setupMiddlewareConfig(config, module, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const { forRoutes } = config;
            yield Promise.all(forRoutes.map((route) => __awaiter(this, void 0, void 0, function* () {
                yield this.setupRouteMiddleware(route, config, module, app);
            })));
        });
    }
    static setupRouteMiddleware(route, config, module, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path, method } = route;
            const middlewares = [].concat(config.middlewares);
            yield Promise.all(middlewares.map((metatype) => __awaiter(this, void 0, void 0, function* () {
                const collection = this.container.getMiddlewares(module);
                const middleware = collection.get(metatype.name);
                if (shared_utils_1.isUndefined(middleware)) {
                    throw new runtime_exception_1.RuntimeException();
                }
                const { instance } = middleware;
                yield this.setupHandler(instance, metatype, app, method, path);
            })));
        });
    }
    static setupHandler(instance, metatype, app, method, path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (shared_utils_1.isUndefined(instance.resolve)) {
                throw new invalid_middleware_exception_1.InvalidMiddlewareException(metatype.name);
            }
            const exceptionsHandler = this.routerExceptionFilter.create(instance, instance.resolve);
            const router = this.routerMethodFactory.get(app, method).bind(app);
            const setupWithProxy = (middleware) => this.setupHandlerWithProxy(exceptionsHandler, router, middleware, path);
            const resolve = instance.resolve();
            if (!(resolve instanceof Promise)) {
                setupWithProxy(resolve);
                return;
            }
            const middleware = yield resolve;
            setupWithProxy(middleware);
        });
    }
    static setupHandlerWithProxy(exceptionsHandler, router, middleware, path) {
        const proxy = this.routerProxy.createProxy(middleware, exceptionsHandler);
        router(path, proxy);
    }
}
MiddlewaresModule.routesMapper = new routes_mapper_1.RoutesMapper();
MiddlewaresModule.container = new container_1.MiddlewaresContainer();
MiddlewaresModule.routerProxy = new router_proxy_1.RouterProxy();
MiddlewaresModule.routerMethodFactory = new router_method_factory_1.RouterMethodFactory();
exports.MiddlewaresModule = MiddlewaresModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbWlkZGxld2FyZXMvbWlkZGxld2FyZXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx1Q0FBOEM7QUFDOUMsMkNBQXNFO0FBQ3RFLHlDQUFpRDtBQUlqRCxvR0FBK0Y7QUFFL0YsbURBQStDO0FBQy9DLHlEQUFxRDtBQUdyRCw0RUFBdUU7QUFHdkUsOEVBQTBFO0FBQzFFLG9FQUFnRTtBQUVoRSxtRkFBOEU7QUFFOUU7SUFRVyxNQUFNLENBQU8sS0FBSyxDQUFDLFNBQXdCLEVBQUUsTUFBeUI7O1lBQ3pFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLGlEQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw4QkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFeEQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7S0FBQTtJQUVNLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTSxNQUFNLENBQU8sa0JBQWtCLENBQUMsT0FBNEI7O1lBQy9ELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtnQkFDbEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFFakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdkMs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