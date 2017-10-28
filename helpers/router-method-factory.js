"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_method_enum_1 = require("@nestjs/common/enums/request-method.enum");
class RouterMethodFactory {
    get(target, requestMethod) {
        switch (requestMethod) {
            case request_method_enum_1.RequestMethod.POST: return target.post;
            case request_method_enum_1.RequestMethod.ALL: return target.all;
            case request_method_enum_1.RequestMethod.DELETE: return target.delete;
            case request_method_enum_1.RequestMethod.PUT: return target.put;
            case request_method_enum_1.RequestMethod.PATCH: return target.patch;
            case request_method_enum_1.RequestMethod.OPTIONS: return target.options;
            case request_method_enum_1.RequestMethod.HEAD: return target.head;
            default: {
                return target.get;
            }
        }
    }
}
exports.RouterMethodFactory = RouterMethodFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLW1ldGhvZC1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvaGVscGVycy9yb3V0ZXItbWV0aG9kLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrRkFBeUU7QUFFekU7SUFDVyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQTRCO1FBQzNDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxtQ0FBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QyxLQUFLLG1DQUFhLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQzFDLEtBQUssbUNBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEQsS0FBSyxtQ0FBYSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUMxQyxLQUFLLG1DQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzlDLEtBQUssbUNBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDbEQsS0FBSyxtQ0FBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QyxTQUFTLENBQUM7Z0JBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDdEIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0NBQ0o7QUFmRCxrREFlQyJ9