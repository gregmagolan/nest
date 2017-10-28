"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const module_1 = require("./module");
const unknown_module_exception_1 = require("../errors/exceptions/unknown-module.exception");
const module_token_factory_1 = require("./module-token-factory");
const invalid_module_exception_1 = require("./../errors/exceptions/invalid-module.exception");
class NestContainer {
    constructor() {
        this.modules = new Map();
        this.moduleTokenFactory = new module_token_factory_1.ModuleTokenFactory();
    }
    addModule(metatype, scope) {
        if (!metatype) {
            throw new invalid_module_exception_1.InvalidModuleException(scope);
        }
        const token = this.moduleTokenFactory.create(metatype, scope);
        if (this.modules.has(token)) {
            return;
        }
        this.modules.set(token, new module_1.Module(metatype, scope));
    }
    getModules() {
        return this.modules;
    }
    addRelatedModule(relatedModule, token) {
        if (!this.modules.has(token))
            return;
        const module = this.modules.get(token);
        const parent = module.metatype;
        const relatedModuleToken = this.moduleTokenFactory.create(relatedModule, [].concat(module.scope, parent));
        const related = this.modules.get(relatedModuleToken);
        module.addRelatedModule(related);
    }
    addComponent(component, token) {
        if (!this.modules.has(token)) {
            throw new unknown_module_exception_1.UnknownModuleException();
        }
        const module = this.modules.get(token);
        module.addComponent(component);
    }
    addInjectable(injectable, token) {
        if (!this.modules.has(token)) {
            throw new unknown_module_exception_1.UnknownModuleException();
        }
        const module = this.modules.get(token);
        module.addInjectable(injectable);
    }
    addExportedComponent(exportedComponent, token) {
        if (!this.modules.has(token)) {
            throw new unknown_module_exception_1.UnknownModuleException();
        }
        const module = this.modules.get(token);
        module.addExportedComponent(exportedComponent);
    }
    addController(controller, token) {
        if (!this.modules.has(token)) {
            throw new unknown_module_exception_1.UnknownModuleException();
        }
        const module = this.modules.get(token);
        module.addRoute(controller);
    }
    clear() {
        this.modules.clear();
    }
    replace(toReplace, options) {
        [...this.modules.values()].forEach((module) => {
            module.replace(toReplace, options);
        });
    }
}
exports.NestContainer = NestContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvaW5qZWN0b3IvY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTBCO0FBTTFCLHFDQUFrQztBQUNsQyw0RkFBdUY7QUFDdkYsaUVBQTREO0FBQzVELDhGQUF5RjtBQUV6RjtJQUFBO1FBQ3FCLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUNwQyx1QkFBa0IsR0FBRyxJQUFJLHlDQUFrQixFQUFFLENBQUM7SUF5RW5FLENBQUM7SUF2RVUsU0FBUyxDQUFDLFFBQTRCLEVBQUUsS0FBMkI7UUFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxJQUFJLGlEQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sVUFBVTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxhQUFpQyxFQUFFLEtBQWE7UUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVyQyxNQUFNLE1BQU0sR0FB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