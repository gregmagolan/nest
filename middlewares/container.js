"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MiddlewaresContainer {
    constructor() {
        this.middlewares = new Map();
        this.configs = new Map();
    }
    getMiddlewares(module) {
        return this.middlewares.get(module) || new Map();
    }
    getConfigs() {
        return this.configs;
    }
    addConfig(configList, module) {
        const middlewares = this.getCurrentMiddlewares(module);
        const currentConfig = this.getCurrentConfig(module);
        const configurations = configList || [];
        configurations.map((config) => {
            [].concat(config.middlewares).map((metatype) => {
                const token = metatype.name;
                middlewares.set(token, {
                    instance: null,
                    metatype,
                });
            });
            currentConfig.add(config);
        });
    }
    getCurrentMiddlewares(module) {
        if (!this.middlewares.has(module)) {
            this.middlewares.set(module, new Map());
        }
        return this.middlewares.get(module);
    }
    getCurrentConfig(module) {
        if (!this.configs.has(module)) {
            this.configs.set(module, new Set());
        }
        return this.configs.get(module);
    }
}
exports.MiddlewaresContainer = MiddlewaresContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbWlkZGxld2FyZXMvY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7SUFBQTtRQUNxQixnQkFBVyxHQUFHLElBQUksR0FBRyxFQUEwQyxDQUFDO1FBQ2hFLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBd0MsQ0FBQztJQXdDL0UsQ0FBQztJQXRDVSxjQUFjLENBQUMsTUFBYztRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRU0sVUFBVTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxTQUFTLENBQUMsVUFBcUMsRUFBRSxNQUFjO1FBQ2xFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEQsTUFBTSxjQUFjLEdBQUcsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDMUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzNDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQzVCLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUNuQixRQUFRLEVBQUUsSUFBSTtvQkFDZCxRQUFRO2lCQUNYLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxNQUFjO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBNkIsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLGdCQUFnQixDQUFDLE1BQWM7UUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxFQUEyQixDQUFDLENBQUM7UUFDakUsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0o7QUExQ0Qsb0RBMENDIn0=