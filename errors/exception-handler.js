"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_exception_1 = require("./exceptions/runtime.exception");
const logger_service_1 = require("@nestjs/common/services/logger.service");
class ExceptionHandler {
    handle(exception) {
        if (!(exception instanceof runtime_exception_1.RuntimeException)) {
            ExceptionHandler.logger.error(exception.message, exception.stack);
            return;
        }
        ExceptionHandler.logger.error(exception.what(), exception.stack);
    }
}
ExceptionHandler.logger = new logger_service_1.Logger(ExceptionHandler.name);
exports.ExceptionHandler = ExceptionHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9lcnJvcnMvZXhjZXB0aW9uLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzRUFBa0U7QUFDbEUsMkVBQWdFO0FBRWhFO0lBR1csTUFBTSxDQUFDLFNBQW1DO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLFlBQVksb0NBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRSxNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLENBQUM7O0FBUnVCLHVCQUFNLEdBQUcsSUFBSSx1QkFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBRHZFLDRDQVVDIn0=