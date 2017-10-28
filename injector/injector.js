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
require("reflect-metadata");
const unknown_dependencies_exception_1 = require("../errors/exceptions/unknown-dependencies.exception");
const runtime_exception_1 = require("../errors/exceptions/runtime.exception");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const constants_1 = require("@nestjs/common/constants");
const undefined_dependency_exception_1 = require("./../errors/exceptions/undefined-dependency.exception");
class Injector {
    loadInstanceOfMiddleware(wrapper, collection, module) {
        return __awaiter(this, void 0, void 0, function* () {
            const { metatype } = wrapper;
            const currentMetatype = collection.get(metatype.name);
            if (currentMetatype.instance !== null)
                return;
            yield this.resolveConstructorParams(wrapper, module, null, null, (instances) => {
                collection.set(metatype.name, {
                    instance: new metatype(...instances),
                    metatype,
                });
            });
        });
    }
    loadInstanceOfRoute(wrapper, module) {
        return __awaiter(this, void 0, void 0, function* () {
            const routes = module.routes;
            yield this.loadInstance(wrapper, routes, module);
        });
    }
    loadInstanceOfInjectable(wrapper, module) {
        return __awaiter(this, void 0, void 0, function* () {
            const injectables = module.injectables;
            yield this.loadInstance(wrapper, injectables, module);
        });
    }
    loadPrototypeOfInstance({ metatype, name }, collection) {
        if (!collection)
            return;
        const target = collection.get(name);
        if (target.isResolved || !shared_utils_1.isNil(target.inject))
            return;
        collection.set(name, Object.assign({}, collection.get(name), { instance: Object.create(metatype.prototype) }));
    }
    loadInstanceOfComponent(wrapper, module, context = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const components = module.components;
            yield this.loadInstance(wrapper, components, module, context);
        });
    }
    applyDoneSubject(wrapper) {
        let done;
        wrapper.done$ = new Promise((resolve, reject) => { done = resolve; });
        wrapper.isPending = true;
        return done;
    }
    loadInstance(wrapper, collection, module, context = []) {
        return __awaiter(this, void 0, void 0, function* () {
            if (wrapper.isPending) {
                return yield wrapper.done$;
            }
            const done = this.applyDoneSubject(wrapper);
            const { metatype, name, inject } = wrapper;
            const currentMetatype = collection.get(name);
            if (shared_utils_1.isUndefined(currentMetatype)) {
                throw new runtime_exception_1.RuntimeException();
            }
            if (currentMetatype.isResolved)
                return;
            yield this.resolveConstructorParams(wrapper, module, inject, context, (instances) => __awaiter(this, void 0, void 0, function* () {
                if (shared_utils_1.isNil(inject)) {
                    currentMetatype.instance = Object.assign(currentMetatype.instance, new metatype(...instances));
                }
                else {
                    const factoryResult = currentMetatype.metatype(...instances);
                    currentMetatype.instance = yield this.resolveFactoryInstance(factoryResult);
                }
                currentMetatype.isResolved = true;
                done();
            }));
        });
    }
    resolveConstructorParams(wrapper, module, inject, context, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let isResolved = true;
            const args = shared_utils_1.isNil(inject) ? this.reflectConstructorParams(wrapper.metatype) : inject;
            const instances = yield Promise.all(args.map((param) => __awaiter(this, void 0, void 0, function* () {
                const paramWrapper = yield this.resolveSingleParam(wrapper, param, module, context);
                if (!paramWrapper.isResolved && !paramWrapper.forwardRef) {
                    isResolved = false;
                }
                return paramWrapper.instance;
            })));
            isResolved && (yield callback(instances));
        });
    }
    reflectConstructorParams(type) {
        const paramtypes = Reflect.getMetadata(constants_1.PARAMTYPES_METADATA, type) || [];
        const selfParams = this.reflectSelfParams(type);
        selfParams.forEach(({ index, param }) => paramtypes[index] = param);
        return paramtypes;
    }
    reflectSelfParams(type) {
        return Reflect.getMetadata(constants_1.SELF_DECLARED_DEPS_METADATA, type) || [];
    }
    resolveSingleParam(wrapper, param, module, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (shared_utils_1.isUndefined(param)) {
                throw new undefined_dependency_exception_1.UndefinedDependencyException(wrapper.name);
            }
            const token = this.resolveParamToken(wrapper, param);
            return yield this.resolveComponentInstance(module, shared_utils_1.isFunction(token) ? token.name : token, wrapper, context);
        });
    }
    resolveParamToken(wrapper, param) {
        if (!param.forwardRef) {
            return param;
        }
        wrapper.forwardRef = true;
        return param.forwardRef();
    }
    resolveComponentInstance(module, name, wrapper, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const components = module.components;
            const instanceWrapper = yield this.scanForComponent(components, name, module, wrapper, context);
            if (!instanceWrapper.isResolved && !instanceWrapper.forwardRef) {
                yield this.loadInstanceOfComponent(instanceWrapper, module);
            }
            if (instanceWrapper.async) {
                instanceWrapper.instance = yield instanceWrapper.instance;
            }
            return instanceWrapper;
        });
    }
    scanForComponent(components, name, module, { metatype }, context = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const component = yield this.scanForComponentInScopes(context, name, metatype);
            if (component) {
                return component;
            }
            const scanInExports = () => this.scanForComponentInExports(components, name, module, metatype, context);
            return components.has(name) ? components.get(name) : yield scanInExports();
        });
    }
    scanForComponentInExports(components, name, module, metatype, context = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const instanceWrapper = yield this.scanForComponentInRelatedModules(module, name, context);
            if (shared_utils_1.isNil(instanceWrapper)) {
                throw new unknown_dependencies_exception_1.UnknownDependenciesException(metatype.name);
            }
            return instanceWrapper;
        });
    }
    scanForComponentInScopes(context, name, metatype) {
        return __awaiter(this, void 0, void 0, function* () {
            context = context || [];
            for (const ctx of context) {
                const component = yield this.scanForComponentInScope(ctx, name, metatype);
                if (component)
                    return component;
            }
            return null;
        });
    }
    scanForComponentInScope(context, name, metatype) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const component = yield this.scanForComponent(context.components, name, context, { metatype }, null);
                if (!component.isResolved && !component.forwardRef) {
                    yield this.loadInstanceOfComponent(component, context);
                }
                return component;
            }
            catch (e) {
                if (e instanceof undefined_dependency_exception_1.UndefinedDependencyException) {
                    throw e;
                }
                return null;
            }
        });
    }
    scanForComponentInRelatedModules(module, name, context) {
        return __awaiter(this, void 0, void 0, function* () {
            let component = null;
            const relatedModules = module.relatedModules || [];
            for (const relatedModule of this.flatMap([...relatedModules.values()])) {
                const { components, exports } = relatedModule;
                const isInScope = context === null;
                if ((!exports.has(name) && !isInScope) || !components.has(name)) {
                    continue;
                }
                component = components.get(name);
                if (!component.isResolved && !component.forwardRef) {
                    const ctx = isInScope ? [module] : [].concat(context, module);
                    yield this.loadInstanceOfComponent(component, relatedModule, ctx);
                    break;
                }
            }
            return component;
        });
    }
    resolveFactoryInstance(factoryResult) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(factoryResult instanceof Promise)) {
                return factoryResult;
            }
            const result = yield factoryResult;
            return result;
        });
    }
    flatMap(modules) {
        return modules.concat.apply(modules, modules.map((module) => {
            const { relatedModules, exports } = module;
            return this.flatMap([...relatedModules.values()].filter((related) => {
                const { metatype } = related;
                return exports.has(metatype.name);
            }));
        }));
    }
}
exports.Injector = Injector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9pbmplY3Rvci9pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNEJBQTBCO0FBRTFCLHdHQUFtRztBQUNuRyw4RUFBMEU7QUFNMUUsb0VBQW1GO0FBQ25GLHdEQUE0RjtBQUM1RiwwR0FBcUc7QUFFckc7SUFDZSx3QkFBd0IsQ0FDbkMsT0FBMEIsRUFDMUIsVUFBMEMsRUFDMUMsTUFBYzs7WUFFZCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQzdCLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUU5QyxNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDcEYsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUM1QixRQUFRLEVBQUUsSUFBSSxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUM7b0JBQ3BDLFFBQVE7aUJBQ1QsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFWSxtQkFBbUIsQ0FBQyxPQUFvQyxFQUFFLE1BQWM7O1lBQ25GLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDN0IsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFhLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRVksd0JBQXdCLENBQUMsT0FBb0MsRUFBRSxNQUFjOztZQUN4RixNQUFNLFdBQVcsR0FB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