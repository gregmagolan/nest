"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_paramtypes_enum_1 = require("@nestjs/common/enums/route-paramtypes.enum");
class ParamsTokenFactory {
    exchangeEnumForString(type) {
        switch (type) {
            case route_paramtypes_enum_1.RouteParamtypes.BODY: return 'body';
            case route_paramtypes_enum_1.RouteParamtypes.PARAM: return 'param';
            case route_paramtypes_enum_1.RouteParamtypes.QUERY: return 'query';
            default: return null;
        }
    }
}
exports.ParamsTokenFactory = ParamsTokenFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1zLXRva2VuLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9waXBlcy9wYXJhbXMtdG9rZW4tZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNGQUE2RTtBQUc3RTtJQUNXLHFCQUFxQixDQUFDLElBQXFCO1FBQzlDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWCxLQUFLLHVDQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDekMsS0FBSyx1Q0FBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzNDLEtBQUssdUNBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUMzQyxTQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQVRELGdEQVNDIn0=