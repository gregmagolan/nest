"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterare_1 = require("iterare");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
class MetadataScanner {
    scanFromPrototype(instance, prototype, callback) {
        return iterare_1.default(Object.getOwnPropertyNames(prototype))
            .filter((method) => {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, method);
            if (descriptor.set || descriptor.get) {
                return false;
            }
            return !shared_utils_1.isConstructor(method) && shared_utils_1.isFunction(prototype[method]);
        })
            .map(callback)
            .filter((metadata) => !shared_utils_1.isNil(metadata))
            .toArray();
    }
}
exports.MetadataScanner = MetadataScanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEtc2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL21ldGFkYXRhLXNjYW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBOEI7QUFFOUIsb0VBQXFGO0FBRXJGO0lBQ1csaUJBQWlCLENBQTBCLFFBQVcsRUFBRSxTQUFTLEVBQUUsUUFBNkI7UUFDbkcsTUFBTSxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2hELE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2YsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN0RSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxNQUFNLENBQUMsQ0FBQyw0QkFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHlCQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLFFBQVEsQ0FBQzthQUNiLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxvQkFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDSjtBQWRELDBDQWNDIn0=