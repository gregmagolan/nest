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
require("reflect-metadata");
const constants_1 = require("@nestjs/common/constants");
const route_paramtypes_enum_1 = require("@nestjs/common/enums/route-paramtypes.enum");
const common_1 = require("@nestjs/common");
const constants_2 = require("../guards/constants");
const index_1 = require("../index");
const router_response_controller_1 = require("./router-response-controller");
class RouterExecutionContext {
    constructor(paramsFactory, pipesContextCreator, pipesConsumer, guardsContextCreator, guardsConsumer, interceptorsContextCreator, interceptorsConsumer) {
        this.paramsFactory = paramsFactory;
        this.pipesContextCreator = pipesContextCreator;
        this.pipesConsumer = pipesConsumer;
        this.guardsContextCreator = guardsContextCreator;
        this.guardsConsumer = guardsConsumer;
        this.interceptorsContextCreator = interceptorsContextCreator;
        this.interceptorsConsumer = interceptorsConsumer;
        this.responseController = new router_response_controller_1.RouterResponseController();
    }
    create(instance, callback, methodName, module, requestMethod) {
        const metadata = this.reflectCallbackMetadata(instance, methodName) || {};
        const keys = Object.keys(metadata);
        const argsLength = this.getArgumentsLength(keys, metadata);
        const pipes = this.pipesContextCreator.create(instance, callback);
        const paramtypes = this.reflectCallbackParamtypes(instance, methodName);
        const guards = this.guardsContextCreator.create(instance, callback, module);
        const interceptors = this.interceptorsContextCreator.create(instance, callback, module);
        const httpCode = this.reflectHttpStatusCode(callback);
        const paramsMetadata = this.exchangeKeysForValues(keys, metadata);
        const isResponseObj = paramsMetadata.some(({ type }) => type === route_paramtypes_enum_1.RouteParamtypes.RESPONSE);
        const paramsOptions = this.mergeParamsMetatypes(paramsMetadata, paramtypes);
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const args = this.createNullArray(argsLength);
            const canActivate = yield this.guardsConsumer.tryActivate(guards, req, instance, callback);
            if (!canActivate) {
                throw new index_1.HttpException(constants_2.FORBIDDEN_MESSAGE, common_1.HttpStatus.FORBIDDEN);
            }
            yield Promise.all(paramsOptions.map((param) => __awaiter(this, void 0, void 0, function* () {
                const { index, extractValue, type, data, metatype, pipes: paramPipes } = param;
                const value = extractValue(req, res, next);
                args[index] = yield this.getParamValue(value, { metatype, type, data }, pipes.concat(this.pipesContextCreator.createConcreteContext(paramPipes)));
            })));
            const handler = () => callback.apply(instance, args);
            const result = yield this.interceptorsConsumer.intercept(interceptors, req, instance, callback, handler);
            return !isResponseObj ?
                this.responseController.apply(result, res, requestMethod, httpCode) :
                undefined;
        });
    }
    mapParamType(key) {
        const keyPair = key.split(':');
        return Number(keyPair[0]);
    }
    reflectCallbackMetadata(instance, methodName) {
        return Reflect.getMetadata(constants_1.ROUTE_ARGS_METADATA, instance, methodName);
    }
    reflectCallbackParamtypes(instance, methodName) {
        return Reflect.getMetadata(constants_1.PARAMTYPES_METADATA, instance, methodName);
    }
    reflectHttpStatusCode(callback) {
        return Reflect.getMetadata(constants_1.HTTP_CODE_METADATA, callback);
    }
    getArgumentsLength(keys, metadata) {
        return Math.max(...keys.map(key => metadata[key].index)) + 1;
    }
    createNullArray(length) {
        return Array.apply(null, { length }).fill(null);
    }
    exchangeKeysForValues(keys, metadata) {
        return keys.map(key => {
            const type = this.mapParamType(key);
            const { index, data, pipes } = metadata[key];
            const extractValue = (req, res, next) => this.paramsFactory.exchangeKeyForValue(type, data, { req, res, next });
            return { index, extractValue, type, data, pipes };
        });
    }
    mergeParamsMetatypes(paramsProperties, paramtypes) {
        if (!paramtypes) {
            return paramsProperties;
        }
        return paramsProperties.map((param) => (Object.assign({}, param, { metatype: paramtypes[param.index] })));
    }
    getParamValue(value, { metatype, type, data }, transforms) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === route_paramtypes_enum_1.RouteParamtypes.BODY
                || type === route_paramtypes_enum_1.RouteParamtypes.QUERY
                || type === route_paramtypes_enum_1.RouteParamtypes.PARAM) {
                return yield this.pipesConsumer.apply(value, { metatype, type, data }, transforms);
            }
            return Promise.resolve(value);
        });
    }
}
exports.RouterExecutionContext = RouterExecutionContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWV4ZWN1dGlvbi1jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcm91dGVyL3JvdXRlci1leGVjdXRpb24tY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNEJBQTBCO0FBQzFCLHdEQUF3RztBQUV4RyxzRkFBNkU7QUFNN0UsMkNBQXFGO0FBR3JGLG1EQUF3RDtBQUN4RCxvQ0FBeUM7QUFDekMsNkVBQXdFO0FBWXhFO0lBRUksWUFDcUIsYUFBa0MsRUFDbEMsbUJBQXdDLEVBQ3hDLGFBQTRCLEVBQzVCLG9CQUEwQyxFQUMxQyxjQUE4QixFQUM5QiwwQkFBc0QsRUFDdEQsb0JBQTBDO1FBTjFDLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVI5Qyx1QkFBa0IsR0FBRyxJQUFJLHFEQUF3QixFQUFFLENBQUM7SUFRSCxDQUFDO0lBRTVELE1BQU0sQ0FBQyxRQUFvQixFQUFFLFFBQTBCLEVBQUUsVUFBa0IsRUFBRSxNQUFjLEVBQUUsYUFBNEI7UUFDNUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sS0FBSyxH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