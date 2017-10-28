"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_proxy_1 = require("./router-proxy");
const logger_service_1 = require("@nestjs/common/services/logger.service");
const messages_1 = require("../helpers/messages");
const router_exception_filters_1 = require("./router-exception-filters");
const metadata_scanner_1 = require("../metadata-scanner");
const router_explorer_1 = require("./router-explorer");
class RoutesResolver {
    constructor(container, expressAdapter, config) {
        this.container = container;
        this.expressAdapter = expressAdapter;
        this.config = config;
        this.logger = new logger_service_1.Logger(RoutesResolver.name, true);
        this.routerProxy = new router_proxy_1.RouterProxy();
        this.routerExceptionsFilter = new router_exception_filters_1.RouterExceptionFilters(config);
        this.routerBuilder = new router_explorer_1.ExpressRouterExplorer(new metadata_scanner_1.MetadataScanner(), this.routerProxy, expressAdapter, this.routerExceptionsFilter, config, this.container);
    }
    resolve(express) {
        const modules = this.container.getModules();
        modules.forEach(({ routes }, moduleName) => this.setupRouters(routes, moduleName, express));
    }
    setupRouters(routes, moduleName, express) {
        routes.forEach(({ instance, metatype }) => {
            this.logger.log(messages_1.ControllerMappingMessage(metatype.name));
            const { path, router } = this.routerBuilder.explore(instance, metatype, moduleName);
            express.use(path, router);
        });
        this.setupExceptionHandler(express);
    }
    setupExceptionHandler(express) {
        const callback = (err, req, res, next) => {
            throw err;
        };
        const exceptionHandler = this.routerExceptionsFilter.create({}, callback);
        const proxy = this.routerProxy.createExceptionLayerProxy(callback, exceptionHandler);
        express.use(proxy);
    }
}
exports.RoutesResolver = RoutesResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLXJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcm91dGVyL3JvdXRlcy1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGlEQUE2QztBQUU3QywyRUFBZ0U7QUFDaEUsa0RBQStEO0FBRS9ELHlFQUFvRTtBQUNwRSwwREFBc0Q7QUFFdEQsdURBQTBEO0FBRzFEO0lBTUksWUFDcUIsU0FBd0IsRUFDeEIsY0FBYyxFQUNkLE1BQXlCO1FBRnpCLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQUE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQVI3QixXQUFNLEdBQUcsSUFBSSx1QkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsZ0JBQVcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQVM3QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxpREFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksdUNBQXFCLENBQzFDLElBQUksa0NBQWUsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsY0FBYyxFQUN2RCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQ3RELENBQUM7SUFDTixDQUFDO0lBRU0sT0FBTyxDQUFDLE9BQW9CO1FBQy9CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRU0sWUFBWSxDQUNmLE1BQWdELEVBQ2hELFVBQWtCLEVBQ2xCLE9BQW9CO1FBRXBCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUF3QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRXpELE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0scUJBQXFCLENBQUMsT0FBb0I7UUFDN0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNyQyxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQztRQUNGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBZSxDQUFDLENBQUM7UUFDakYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQTdDRCx3Q0E2Q0MifQ==