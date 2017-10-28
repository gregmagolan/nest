"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class ContextCreator {
    createContext(instance, callback, metadataKey) {
        const globalMetadata = this.getGlobalMetadata && this.getGlobalMetadata();
        const classMetadata = this.reflectClassMetadata(instance, metadataKey);
        const methodMetadata = this.reflectMethodMetadata(callback, metadataKey);
        return [
            ...this.createConcreteContext(globalMetadata || []),
            ...this.createConcreteContext(classMetadata),
            ...this.createConcreteContext(methodMetadata),
        ];
    }
    reflectClassMetadata(instance, metadataKey) {
        const prototype = Object.getPrototypeOf(instance);
        return Reflect.getMetadata(metadataKey, prototype.constructor);
    }
    reflectMethodMetadata(callback, metadataKey) {
        return Reflect.getMetadata(metadataKey, callback);
    }
}
exports.ContextCreator = ContextCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvaGVscGVycy9jb250ZXh0LWNyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBMEI7QUFNMUI7SUFJVyxhQUFhLENBQ2hCLFFBQW9CLEVBQ3BCLFFBQTBCLEVBQzFCLFdBQW1CO1FBRW5CLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUssQ0FBQztRQUM3RSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUksUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBSSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDNUUsTUFBTSxDQUFDO1lBQ0gsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQU8sY0FBYyxJQUFJLEVBQU8sQ0FBQztZQUM5RCxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBTyxhQUFhLENBQUM7WUFDbEQsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQU8sY0FBYyxDQUFDO1NBQ2pELENBQUM7SUFDWCxDQUFDO0lBRU0sb0JBQW9CLENBQUksUUFBb0IsRUFBRSxXQUFtQjtRQUNwRSxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVNLHFCQUFxQixDQUFJLFFBQTBCLEVBQUUsV0FBbUI7UUFDM0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDSjtBQTNCRCx3Q0EyQkMifQ==