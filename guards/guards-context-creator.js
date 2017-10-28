"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const iterare_1 = require("iterare");
const constants_1 = require("@nestjs/common/constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const context_creator_1 = require("./../helpers/context-creator");
class GuardsContextCreator extends context_creator_1.ContextCreator {
    constructor(container, config) {
        super();
        this.container = container;
        this.config = config;
    }
    create(instance, callback, module) {
        this.moduleContext = module;
        return this.createContext(instance, callback, constants_1.GUARDS_METADATA);
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
                .filter((guard) => guard && shared_utils_1.isFunction(guard.canActivate))
                .toArray();
    }
    createGlobalMetadataContext(metadata) {
        return iterare_1.default(metadata)
            .filter((guard) => guard && guard.canActivate && shared_utils_1.isFunction(guard.canActivate))
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
        return this.config.getGlobalGuards();
    }
}
exports.GuardsContextCreator = GuardsContextCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRzLWNvbnRleHQtY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2d1YXJkcy9ndWFyZHMtY29udGV4dC1jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTBCO0FBQzFCLHFDQUE4QjtBQUU5Qix3REFBMkQ7QUFDM0Qsb0VBQTRGO0FBQzVGLGtFQUE4RDtBQUs5RCwwQkFBa0MsU0FBUSxnQ0FBYztJQUdwRCxZQUNxQixTQUF3QixFQUN4QixNQUE4QjtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQUZTLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBd0I7SUFFbkQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFvQixFQUFFLFFBQTBCLEVBQUUsTUFBYztRQUMxRSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLDJCQUFlLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0scUJBQXFCLENBQW1DLFFBQVc7UUFDdEUsRUFBRSxDQUFDLENBQUMsMEJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxzQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLEVBQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0QsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLEtBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLDJCQUEyQixDQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEQsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO2lCQUNqRSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdkQsTUFBTSxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQztpQkFDckQsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO2lCQUNsQyxNQUFNLENBQUMsQ0FBQyxLQUFrQixFQUFFLEVBQUUsQ0FBQyxLQUFLLElBQUkseUJBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3RFLE9BQU8sRUFBTyxDQUFDO0lBQzVCLENBQUM7SUFFTSwyQkFBMkIsQ0FBbUMsUUFBVztRQUM1RSxNQUFNLENBQUMsaUJBQU8sQ0FBQyxRQUFRLENBQUM7YUFDbkIsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSx5QkFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM5RSxPQUFPLEVBQU8sQ0FBQztJQUN4QixDQUFDO0lBRU0scUJBQXFCLENBQUMsUUFBUTtRQUNqQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBRSxRQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSxpQkFBaUI7UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxFQUFPLENBQUM7UUFDbkIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBTyxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQWxERCxvREFrREMifQ==