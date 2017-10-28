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
require("rxjs/add/observable/defer");
require("rxjs/add/operator/take");
class InterceptorsConsumer {
    intercept(interceptors, dataOrRequest, instance, callback, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interceptors || shared_utils_1.isEmpty(interceptors)) {
                return yield next();
            }
            const context = this.createContext(instance, callback);
            const start$ = Observable_1.Observable.defer(() => this.transformDeffered(next));
            const result$ = yield interceptors.reduce((stream$, interceptor) => __awaiter(this, void 0, void 0, function* () { return yield interceptor.intercept(dataOrRequest, context, yield stream$); }), Promise.resolve(start$));
            return yield result$.toPromise();
        });
    }
    createContext(instance, callback) {
        return {
            parent: instance.constructor,
            handler: callback,
        };
    }
    transformDeffered(next) {
        const res = next();
        const isDeffered = res instanceof Promise || res instanceof Observable_1.Observable;
        return isDeffered ? res : Promise.resolve(res);
    }
}
exports.InterceptorsConsumer = InterceptorsConsumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3JzLWNvbnN1bWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvaW50ZXJjZXB0b3JzL2ludGVyY2VwdG9ycy1jb25zdW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsb0VBQTRGO0FBRzVGLGdEQUE2QztBQUU3Qyx1Q0FBcUM7QUFDckMscUNBQW1DO0FBQ25DLGtDQUFnQztBQUVoQztJQUNpQixTQUFTLENBQ3BCLFlBQStCLEVBQy9CLGFBQWtCLEVBQ2xCLFFBQW9CLEVBQ3BCLFFBQTBCLEVBQzFCLElBQXdCOztZQUV0QixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxzQkFBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDeEIsQ0FBQztZQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sTUFBTSxHQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FDdkMsQ0FBTyxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsZ0RBQUMsTUFBTSxDQUFOLE1BQU0sV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sT0FBTyxDQUFDLENBQUEsR0FBQSxFQUNsRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUN4QixDQUFDO1lBQ0YsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVNLGFBQWEsQ0FBQyxRQUFvQixFQUFFLFFBQTBCO1FBQ2pFLE1BQU0sQ0FBQztZQUNILE1BQU0sRUFBRSxRQUFRLENBQUMsV0FBVztZQUM1QixPQUFPLEVBQUUsUUFBUTtTQUNwQixDQUFDO0lBQ04sQ0FBQztJQUVNLGlCQUFpQixDQUFDLElBQWU7UUFDdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDbkIsTUFBTSxVQUFVLEdBQUcsR0FBRyxZQUFZLE9BQU8sSUFBSSxHQUFHLFlBQVksdUJBQVUsQ0FBQztRQUN2RSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKO0FBaENELG9EQWdDQyJ9