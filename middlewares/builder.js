"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_middleware_configuration_exception_1 = require("../errors/exceptions/invalid-middleware-configuration.exception");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const bind_resolve_values_util_1 = require("@nestjs/common/utils/bind-resolve-values.util");
const logger_service_1 = require("@nestjs/common/services/logger.service");
const utils_1 = require("./utils");
class MiddlewareBuilder {
    constructor(routesMapper) {
        this.routesMapper = routesMapper;
        this.middlewaresCollection = new Set();
        this.logger = new logger_service_1.Logger(MiddlewareBuilder.name);
    }
    apply(middlewares) {
        return new MiddlewareBuilder.ConfigProxy(this, middlewares);
    }
    /**
     * @deprecated
     * Since version RC.6 this method is deprecated. Use apply() instead.
     */
    use(configuration) {
        this.logger.warn('DEPRECATED! Since version RC.6 `use()` method is deprecated. Use `apply()` instead.');
        const { middlewares, forRoutes } = configuration;
        if (shared_utils_1.isUndefined(middlewares) || shared_utils_1.isUndefined(forRoutes)) {
            throw new invalid_middleware_configuration_exception_1.InvalidMiddlewareConfigurationException();
        }
        this.middlewaresCollection.add(configuration);
        return this;
    }
    build() {
        return [...this.middlewaresCollection];
    }
    bindValuesToResolve(middlewares, resolveParams) {
        if (shared_utils_1.isNil(resolveParams)) {
            return middlewares;
        }
        const bindArgs = bind_resolve_values_util_1.BindResolveMiddlewareValues(resolveParams);
        return [].concat(middlewares).map(bindArgs);
    }
}
MiddlewareBuilder.ConfigProxy = class {
    constructor(builder, middlewares) {
        this.builder = builder;
        this.contextArgs = null;
        this.includedRoutes = utils_1.filterMiddlewares(middlewares);
    }
    with(...args) {
        this.contextArgs = args;
        return this;
    }
    forRoutes(...routes) {
        const { middlewaresCollection, bindValuesToResolve, routesMapper } = this.builder;
        const forRoutes = this.mapRoutesToFlatList(routes.map((route) => routesMapper.mapRouteToRouteProps(route)));
        const configuration = {
            middlewares: bindValuesToResolve(this.includedRoutes, this.contextArgs),
            forRoutes,
        };
        middlewaresCollection.add(configuration);
        return this.builder;
    }
    mapRoutesToFlatList(forRoutes) {
        return forRoutes.reduce((a, b) => a.concat(b));
    }
};
exports.MiddlewareBuilder = MiddlewareBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL21pZGRsZXdhcmVzL2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxnSUFBMEg7QUFDMUgsb0VBQW1GO0FBQ25GLDRGQUE0RjtBQUM1RiwyRUFBZ0U7QUFLaEUsbUNBQTRDO0FBRTVDO0lBSUksWUFBNkIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFIdEMsMEJBQXFCLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFDM0QsV0FBTSxHQUFHLElBQUksdUJBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVILENBQUM7SUFFcEQsS0FBSyxDQUFDLFdBQXdCO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEdBQUcsQ0FBQyxhQUFzQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxRkFBcUYsQ0FBQyxDQUFDO1FBRXhHLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLDBCQUFXLENBQUMsV0FBVyxDQUFDLElBQUksMEJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxJQUFJLG9GQUF1QyxFQUFFLENBQUM7UUFDeEQsQ0FBQztRQUVELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sS0FBSztRQUNSLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFdBQTRDLEVBQUUsYUFBb0I7UUFDMUYsRUFBRSxDQUFDLENBQUMsb0JBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN2QixDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsc0RBQTJCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7O0FBRWMsNkJBQVcsR0FBRztJQUl6QixZQUNxQixPQUEwQixFQUMzQyxXQUFXO1FBRE0sWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFKdkMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFPdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyx5QkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sSUFBSSxDQUFDLEdBQUcsSUFBSTtRQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxHQUFHLE1BQU07UUFDdEIsTUFBTSxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFbEYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQ2pFLENBQUMsQ0FBQztRQUNILE1BQU0sYUFBYSxHQUFHO1lBQ2xCLFdBQVcsRUFBRSxtQkFBbUIsQ0FDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUN4QztZQUNELFNBQVM7U0FDWixDQUFDO1FBQ0YscUJBQXFCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxTQUFTO1FBQ2pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSixDQUFDO0FBekVOLDhDQTBFQyJ9