"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterare_1 = require("iterare");
const microservices_module_1 = require("@nestjs/microservices/microservices-module");
const constants_1 = require("./constants");
const logger_service_1 = require("@nestjs/common/services/logger.service");
const server_factory_1 = require("@nestjs/microservices/server/server-factory");
const transport_enum_1 = require("@nestjs/microservices/enums/transport.enum");
const application_config_1 = require("./application-config");
const socket_module_1 = require("@nestjs/websockets/socket-module");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
class NestMicroservice {
    constructor(container, config) {
        this.container = container;
        this.config = new application_config_1.ApplicationConfig();
        this.logger = new logger_service_1.Logger(NestMicroservice.name, true);
        this.isTerminated = false;
        this.isInitialized = false;
        microservices_module_1.MicroservicesModule.setup(container, this.config);
        this.microserviceConfig = Object.assign({ transport: transport_enum_1.Transport.TCP }, config);
        const { strategy } = config;
        this.server = strategy ? strategy : server_factory_1.ServerFactory.create(this.microserviceConfig);
    }
    setupModules() {
        socket_module_1.SocketModule.setup(this.container, this.config);
        microservices_module_1.MicroservicesModule.setupClients(this.container);
        this.setupListeners();
        this.isInitialized = true;
    }
    setupListeners() {
        microservices_module_1.MicroservicesModule.setupListeners(this.container, this.server);
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
    listen(callback) {
        (!this.isInitialized) && this.setupModules();
        this.logger.log(constants_1.messages.MICROSERVICE_READY);
        this.server.listen(callback);
    }
    close() {
        this.server.close();
        !this.isTerminated && this.closeApplication();
    }
    setIsInitialized(isInitialized) {
        this.isInitialized = isInitialized;
    }
    setIsTerminated(isTerminaed) {
        this.isTerminated = isTerminaed;
    }
    closeApplication() {
        socket_module_1.SocketModule.close();
        this.callDestroyHook();
        this.setIsTerminated(true);
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
exports.NestMicroservice = NestMicroservice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdC1taWNyb3NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9uZXN0LW1pY3Jvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUE4QjtBQUU5QixxRkFBaUY7QUFDakYsMkNBQXVDO0FBQ3ZDLDJFQUFnRTtBQUdoRSxnRkFBNEU7QUFDNUUsK0VBQXVFO0FBRXZFLDZEQUF5RDtBQUN6RCxvRUFBZ0U7QUFHaEUsb0VBQXVFO0FBR3ZFO0lBUUksWUFDWSxTQUF3QixFQUNoQyxNQUFpQztRQUR6QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBUm5CLFdBQU0sR0FBRyxJQUFJLHNDQUFpQixFQUFFLENBQUM7UUFDakMsV0FBTSxHQUFHLElBQUksdUJBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFHMUQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFNMUIsMENBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGtCQUFrQixtQkFDbkIsU0FBUyxFQUFFLDBCQUFTLENBQUMsR0FBRyxJQUNyQixNQUFNLENBQ1osQ0FBQztRQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsOEJBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVNLFlBQVk7UUFDZiw0QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCwwQ0FBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMs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