"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@nestjs/common/constants");
class ModuleTokenFactory {
    create(metatype, scope) {
        const reflectedScope = this.reflectScope(metatype);
        const isSingleScoped = reflectedScope === true;
        const opaqueToken = {
            module: this.getModuleName(metatype),
            scope: isSingleScoped ? this.getScopeStack(scope) : reflectedScope,
        };
        return JSON.stringify(opaqueToken);
    }
    getModuleName(metatype) {
        return metatype.name;
    }
    getScopeStack(scope) {
        const reversedScope = scope.reverse();
        const firstGlobalIndex = reversedScope.findIndex((s) => this.reflectScope(s) === 'global');
        scope.reverse();
        const stack = firstGlobalIndex >= 0 ? scope.slice(scope.length - firstGlobalIndex - 1) : scope;
        return stack.map((module) => module.name);
    }
    reflectScope(metatype) {
        const reflectedScope = Reflect.getMetadata(constants_1.SHARED_MODULE_METADATA, metatype);
        return reflectedScope ? reflectedScope : 'global';
    }
}
exports.ModuleTokenFactory = ModuleTokenFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLXRva2VuLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9pbmplY3Rvci9tb2R1bGUtdG9rZW4tZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdEQUFrRTtBQUVsRTtJQUNXLE1BQU0sQ0FBQyxRQUE0QixFQUFFLEtBQTJCO1FBQ25FLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsTUFBTSxjQUFjLEdBQUcsY0FBYyxLQUFLLElBQUksQ0FBQztRQUMvQyxNQUFNLFdBQVcsR0FBRztZQUNoQixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDcEMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYztTQUNyRSxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLGFBQWEsQ0FBQyxRQUE0QjtRQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQTJCO1FBQzVDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QyxNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDM0YsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWhCLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDL0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU8sWUFBWSxDQUFDLFFBQTRCO1FBQzdDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEQsQ0FBQztDQUNKO0FBNUJELGdEQTRCQyJ9