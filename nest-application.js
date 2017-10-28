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
const iterare_1 = require("iterare");
const middlewares_module_1 = require("./middlewares/middlewares-module");
const socket_module_1 = require("@nestjs/websockets/socket-module");
const express_adapter_1 = require("./adapters/express-adapter");
const routes_resolver_1 = require("./router/routes-resolver");
const logger_service_1 = require("@nestjs/common/services/logger.service");
const constants_1 = require("./constants");
const microservices_module_1 = require("@nestjs/microservices/microservices-module");
const application_config_1 = require("./application-config");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const index_1 = require("./index");
class NestApplication {
    constructor(container, express) {
        this.container = container;
        this.express = express;
        this.config = new application_config_1.ApplicationConfig();
        this.logger = new logger_service_1.Logger(NestApplication.name, true);
        this.routesResolver = null;
        this.microservices = [];
        this.isInitialized = false;
        this.server = null;
        this.routesResolver = new routes_resolver_1.RoutesResolver(container, express_adapter_1.ExpressAdapter, this.config);
    }
    setupModules() {
        return __awaiter(this, void 0, void 0, function* () {
            socket_module_1.SocketModule.setup(this.container, this.config);
            microservices_module_1.MicroservicesModule.setup(this.container, this.config);
            microservices_module_1.MicroservicesModule.setupClients(this.container);
            yield middlewares_module_1.MiddlewaresModule.setup(this.container, this.config);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupModules();
            yield this.setupRouter();
            this.callInitHook();
            this.logger.log(constants_1.messages.APPLICATION_READY);
            this.isInitialized = true;
        });
    }
    setupRouter() {
        return __awaiter(this, void 0, void 0, function* () {
            const router = express_adapter_1.ExpressAdapter.createRouter();
            yield this.setupMiddlewares(router);
            this.routesResolver.resolve(router);
            this.express.use(shared_utils_1.validatePath(this.config.getGlobalPrefix()), router);
        });
    }
    connectMicroservice(config) {
        const instance = new index_1.NestMicroservice(this.container, config);
        instance.setupListeners();
        instance.setIsInitialized(true);
        this.microservices.push(instance);
        return instance;
    }
    getMicroservices() {
        return this.microservices;
    }
    startAllMicroservices(callback) {
        Promise.all(this.microservices.map(this.listenToPromise)).then(() => callback && callback());
    }
    startAllMicroservicesAsync() {
        return new Promise((resolve) => this.startAllMicroservices(resolve));
    }
    use(requestHandler) {
        this.express.use(requestHandler);
    }
    listen(port, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            (!this.isInitialized) && (yield this.init());
            this.server = this.express.listen(port, ...args);
            return this.server;
        });
    }
    listenAsync(port, hostname) {
        return new Promise((resolve) => {
            const server = this.listen(port, hostname, () => resolve(server));
        });
    }
    close() {
        socket_module_1.SocketModule.close();
        this.server && this.server.close();
        this.microservices.forEach((microservice) => {
            microservice.setIsTerminated(true);
            microservice.close();
        });
        this.callDestroyHook();
    }
    setGlobalPrefix(prefix) {
        this.config.setGlobalPrefix(prefix);
    }
    useWebSocketAdapter(adapter) {
        this.config.setIoAdapter(adapter);
    }
    useGlobalFilters(...filters) {
        this.config.useGlobalFilters(...filters);
    }
    useGlobalPipes(...pipes) {
        this.config.useGlobalPipes(...pipes);
    }
    useGlobalInterceptors(...interceptors) {
        this.config.useGlobalInterceptors(...interceptors);
    }
    useGlobalGuards(...guards) {
        this.config.useGlobalGuards(...guards);
    }
    setupMiddlewares(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            yield middlewares_module_1.MiddlewaresModule.setupMiddlewares(instance);
        });
    }
    listenToPromise(microservice) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield microservice.listen(resolve);
        }));
    }
    callInitHook() {
        const modules = this.container.getModules();
        modules.forEach((module) => {
            this.callModuleInitHook(module);
        });
    }
    callModuleInitHook(module) {
        const components = [...module.routes, ...module.components];
        iterare_1.default(components).map(([key, { instance }]) => instance)
            .filter((instance) => !shared_utils_1.isNil(instance))
            .filter(this.hasOnModuleInitHook)
            .forEach((instance) => instance.onModuleInit());
    }
    hasOnModuleInitHook(instance) {
        return !shared_utils_1.isUndefined(instance.onModuleInit);
    }
    callDestroyHook() {
        const modules = this.container.getModules();
        modules.forEach((module) => {
            this.callModuleDestroyHook(module);
        });
    }
    callModuleDestroyHook(module) {
        const components = [...module.routes, ...module.components];
        iterare_1.default(components).map(([key, { instance }]) => instance)
            .filter((instance) => !shared_utils_1.isNil(instance))
            .filter(this.hasOnModuleDestroyHook)
            .forEach((instance) => instance.onModuleDestroy());
    }
    hasOnModuleDestroyHook(instance) {
        return !shared_utils_1.isUndefined(instance.onModuleDestroy);
    }
}
exports.NestApplication = NestApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdC1hcHBsaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL25lc3QtYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFDQUE4QjtBQUM5Qix5RUFBcUU7QUFDckUsb0VBQWdFO0FBRWhFLGdFQUE0RDtBQUM1RCw4REFBMEQ7QUFDMUQsMkVBQWdFO0FBQ2hFLDJDQUF1QztBQUN2QyxxRkFBaUY7QUFHakYsNkRBQXlEO0FBQ3pELG9FQUFxRjtBQUVyRixtQ0FBMkM7QUFJM0M7SUFRSSxZQUNxQixTQUF3QixFQUN4QixPQUFPO1FBRFAsY0FBUyxHQUFULFNBQVMsQ0FBZTtRQUN4QixZQUFPLEdBQVAsT0FBTyxDQUFBO1FBVFgsV0FBTSxHQUFHLElBQUksc0NBQWlCLEVBQUUsQ0FBQztRQUNqQyxXQUFNLEdBQUcsSUFBSSx1QkFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDNUIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsV0FBTSxHQUFHLElBQUksQ0FBQztRQU1sQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksZ0NBQWMsQ0FDcEMsU0FBUyxFQUFFLGdDQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FDekMsQ0FBQztJQUNOLENBQUM7SUFFWSxZQUFZOztZQUNyQiw0QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCwwQ0FBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkQsMENBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqRCxNQUFNLHND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