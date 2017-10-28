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
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
class GuardsConsumer {
    tryActivate(guards, data, instance, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!guards || shared_utils_1.isEmpty(guards)) {
                return true;
            }
            const context = this.createContext(instance, callback);
            for (const guard of guards) {
                const result = guard.canActivate(data, context);
                if (yield this.pickResult(result)) {
                    continue;
                }
                return false;
            }
            return true;
        });
    }
    createContext(instance, callback) {
        return {
            parent: instance.constructor,
            handler: callback,
        };
    }
    pickResult(result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (result instanceof Observable_1.Observable) {
                return yield result.toPromise();
            }
            if (result instanceof Promise) {
                return yield result;
            }
            return result;
        });
    }
}
exports.GuardsConsumer = GuardsConsumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRzLWNvbnN1bWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvZ3VhcmRzL2d1YXJkcy1jb25zdW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsb0VBQTRGO0FBRzVGLGdEQUE2QztBQUc3Qyx1Q0FBcUM7QUFFckM7SUFDaUIsV0FBVyxDQUFDLE1BQXFCLEVBQUUsSUFBSSxFQUFFLFFBQW9CLEVBQUUsUUFBMEI7O1lBQ2xHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLHNCQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2RCxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsUUFBUSxDQUFDO2dCQUNiLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFTSxhQUFhLENBQUMsUUFBb0IsRUFBRSxRQUEwQjtRQUNqRSxNQUFNLENBQUM7WUFDSCxNQUFNLEVBQUUsUUFBUSxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLFFBQVE7U0FDcEIsQ0FBQztJQUNOLENBQUM7SUFFWSxVQUFVLENBQUMsTUFBd0Q7O1lBQzVFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSx1QkFBVSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLE1BQU0sTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLE1BQU0sTUFBTSxDQUFDO1lBQ3hCLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtDQUNKO0FBaENELHdDQWdDQyJ9