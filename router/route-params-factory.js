"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_paramtypes_enum_1 = require("@nestjs/common/enums/route-paramtypes.enum");
class RouteParamsFactory {
    exchangeKeyForValue(key, data, { req, res, next }) {
        switch (key) {
            case route_paramtypes_enum_1.RouteParamtypes.NEXT: return next;
            case route_paramtypes_enum_1.RouteParamtypes.REQUEST: return req;
            case route_paramtypes_enum_1.RouteParamtypes.RESPONSE: return res;
            case route_paramtypes_enum_1.RouteParamtypes.BODY: return data && req.body ? req.body[data] : req.body;
            case route_paramtypes_enum_1.RouteParamtypes.PARAM: return data ? req.params[data] : req.params;
            case route_paramtypes_enum_1.RouteParamtypes.QUERY: return data ? req.query[data] : req.query;
            case route_paramtypes_enum_1.RouteParamtypes.HEADERS: return data ? req.headers[data] : req.headers;
            case route_paramtypes_enum_1.RouteParamtypes.SESSION: return req.session;
            default: return null;
        }
    }
}
exports.RouteParamsFactory = RouteParamsFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtcGFyYW1zLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9yb3V0ZXIvcm91dGUtcGFyYW1zLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzRkFBNkU7QUFHN0U7SUFDVyxtQkFBbUIsQ0FBQyxHQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO1FBQ3JFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixLQUFLLHVDQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDdkMsS0FBSyx1Q0FBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ3pDLEtBQUssdUNBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUMxQyxLQUFLLHVDQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUMvRSxLQUFLLHVDQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDeEUsS0FBSyx1Q0FBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3RFLEtBQUssdUNBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUM1RSxLQUFLLHVDQUFlLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ2pELFNBQVMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBZEQsZ0RBY0MifQ==