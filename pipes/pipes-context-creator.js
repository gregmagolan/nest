"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const iterare_1 = require("iterare");
const constants_1 = require("@nestjs/common/constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const context_creator_1 = require("./../helpers/context-creator");
class PipesContextCreator extends context_creator_1.ContextCreator {
    constructor(config) {
        super();
        this.config = config;
    }
    create(instance, callback) {
        return this.createContext(instance, callback, constants_1.PIPES_METADATA);
    }
    createConcreteContext(metadata) {
        if (shared_utils_1.isUndefined(metadata) || shared_utils_1.isEmpty(metadata)) {
            return [];
        }
        return iterare_1.default(metadata).filter((pipe) => pipe && pipe.transform && shared_utils_1.isFunction(pipe.transform))
            .map((pipe) => pipe.transform.bind(pipe))
            .toArray();
    }
    getGlobalMetadata() {
        if (!this.config) {
            return [];
        }
        return this.config.getGlobalPipes();
    }
}
exports.PipesContextCreator = PipesContextCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMtY29udGV4dC1jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcGlwZXMvcGlwZXMtY29udGV4dC1jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTBCO0FBQzFCLHFDQUE4QjtBQUU5Qix3REFBMEQ7QUFDMUQsb0VBQXFGO0FBRXJGLGtFQUE4RDtBQUU5RCx5QkFBaUMsU0FBUSxnQ0FBYztJQUNuRCxZQUE2QixNQUEwQjtRQUNuRCxLQUFLLEVBQUUsQ0FBQztRQURpQixXQUFNLEdBQU4sTUFBTSxDQUFvQjtJQUV2RCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQW9CLEVBQUUsUUFBMEI7UUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSwwQkFBYyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLHFCQUFxQixDQUFtQyxRQUFXO1FBQ3RFLEVBQUUsQ0FBQyxDQUFDLDBCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksc0JBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEVBQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0QsTUFBTSxDQUFDLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSx5QkFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN0RixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hDLE9BQU8sRUFBTyxDQUFDO0lBQzVCLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxFQUFPLENBQUM7UUFDbkIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBTyxDQUFDO0lBQzdDLENBQUM7Q0FDSjtBQXhCRCxrREF3QkMifQ==