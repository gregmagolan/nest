"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("./http-exception");
const constants_1 = require("../constants");
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const invalid_exception_filter_exception_1 = require("../errors/exceptions/invalid-exception-filter.exception");
class ExceptionsHandler {
    constructor() {
        this.filters = [];
    }
    next(exception, response) {
        if (this.invokeCustomFilters(exception, response))
            return;
        if (!(exception instanceof http_exception_1.HttpException)) {
            response.status(500).json({
                statusCode: 500,
                message: constants_1.messages.UNKNOWN_EXCEPTION_MESSAGE,
            });
            if (shared_utils_1.isObject(exception) && exception.message) {
                return ExceptionsHandler.logger.error(exception.message, exception.stack);
            }
            return ExceptionsHandler.logger.error(exception);
        }
        const res = exception.getResponse();
        const message = shared_utils_1.isObject(res) ? res : ({
            statusCode: exception.getStatus(),
            message: res,
        });
        response.status(exception.getStatus()).json(message);
    }
    setCustomFilters(filters) {
        if (!Array.isArray(filters)) {
            throw new invalid_exception_filter_exception_1.InvalidExceptionFilterException();
        }
        this.filters = filters;
    }
    invokeCustomFilters(exception, response) {
        if (shared_utils_1.isEmpty(this.filters))
            return false;
        const filter = this.filters.find(({ exceptionMetatypes, func }) => {
            const hasMetatype = !!exceptionMetatypes.find(ExceptionMetatype => exception instanceof ExceptionMetatype);
            return hasMetatype;
        });
        filter && filter.func(exception, response);
        return !!filter;
    }
}
ExceptionsHandler.logger = new common_1.Logger(ExceptionsHandler.name);
exports.ExceptionsHandler = ExceptionsHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvZXhjZXB0aW9ucy9leGNlcHRpb25zLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUQ7QUFDakQsNENBQXdDO0FBQ3hDLDJDQUF3QztBQUV4QyxvRUFBc0U7QUFDdEUsZ0hBQTBHO0FBRTFHO0lBQUE7UUFFWSxZQUFPLEdBQThCLEVBQUUsQ0FBQztJQTBDcEQsQ0FBQztJQXhDVSxJQUFJLENBQUMsU0FBc0MsRUFBRSxRQUFRO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFMUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsWUFBWSw4QkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN0QixVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUUsb0JBQVEsQ0FBQyx5QkFBeUI7YUFDOUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsdUJBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSyxTQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLFNBQW1CLENBQUMsT0FBTyxFQUFHLFNBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEcsQ0FBQztZQUNELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsTUFBTSxPQUFPLEdBQUcsdUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLFVBQVUsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxHQUFHO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLGdCQUFnQixDQUFDLE9BQWtDO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLG9FQUErQixFQUFFLENBQUM7UUFDaEQsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsUUFBUTtRQUMxQyxFQUFFLENBQUMsQ0FBQyxzQkFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFFeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FDekMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFNBQVMsWUFBWSxpQkFBaUIsQ0FDOUQsQ0FBQztZQUNGLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEIsQ0FBQzs7QUExQ3VCLHdCQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFEeEUsOENBNENDIn0=