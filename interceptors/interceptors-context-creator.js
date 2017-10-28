"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const iterare_1 = require("iterare");
const constants_1 = require("@nestjs/common/constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const context_creator_1 = require("./../helpers/context-creator");
class InterceptorsContextCreator extends context_creator_1.ContextCreator {
    constructor(container, config) {
        super();
        this.container = container;
        this.config = config;
    }
    create(instance, callback, module) {
        this.moduleContext = module;
        return this.createContext(instance, callback, constants_1.INTERCEPTORS_METADATA);
    }
    createConcreteContext(metadata) {
        if (shared_utils_1.isUndefined(metadata) || shared_utils_1.isEmpty(metadata) || !this.moduleContext) {
            return [];
        }
        const isGlobalMetadata = metadata === this.getGlobalMetadata();
        return isGlobalMetadata ?
            this.createGlobalMetadataContext(metadata) :
            iterare_1.default(metadata).filter((metatype) => metatype && metatype.name)
                .map((metatype) => this.getInstanceByMetatype(metatype))
                .filter((wrapper) => wrapper && wrapper.instance)
                .map((wrapper) => wrapper.instance)
                .filter((interceptor) => interceptor && shared_utils_1.isFunction(interceptor.intercept))
                .toArray();
    }
    createGlobalMetadataContext(metadata) {
        return iterare_1.default(metadata)
            .filter((interceptor) => interceptor && interceptor.intercept && shared_utils_1.isFunction(interceptor.intercept))
            .toArray();
    }
    getInstanceByMetatype(metatype) {
        const collection = this.container.getModules();
        const module = collection.get(this.moduleContext);
        if (!module) {
            return undefined;
        }
        return module.injectables.get(metatype.name);
    }
    getGlobalMetadata() {
        if (!this.config) {
            return [];
        }
        return this.config.getGlobalInterceptors();
    }
}
exports.InterceptorsContextCreator = InterceptorsContextCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3JzLWNvbnRleHQtY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2ludGVyY2VwdG9ycy9pbnRlcmNlcHRvcnMtY29udGV4dC1jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTBCO0FBQzFCLHFDQUE4QjtBQUU5Qix3REFBaUU7QUFDakUsb0VBQTRGO0FBQzVGLGtFQUE4RDtBQUk5RCxnQ0FBd0MsU0FBUSxnQ0FBYztJQUcxRCxZQUNxQixTQUF3QixFQUN4QixNQUE4QjtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQUZTLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBd0I7SUFFbkQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFvQixFQUFFLFFBQTBCLEVBQUUsTUFBYztRQUMxRSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGlDQUFxQixDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVNLHFCQUFxQixDQUFtQyxRQUFXO1FBQ3RFLEVBQUUsQ0FBQyxDQUFDLDBCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksc0JBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxFQUFPLENBQUM7UUFDbkIsQ0FBQztRQUNELE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQywyQkFBMkIsQ0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xELGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUUsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztpQkFDakUsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3ZELE1BQU0sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUM7aUJBQ3JELEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztpQkFDbEMsTUFBTSxDQUFDLENBQUMsV0FBNEIsRUFBRSxFQUFFLENBQUMsV0FBVyxJQUFJLHlCQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMxRixPQUFPLEVBQU8sQ0FBQztJQUM1QixDQUFDO0lBRU0sMkJBQTJCLENBQW1DLFFBQVc7UUFDNUUsTUFBTSxDQUFDLGlCQUFPLENBQUMsUUFBUSxDQUFDO2FBQ25CLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxTQUFTLElBQUkseUJBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDbEcsT0FBTyxFQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVNLHFCQUFxQixDQUFDLFFBQVE7UUFDakMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUUsUUFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0saUJBQWlCO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsRUFBTyxDQUFDO1FBQ25CLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBTyxDQUFDO0lBQ3BELENBQUM7Q0FDSjtBQWxERCxnRUFrREMifQ==