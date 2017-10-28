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
const params_token_factory_1 = require("./../pipes/params-token-factory");
class PipesConsumer {
    constructor() {
        this.paramsTokenFactory = new params_token_factory_1.ParamsTokenFactory();
    }
    apply(value, { metatype, type, data }, transforms) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.paramsTokenFactory.exchangeEnumForString(type);
            return yield this.applyPipes(value, { metatype, type: token, data }, transforms);
        });
    }
    applyPipes(value, { metatype, type, data }, transforms) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield transforms.reduce((defferedValue, fn) => __awaiter(this, void 0, void 0, function* () {
                const val = yield defferedValue;
                const result = fn(val, { metatype, type, data });
                if (result instanceof Promise) {
                    return result;
                }
                return Promise.resolve(result);
            }), Promise.resolve(value));
        });
    }
}
exports.PipesConsumer = PipesConsumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMtY29uc3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9waXBlcy9waXBlcy1jb25zdW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsMEVBQXFFO0FBRXJFO0lBQUE7UUFDcUIsdUJBQWtCLEdBQUcsSUFBSSx5Q0FBa0IsRUFBRSxDQUFDO0lBaUJuRSxDQUFDO0lBZmdCLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLFVBQTRCOztZQUM1RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNyRixDQUFDO0tBQUE7SUFFWSxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQThCLEVBQUUsVUFBNEI7O1lBQzdHLE1BQU0sQ0FBQyxNQUFNLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBTyxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUU7Z0JBQ3ZELE1BQU0sR0FBRyxHQUFHLE1BQU0sYUFBYSxDQUFDO2dCQUNoQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztLQUFBO0NBQ0o7QUFsQkQsc0NBa0JDIn0=