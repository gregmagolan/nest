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
const injector_1 = require("../injector/injector");
class MiddlewaresResolver {
    constructor(middlewaresContainer) {
        this.middlewaresContainer = middlewaresContainer;
        this.instanceLoader = new injector_1.Injector();
    }
    resolveInstances(module, moduleName) {
        return __awaiter(this, void 0, void 0, function* () {
            const middlewares = this.middlewaresContainer.getMiddlewares(moduleName);
            yield Promise.all([...middlewares.values()].map((wrapper) => __awaiter(this, void 0, void 0, function* () { return yield this.resolveMiddlewareInstance(wrapper, middlewares, module); })));
        });
    }
    resolveMiddlewareInstance(wrapper, middlewares, module) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.instanceLoader.loadInstanceOfMiddleware(wrapper, middlewares, module);
        });
    }
}
exports.MiddlewaresResolver = MiddlewaresResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9taWRkbGV3YXJlcy9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsbURBQWdEO0FBR2hEO0lBR0ksWUFBNkIsb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFGdEQsbUJBQWMsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztJQUV5QixDQUFDO0lBRTlELGdCQUFnQixDQUFDLE1BQWMsRUFBRSxVQUFrQjs7WUFDNUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFLGdEQUM5RCxNQUFNLENBQU4sTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQSxHQUFBLENBQ3JFLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVhLHlCQUF5QixDQUNuQyxPQUEwQixFQUMxQixXQUEyQyxFQUMzQyxNQUFjOztZQUVkLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FDOUMsT0FBTyxFQUNQLFdBQVcsRUFDWCxNQUFNLENBQ1QsQ0FBQztRQUNOLENBQUM7S0FBQTtDQUVKO0FBeEJELGtEQXdCQyJ9