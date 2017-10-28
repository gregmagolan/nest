"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const iterare_1 = require("iterare");
const constants_1 = require("@nestjs/common/constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const context_creator_1 = require("./../helpers/context-creator");
class BaseExceptionFilterContext extends context_creator_1.ContextCreator {
    createConcreteContext(metadata) {
        if (shared_utils_1.isUndefined(metadata) || shared_utils_1.isEmpty(metadata)) {
            return [];
        }
        return iterare_1.default(metadata)
            .filter((instance) => instance.catch && shared_utils_1.isFunction(instance.catch))
            .map((instance) => ({
            func: instance.catch.bind(instance),
            exceptionMetatypes: this.reflectCatchExceptions(instance),
        }))
            .toArray();
    }
    reflectCatchExceptions(instance) {
        const prototype = Object.getPrototypeOf(instance);
        return Reflect.getMetadata(constants_1.FILTER_CATCH_EXCEPTIONS, prototype.constructor) || [];
    }
}
exports.BaseExceptionFilterContext = BaseExceptionFilterContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1leGNlcHRpb24tZmlsdGVyLWNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9leGNlcHRpb25zL2Jhc2UtZXhjZXB0aW9uLWZpbHRlci1jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTBCO0FBQzFCLHFDQUE4QjtBQUc5Qix3REFBK0Y7QUFDL0Ysb0VBQXFGO0FBTXJGLGtFQUE4RDtBQUc5RCxnQ0FBd0MsU0FBUSxnQ0FBYztJQUNuRCxxQkFBcUIsQ0FBbUMsUUFBVztRQUNyRSxFQUFFLENBQUMsQ0FBQywwQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHNCQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxFQUFPLENBQUM7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxpQkFBTyxDQUFDLFFBQVEsQ0FBQzthQUNoQixNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUkseUJBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEUsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDbkMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztTQUM1RCxDQUFDLENBQUM7YUFDRixPQUFPLEVBQU8sQ0FBQztJQUM1QixDQUFDO0lBRU0sc0JBQXNCLENBQUMsUUFBeUI7UUFDbkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxtQ0FBdUIsRUFBRSxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JGLENBQUM7Q0FDSjtBQWxCRCxnRUFrQkMifQ==