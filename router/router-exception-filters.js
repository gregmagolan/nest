"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const exceptions_handler_1 = require("../exceptions/exceptions-handler");
const constants_1 = require("@nestjs/common/constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const base_exception_filter_context_1 = require("../exceptions/base-exception-filter-context");
class RouterExceptionFilters extends base_exception_filter_context_1.BaseExceptionFilterContext {
    constructor(config) {
        super();
        this.config = config;
    }
    create(instance, callback) {
        const exceptionHandler = new exceptions_handler_1.ExceptionsHandler();
        const filters = this.createContext(instance, callback, constants_1.EXCEPTION_FILTERS_METADATA);
        if (shared_utils_1.isEmpty(filters)) {
            return exceptionHandler;
        }
        exceptionHandler.setCustomFilters(filters);
        return exceptionHandler;
    }
    getGlobalMetadata() {
        return this.config.getGlobalFilters();
    }
}
exports.RouterExceptionFilters = RouterExceptionFilters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWV4Y2VwdGlvbi1maWx0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcm91dGVyL3JvdXRlci1leGNlcHRpb24tZmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRCQUEwQjtBQUcxQix5RUFBcUU7QUFDckUsd0RBQStGO0FBQy9GLG9FQUFxRjtBQU9yRiwrRkFBeUY7QUFFekYsNEJBQW9DLFNBQVEsMERBQTBCO0lBQ2xFLFlBQTZCLE1BQXlCO1FBQ2xELEtBQUssRUFBRSxDQUFDO1FBRGlCLFdBQU0sR0FBTixNQUFNLENBQW1CO0lBRXRELENBQUM7SUFFTSxNQUFNLENBQUMsUUFBb0IsRUFBRSxRQUE2QjtRQUM3RCxNQUFNLGdCQUFnQixHQUFHLElBQUksc0NBQWlCLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsc0NBQTBCLENBQUMsQ0FBQztRQUNuRixFQUFFLENBQUMsQ0FBQyxzQkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUNELGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRU0saUJBQWlCO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFPLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBbEJELHdEQWtCQyJ9