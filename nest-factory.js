"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./scanner");
const instance_loader_1 = require("./injector/instance-loader");
const container_1 = require("./injector/container");
const exceptions_zone_1 = require("./errors/exceptions-zone");
const logger_service_1 = require("@nestjs/common/services/logger.service");
const constants_1 = require("./constants");
const nest_application_1 = require("./nest-application");
const nest_microservice_1 = require("./nest-microservice");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const express_adapter_1 = require("./adapters/express-adapter");
const metadata_scanner_1 = require("./metadata-scanner");
class NestFactoryStatic {
    constructor() {
        this.container = new container_1.NestContainer();
        this.instanceLoader = new instance_loader_1.InstanceLoader(this.container);
        this.logger = new logger_service_1.Logger('NestFactory', true);
        this.dependenciesScanner = new scanner_1.DependenciesScanner(this.container, new metadata_scanner_1.MetadataScanner());
    }
    /**
     * Creates an instance of the NestApplication (returns Promise)
     *
     * @param  {} module Entry ApplicationModule class
     * @param  {} express Optional express() server instance
     * @returns an `Promise` of the INestApplication instance
     */
    create(module, express = express_adapter_1.ExpressAdapter.create()) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize(module);
            return this.createNestInstance(new nest_application_1.NestApplication(this.container, express));
        });
    }
    /**
     * Creates an instance of the NestMicroservice (returns Promise)
     *
     * @param  {} module Entry ApplicationModule class
     * @param  {MicroserviceConfiguration} config Optional microservice configuration
     * @returns an `Promise` of the INestMicroservice instance
     */
    createMicroservice(module, config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize(module);
            return this.createNestInstance(new nest_microservice_1.NestMicroservice(this.container, config));
        });
    }
    createNestInstance(instance) {
        return this.createProxy(instance);
    }
    initialize(module) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log(constants_1.messages.APPLICATION_START);
                yield exceptions_zone_1.ExceptionsZone.asyncRun(() => __awaiter(this, void 0, void 0, function* () {
                    this.dependenciesScanner.scan(module);
                    yield this.instanceLoader.createInstancesOfDependencies();
                }));
            }
            catch (e) {
                process.abort();
            }
        });
    }
    createProxy(target) {
        const proxy = this.createExceptionProxy();
        return new Proxy(target, {
            get: proxy,
            set: proxy,
        });
    }
    createExceptionProxy() {
        return (receiver, prop) => {
            if (!(prop in receiver))
                return;
            if (shared_utils_1.isFunction(receiver[prop])) {
                return (...args) => {
                    let result;
                    exceptions_zone_1.ExceptionsZone.run(() => {
                        result = receiver[prop](...args);
                    });
                    return result;
                };
            }
            return receiver[prop];
        };
    }
}
exports.NestFactoryStatic = NestFactoryStatic;
exports.NestFactory = new NestFactoryStatic();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdC1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbmVzdC1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBZ0Q7QUFDaEQsZ0VBQTREO0FBQzVELG9EQUFxRDtBQUNyRCw4REFBMEQ7QUFFMUQsMkVBQWdFO0FBQ2hFLDJDQUF1QztBQUN2Qyx5REFBcUQ7QUFDckQsMkRBQXVEO0FBQ3ZELG9FQUErRDtBQUUvRCxnRUFBNEQ7QUFFNUQseURBQXFEO0FBRXJEO0lBQUE7UUFDWSxjQUFTLEdBQUcsSUFBSSx5QkFBYSxFQUFFLENBQUM7UUFDaEMsbUJBQWMsR0FBRyxJQUFJLGdDQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELFdBQU0sR0FBRyxJQUFJLHVCQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLHdCQUFtQixHQUFHLElBQUksNkJBQW1CLENBQ2pELElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxrQ0FBZSxFQUFFLENBQ3hDLENBQUM7SUEyRU4sQ0FBQztJQXpFRzs7Ozs7O09BTUc7SUFDVSxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sR0FBRyxnQ0FBYyxDQUFDLE1BQU0sRUFBRTs7WUFDekQsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQzFCLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUMvQyxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ1Usa0JBQWtCLENBQzNCLE1BQU0sRUFDTixNQUFrQzs7WUFFbEMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQzFCLElBQUksb0NBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FDL0MsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVPLGtCQUFrQixDQUFJLFFBQVc7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVhLFVBQVUsQ0FBQyxNQUFNOztZQUMzQixJQUFJLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLGdDQUFjLENBQUMsUUFBUSxDQUFDLEdBQVMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdEMsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLDZCQUE2QixFQUFFLENBQUM7Z0JBQzlELENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVPLFdBQVcsQ0FBQyxNQUFNO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDckIsR0FBRyxFQUFFLEtBQUs7WUFDVixHQUFHLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxvQkFBb0I7UUFDeEIsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQztZQUVYLEVBQUUsQ0FBQyxDQUFDLHlCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO29CQUNmLElBQUksTUFBTSxDQUFDO29CQUNYLGdDQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTt3QkFDcEIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUNyQyxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNsQixDQUFDLENBQUM7WUFDTixDQUFDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFqRkQsOENBaUZDO0FBRVksUUFBQSxXQUFXLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIn0=