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
const injector_1 = require("./injector");
const common_1 = require("@nestjs/common");
const messages_1 = require("../helpers/messages");
class InstanceLoader {
    constructor(container) {
        this.container = container;
        this.injector = new injector_1.Injector();
        this.logger = new common_1.Logger(InstanceLoader.name, true);
    }
    createInstancesOfDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = this.container.getModules();
            this.createPrototypes(modules);
            yield this.createInstances(modules);
        });
    }
    createPrototypes(modules) {
        modules.forEach((module) => {
            this.createPrototypesOfComponents(module);
            this.createPrototypesOfInjectables(module);
            this.createPrototypesOfRoutes(module);
        });
    }
    createInstances(modules) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const module of [...modules.values()]) {
                yield this.createInstancesOfComponents(module);
                yield this.createInstancesOfInjectables(module);
                yield this.createInstancesOfRoutes(module);
                const { name } = module.metatype;
                this.logger.log(messages_1.ModuleInitMessage(name));
            }
        });
    }
    createPrototypesOfComponents(module) {
        module.components.forEach((wrapper) => {
            this.injector.loadPrototypeOfInstance(wrapper, module.components);
        });
    }
    createInstancesOfComponents(module) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const [key, wrapper] of module.components) {
                yield this.injector.loadInstanceOfComponent(wrapper, module);
            }
        });
    }
    createPrototypesOfRoutes(module) {
        module.routes.forEach((wrapper) => {
            this.injector.loadPrototypeOfInstance(wrapper, module.routes);
        });
    }
    createInstancesOfRoutes(module) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([...module.routes.values()].map((wrapper) => __awaiter(this, void 0, void 0, function* () { return yield this.injector.loadInstanceOfRoute(wrapper, module); })));
        });
    }
    createPrototypesOfInjectables(module) {
        module.injectables.forEach((wrapper) => {
            this.injector.loadPrototypeOfInstance(wrapper, module.injectables);
        });
    }
    createInstancesOfInjectables(module) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([...module.injectables.values()].map((wrapper) => __awaiter(this, void 0, void 0, function* () { return yield this.injector.loadInstanceOfInjectable(wrapper, module); })));
        });
    }
}
exports.InstanceLoader = InstanceLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvaW5qZWN0b3IvaW5zdGFuY2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSx5Q0FBc0M7QUFJdEMsMkNBQXNEO0FBQ3RELGtEQUF3RDtBQUd4RDtJQUlJLFlBQTZCLFNBQXdCO1FBQXhCLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFIcEMsYUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQzFCLFdBQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRVIsQ0FBQztJQUU1Qyw2QkFBNkI7O1lBQ3RDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFTyxnQkFBZ0IsQ0FBQyxPQUE0QjtRQUNqRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRWEsZUFBZSxDQUFDLE9BQTRCOztZQUN0RCxHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFN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