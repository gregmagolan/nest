"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const router_explorer_1 = require("../router/router-explorer");
const unknown_request_mapping_exception_1 = require("../errors/exceptions/unknown-request-mapping.exception");
const request_method_enum_1 = require("@nestjs/common/enums/request-method.enum");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const constants_1 = require("@nestjs/common/constants");
const metadata_scanner_1 = require("../metadata-scanner");
class RoutesMapper {
    constructor() {
        this.routerExplorer = new router_explorer_1.ExpressRouterExplorer(new metadata_scanner_1.MetadataScanner());
    }
    mapRouteToRouteProps(routeMetatype) {
        const routePath = Reflect.getMetadata(constants_1.PATH_METADATA, routeMetatype);
        if (shared_utils_1.isUndefined(routePath)) {
            return [this.mapObjectToRouteProps(routeMetatype)];
        }
        const paths = this.routerExplorer.scanForPaths(Object.create(routeMetatype), routeMetatype.prototype);
        return paths.map((route) => ({
            path: this.validateGlobalPath(routePath) + this.validateRoutePath(route.path),
            method: route.requestMethod,
        }));
    }
    mapObjectToRouteProps(route) {
        const { path, method } = route;
        if (shared_utils_1.isUndefined(path)) {
            throw new unknown_request_mapping_exception_1.UnknownRequestMappingException();
        }
        return {
            path: this.validateRoutePath(path),
            method: shared_utils_1.isUndefined(method) ? request_method_enum_1.RequestMethod.ALL : method,
        };
    }
    validateGlobalPath(path) {
        const prefix = shared_utils_1.validatePath(path);
        return prefix === '/' ? '' : prefix;
    }
    validateRoutePath(path) {
        return shared_utils_1.validatePath(path);
    }
}
exports.RoutesMapper = RoutesMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLW1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL21pZGRsZXdhcmVzL3JvdXRlcy1tYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBMEI7QUFDMUIsK0RBQWtFO0FBQ2xFLDhHQUF3RztBQUN4RyxrRkFBeUU7QUFDekUsb0VBQThFO0FBQzlFLHdEQUF5RDtBQUN6RCwwREFBc0Q7QUFFdEQ7SUFBQTtRQUNxQixtQkFBYyxHQUFHLElBQUksdUNBQXFCLENBQUMsSUFBSSxrQ0FBZSxFQUFFLENBQUMsQ0FBQztJQWlDdkYsQ0FBQztJQS9CVSxvQkFBb0IsQ0FBQyxhQUFhO1FBQ3JDLE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxXQUFXLENBQUMseUJBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1RSxFQUFFLENBQUMsQ0FBQywwQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM3RSxNQUFNLEVBQUUsS0FBSyxDQUFDLGFBQWE7U0FDOUIsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBSztRQUMvQixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQywwQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLElBQUksa0VBQThCLEVBQUUsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsTUFBTSxDQUFDO1lBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDbEMsTUFBTSxFQUFFLDBCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNO1NBQzNELENBQUM7SUFDTixDQUFDO0lBRU8sa0JBQWtCLENBQUMsSUFBWTtRQUNuQyxNQUFNLE1BQU0sR0FBRywyQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN4QyxDQUFDO0lBRU8saUJBQWlCLENBQUMsSUFBWTtRQUNsQyxNQUFNLENBQUMsMkJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFsQ0Qsb0NBa0NDIn0=