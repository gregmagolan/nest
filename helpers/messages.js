"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_method_enum_1 = require("@nestjs/common/enums/request-method.enum");
exports.ModuleInitMessage = (module) => `${module} dependencies initialized`;
exports.RouteMappedMessage = (path, method) => `Mapped {${path}, ${request_method_enum_1.RequestMethod[method]}} route`;
exports.ControllerMappingMessage = (name) => `${name}:`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9oZWxwZXJzL21lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0ZBQXlFO0FBRTVELFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RSxRQUFBLGtCQUFrQixHQUFHLENBQUMsSUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsV0FBVyxJQUFJLEtBQUssbUNBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ2xHLFFBQUEsd0JBQXdCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMifQ==