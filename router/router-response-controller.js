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
const Observable_1 = require("rxjs/Observable");
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
require("rxjs/add/operator/toPromise");
class RouterResponseController {
    apply(resultOrDeffered, response, requestMethod, httpCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.transformToResult(resultOrDeffered);
            const statusCode = httpCode ? httpCode : this.getStatusByMethod(requestMethod);
            const res = response.status(statusCode);
            if (shared_utils_1.isNil(result)) {
                return res.send();
            }
            return shared_utils_1.isObject(result) ? res.json(result) : res.send(String(result));
        });
    }
    transformToResult(resultOrDeffered) {
        return __awaiter(this, void 0, void 0, function* () {
            if (resultOrDeffered instanceof Promise) {
                return yield resultOrDeffered;
            }
            else if (resultOrDeffered instanceof Observable_1.Observable) {
                return yield resultOrDeffered.toPromise();
            }
            return resultOrDeffered;
        });
    }
    getStatusByMethod(requestMethod) {
        switch (requestMethod) {
            case common_1.RequestMethod.POST: return common_1.HttpStatus.CREATED;
            default: return common_1.HttpStatus.OK;
        }
    }
}
exports.RouterResponseController = RouterResponseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLXJlc3BvbnNlLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9yb3V0ZXIvcm91dGVyLXJlc3BvbnNlLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGdEQUE2QztBQUM3QywyQ0FBMkQ7QUFDM0Qsb0VBQW9FO0FBQ3BFLHVDQUFxQztBQUVyQztJQUNlLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsYUFBNEIsRUFBRSxRQUFnQjs7WUFDM0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5RCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEMsRUFBRSxDQUFDLENBQUMsb0JBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsQ0FBQztZQUNELE1BQU0sQ0FBQyx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7S0FBQTtJQUVZLGlCQUFpQixDQUFDLGdCQUFnQjs7WUFDN0MsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLENBQUM7WUFDaEMsQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsWUFBWSx1QkFBVSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDNUMsQ0FBQztZQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFTSxpQkFBaUIsQ0FBQyxhQUE0QjtRQUNuRCxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUssc0JBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLG1CQUFVLENBQUMsT0FBTyxDQUFDO1lBQ25ELFNBQVMsTUFBTSxDQUFDLG1CQUFVLENBQUMsRUFBRSxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUEzQkQsNERBMkJDIn0=