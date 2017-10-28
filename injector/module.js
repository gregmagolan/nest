"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_ref_1 = require("./module-ref");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const runtime_exception_1 = require("../errors/exceptions/runtime.exception");
const reflector_service_1 = require("../services/reflector.service");
class Module {
    constructor(_metatype, _scope) {
        this._metatype = _metatype;
        this._scope = _scope;
        this._relatedModules = new Set();
        this._components = new Map();
        this._injectables = new Map();
        this._routes = new Map();
        this._exports = new Set();
        this.addCoreInjectables();
    }
    get scope() {
        return this._scope;
    }
    get relatedModules() {
        return this._relatedModules;
    }
    get components() {
        return this._components;
    }
    get injectables() {
        return this._injectables;
    }
    get routes() {
        return this._routes;
    }
    get exports() {
        return this._exports;
    }
    get instance() {
        if (!this._components.has(this._metatype.name)) {
            throw new runtime_exception_1.RuntimeException();
        }
        const module = this._components.get(this._metatype.name);
        return module.instance;
    }
    get metatype() {
        return this._metatype;
    }
    addCoreInjectables() {
        this.addModuleRef();
        this.addModuleAsComponent();
        this.addReflector();
    }
    addModuleRef() {
        const moduleRef = this.createModuleRefMetatype(this._components);
        this._components.set(module_ref_1.ModuleRef.name, {
            name: module_ref_1.ModuleRef.name,
            metatype: module_ref_1.ModuleRef,
            isResolved: true,
            instance: new moduleRef(),
        });
    }
    addModuleAsComponent() {
        this._components.set(this._metatype.name, {
            name: this._metatype.name,
            metatype: this._metatype,
            isResolved: false,
            instance: null,
        });
    }
    addReflector() {
        this._components.set(reflector_service_1.Reflector.name, {
            name: reflector_service_1.Reflector.name,
            metatype: reflector_service_1.Reflector,
            isResolved: false,
            instance: null,
        });
    }
    addInjectable(injectable) {
        if (this.isCustomProvider(injectable)) {
            return this.addCustomProvider(injectable, this._injectables);
        }
        this._injectables.set(injectable.name, {
            name: injectable.name,
            metatype: injectable,
            instance: null,
            isResolved: false,
        });
    }
    addComponent(component) {
        if (this.isCustomProvider(component)) {
            this.addCustomProvider(component, this._components);
            return;
        }
        this._components.set(component.name, {
            name: component.name,
            metatype: component,
            instance: null,
            isResolved: false,
        });
    }
    isCustomProvider(component) {
        return !shared_utils_1.isNil(component.provide);
    }
    addCustomProvider(component, collection) {
        const { provide } = component;
        const name = shared_utils_1.isFunction(provide) ? provide.name : provide;
        const comp = Object.assign({}, component, { name });
        if (this.isCustomClass(comp))
            this.addCustomClass(comp, collection);
        else if (this.isCustomValue(comp))
            this.addCustomValue(comp, collection);
        else if (this.isCustomFactory(comp))
            this.addCustomFactory(comp, collection);
    }
    isCustomClass(component) {
        return !shared_utils_1.isUndefined(component.useClass);
    }
    isCustomValue(component) {
        return !shared_utils_1.isUndefined(component.useValue);
    }
    isCustomFactory(component) {
        return !shared_utils_1.isUndefined(component.useFactory);
    }
    addCustomClass(component, collection) {
        const { provide, name, useClass } = component;
        collection.set(name, {
            name,
            metatype: useClass,
            instance: null,
            isResolved: false,
        });
    }
    addCustomValue(component, collection) {
        const { provide, name, useValue: value } = component;
        collection.set(name, {
            name,
            metatype: null,
            instance: value,
            isResolved: true,
            isNotMetatype: true,
            async: value instanceof Promise,
        });
    }
    addCustomFactory(component, collection) {
        const { provide, name, useFactory: factory, inject } = component;
        collection.set(name, {
            name,
            metatype: factory,
            instance: null,
            isResolved: false,
            inject: inject || [],
            isNotMetatype: true,
        });
    }
    addExportedComponent(exportedComponent) {
        if (this.isCustomProvider(exportedComponent)) {
            return this.addCustomExportedComponent(exportedComponent);
        }
        this._exports.add(exportedComponent.name);
    }
    addCustomExportedComponent(exportedComponent) {
        this._exports.add(exportedComponent.provide);
    }
    addRoute(route) {
        this._routes.set(route.name, {
            name: route.name,
            metatype: route,
            instance: null,
            isResolved: false,
        });
    }
    addRelatedModule(relatedModule) {
        this._relatedModules.add(relatedModule);
    }
    replace(toReplace, options) {
        if (options.isComponent) {
            return this.addComponent(Object.assign({ provide: toReplace }, options));
        }
        this.addInjectable(Object.assign({ provide: toReplace }, options));
    }
    createModuleRefMetatype(components) {
        return class {
            constructor() {
                this.components = components;
            }
            get(type) {
                const name = shared_utils_1.isFunction(type) ? type.name : type;
                const exists = this.components.has(name);
                return exists ? this.components.get(name).instance : null;
            }
        };
    }
}
exports.Module = Module;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvaW5qZWN0b3IvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsNkNBQXlDO0FBQ3pDLG9FQUFtRjtBQUNuRiw4RUFBMEU7QUFDMUUscUVBQTBEO0FBWTFEO0lBT0ksWUFDWSxTQUE2QixFQUM3QixNQUE0QjtRQUQ1QixjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUM3QixXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQVJoQyxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztRQUMxRCxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUFvQyxDQUFDO1FBQzNELFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBdUMsQ0FBQztRQUN6RCxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQU1qQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksY0FBYztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJ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