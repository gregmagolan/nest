"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const unknown_request_mapping_exception_1 = require("../errors/exceptions/unknown-request-mapping.exception");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const router_method_factory_1 = require("../helpers/router-method-factory");
const constants_1 = require("@nestjs/common/constants");
const logger_service_1 = require("@nestjs/common/services/logger.service");
const messages_1 = require("../helpers/messages");
const router_execution_context_1 = require("./router-execution-context");
const route_params_factory_1 = require("./route-params-factory");
const pipes_context_creator_1 = require("./../pipes/pipes-context-creator");
const pipes_consumer_1 = require("./../pipes/pipes-consumer");
const guards_context_creator_1 = require("../guards/guards-context-creator");
const guards_consumer_1 = require("../guards/guards-consumer");
const interceptors_context_creator_1 = require("../interceptors/interceptors-context-creator");
const interceptors_consumer_1 = require("../interceptors/interceptors-consumer");
class ExpressRouterExplorer {
    constructor(metadataScanner, routerProxy, expressAdapter, exceptionsFilter, config, container) {
        this.metadataScanner = metadataScanner;
        this.routerProxy = routerProxy;
        this.expressAdapter = expressAdapter;
        this.exceptionsFilter = exceptionsFilter;
        this.config = config;
        this.routerMethodFactory = new router_method_factory_1.RouterMethodFactory();
        this.logger = new logger_service_1.Logger('RouterExplorer', true);
        this.executionContextCreator = new router_execution_context_1.RouterExecutionContext(new route_params_factory_1.RouteParamsFactory(), new pipes_context_creator_1.PipesContextCreator(config), new pipes_consumer_1.PipesConsumer(), new guards_context_creator_1.GuardsContextCreator(container, config), new guards_consumer_1.GuardsConsumer(), new interceptors_context_creator_1.InterceptorsContextCreator(container, config), new interceptors_consumer_1.InterceptorsConsumer());
    }
    explore(instance, metatype, module) {
        const router = this.expressAdapter.createRouter();
        const path = this.fetchRouterPath(metatype);
        const routerPaths = this.scanForPaths(instance);
        this.applyPathsToRouterProxy(router, routerPaths, instance, module);
        return { path, router };
    }
    scanForPaths(instance, prototype) {
        const instancePrototype = shared_utils_1.isUndefined(prototype) ? Object.getPrototypeOf(instance) : prototype;
        return this.metadataScanner.scanFromPrototype(instance, instancePrototype, (method) => this.exploreMethodMetadata(instance, instancePrototype, method));
    }
    exploreMethodMetadata(instance, instancePrototype, methodName) {
        const targetCallback = instancePrototype[methodName];
        const routePath = Reflect.getMetadata(constants_1.PATH_METADATA, targetCallback);
        if (shared_utils_1.isUndefined(routePath)) {
            return null;
        }
        const requestMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, targetCallback);
        return {
            path: this.validateRoutePath(routePath),
            requestMethod,
            targetCallback,
            methodName,
        };
    }
    applyPathsToRouterProxy(router, routePaths, instance, module) {
        (routePaths || []).map((pathProperties) => {
            const { path, requestMethod } = pathProperties;
            this.applyCallbackToRouter(router, pathProperties, instance, module);
            this.logger.log(messages_1.RouteMappedMessage(path, requestMethod));
        });
    }
    applyCallbackToRouter(router, pathProperties, instance, module) {
        const { path, requestMethod, targetCallback, methodName } = pathProperties;
        const routerMethod = this.routerMethodFactory.get(router, requestMethod).bind(router);
        const proxy = this.createCallbackProxy(instance, targetCallback, methodName, module, requestMethod);
        routerMethod(path, proxy);
    }
    createCallbackProxy(instance, callback, methodName, module, requestMethod) {
        const executionContext = this.executionContextCreator.create(instance, callback, methodName, module, requestMethod);
        const exceptionFilter = this.exceptionsFilter.create(instance, callback);
        return this.routerProxy.createProxy(executionContext, exceptionFilter);
    }
    fetchRouterPath(metatype) {
        const path = Reflect.getMetadata(constants_1.PATH_METADATA, metatype);
        return this.validateRoutePath(path);
    }
    validateRoutePath(path) {
        if (shared_utils_1.isUndefined(path)) {
            throw new unknown_request_mapping_exception_1.UnknownRequestMappingException();
        }
        return shared_utils_1.validatePath(path);
    }
}
exports.ExpressRouterExplorer = ExpressRouterExplorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWV4cGxvcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcm91dGVyL3JvdXRlci1leHBsb3Jlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRCQUEwQjtBQUkxQiw4R0FBd0c7QUFHeEcsb0VBQThFO0FBQzlFLDRFQUF1RTtBQUN2RSx3REFBMEU7QUFDMUUsMkVBQWdFO0FBQ2hFLGtEQUF5RDtBQUN6RCx5RUFBb0U7QUFFcEUsaUVBQTREO0FBSTVELDRFQUF1RTtBQUN2RSw4REFBMEQ7QUFFMUQsNkVBQXdFO0FBQ3hFLCtEQUEyRDtBQUMzRCwrRkFBMEY7QUFDMUYsaUZBQTZFO0FBRTdFO0lBS0ksWUFDcUIsZUFBaUMsRUFDakMsV0FBeUIsRUFDekIsY0FBK0IsRUFDL0IsZ0JBQW1DLEVBQ25DLE1BQTBCLEVBQzNDLFNBQXlCO1FBTFIsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBQ3pCLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBUjlCLHdCQUFtQixHQUFHLElBQUksMkNBQW1CLEVBQUUsQ0FBQztRQUNoRCxXQUFNLEdBQUcsSUFBSSx1QkFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBVXpELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLGlEQUFzQixDQUNyRCxJQUFJLHlDQUFrQixFQUFFLEVBQ3hCLElBQUksMkNBQW1CLENBQUMsTUFBTSxDQUFDLEVBQy9CLElBQUksOEJBQWEsRUFBRSxFQUNuQixJQUFJLDZDQUFvQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFDM0MsSUFBSSxnQ0FBYyxFQUFFLEVBQ3BCLElBQUkseURBQTBCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUNqRCxJQUFJLDRDQUFv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