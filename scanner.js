"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("@nestjs/common/constants");
const constants_2 = require("@nestjs/websockets/constants");
class DependenciesScanner {
    constructor(container, metadataScanner) {
        this.container = container;
        this.metadataScanner = metadataScanner;
    }
    scan(module) {
        this.scanForModules(module);
        this.scanModulesForDependencies();
    }
    scanForModules(module, scope = []) {
        this.storeModule(module, scope);
        const importedModules = this.reflectMetadata(module, constants_1.metadata.MODULES);
        importedModules.map((innerModule) => {
            this.scanForModules(innerModule, [].concat(scope, module));
        });
    }
    storeModule(module, scope) {
        if (module && module.forwardRef) {
            return this.container.addModule(module.forwardRef(), scope);
        }
        this.container.addModule(module, scope);
    }
    scanModulesForDependencies() {
        const modules = this.container.getModules();
        modules.forEach(({ metatype }, token) => {
            this.reflectRelatedModules(metatype, token);
            this.reflectComponents(metatype, token);
            this.reflectControllers(metatype, token);
            this.reflectExports(metatype, token);
        });
    }
    reflectRelatedModules(module, token) {
        const modules = this.reflectMetadata(module, constants_1.metadata.MODULES);
        modules.map((related) => this.storeRelatedModule(related, token));
    }
    reflectComponents(module, token) {
        const components = this.reflectMetadata(module, constants_1.metadata.COMPONENTS);
        components.map((component) => {
            this.storeComponent(component, token);
            this.reflectComponentMetadata(component, token);
            this.reflectDynamicMetadata(component, token);
        });
    }
    reflectComponentMetadata(component, token) {
        this.reflectGatewaysMiddlewares(component, token);
    }
    reflectControllers(module, token) {
        const routes = this.reflectMetadata(module, constants_1.metadata.CONTROLLERS);
        routes.map((route) => {
            this.storeRoute(route, token);
            this.reflectDynamicMetadata(route, token);
        });
    }
    reflectDynamicMetadata(obj, token) {
        if (!obj.prototype) {
            return;
        }
        this.reflectGuards(obj, token);
        this.reflectInterceptors(obj, token);
    }
    reflectExports(module, token) {
        const exports = this.reflectMetadata(module, constants_1.metadata.EXPORTS);
        exports.map((exportedComponent) => this.storeExportedComponent(exportedComponent, token));
    }
    reflectGatewaysMiddlewares(component, token) {
        const middlewares = this.reflectMetadata(component, constants_2.GATEWAY_MIDDLEWARES);
        middlewares.map((middleware) => this.storeComponent(middleware, token));
    }
    reflectGuards(component, token) {
        const controllerGuards = this.reflectMetadata(component, constants_1.GUARDS_METADATA);
        const methodsGuards = this.metadataScanner.scanFromPrototype(null, component.prototype, this.reflectKeyMetadata.bind(this, component, constants_1.GUARDS_METADATA));
        const flattenMethodsGuards = methodsGuards.reduce((a, b) => a.concat(b), []);
        [...controllerGuards, ...flattenMethodsGuards].map((guard) => this.storeInjectable(guard, token));
    }
    reflectInterceptors(component, token) {
        const controllerInterceptors = this.reflectMetadata(component, constants_1.INTERCEPTORS_METADATA);
        const methodsInterceptors = this.metadataScanner.scanFromPrototype(null, component.prototype, this.reflectKeyMetadata.bind(this, component, constants_1.INTERCEPTORS_METADATA));
        const flattenMethodsInterceptors = methodsInterceptors.reduce((a, b) => a.concat(b), []);
        [...controllerInterceptors, ...flattenMethodsInterceptors].map((guard) => this.storeInjectable(guard, token));
    }
    reflectKeyMetadata(component, key, method) {
        const descriptor = Reflect.getOwnPropertyDescriptor(component.prototype, method);
        return descriptor ? Reflect.getMetadata(key, descriptor.value) : undefined;
    }
    storeRelatedModule(related, token) {
        if (related.forwardRef) {
            return this.container.addRelatedModule(related.forwardRef(), token);
        }
        this.container.addRelatedModule(related, token);
    }
    storeComponent(component, token) {
        this.container.addComponent(component, token);
    }
    storeInjectable(component, token) {
        this.container.addInjectable(component, token);
    }
    storeExportedComponent(exportedComponent, token) {
        this.container.addExportedComponent(exportedComponent, token);
    }
    storeRoute(route, token) {
        this.container.addController(route, token);
    }
    reflectMetadata(metatype, metadata) {
        return Reflect.getMetadata(metadata, metatype) || [];
    }
}
exports.DependenciesScanner = DependenciesScanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL3NjYW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBMEI7QUFJMUIsd0RBQXdIO0FBR3hILDREQUFtRTtBQUduRTtJQUNJLFlBQ3FCLFNBQXdCLEVBQ3hCLGVBQWdDO1FBRGhDLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQUcsQ0FBQztJQUVsRCxJQUFJLENBQUMsTUFBMEI7UUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU0sY0FBYyxDQUFDLE1BQTBCLEVBQUUsUUFBOEIsRUFBRTtRQUM5RSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVoQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxvQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFXLEVBQUUsS0FBMkI7UUFDdkQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMs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