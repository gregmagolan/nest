import { NestContainer } from '../injector/container';
import { MiddlewaresContainer } from './container';
import { ControllerMetadata } from '@nestjs/common/interfaces/controllers/controller-metadata.interface';
import { NestModule } from '@nestjs/common/interfaces/modules/nest-module.interface';
import { MiddlewareConfiguration } from '@nestjs/common/interfaces/middlewares/middleware-configuration.interface';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { Module } from '../injector/module';
import { ApplicationConfig } from './../application-config';
export declare class MiddlewaresModule {
    private static readonly routesMapper;
    private static readonly container;
    private static readonly routerProxy;
    private static readonly routerMethodFactory;
    private static routerExceptionFilter;
    private static resolver;
    static setup(container: NestContainer, config: ApplicationConfig): Promise<void>;
    static getContainer(): MiddlewaresContainer;
    static resolveMiddlewares(modules: Map<string, Module>): Promise<void>;
    static loadConfiguration(instance: NestModule, module: string): void;
    static setupMiddlewares(app: any): Promise<void>;
    static setupMiddlewareConfig(config: MiddlewareConfiguration, module: string, app: any): Promise<void>;
    static setupRouteMiddleware(route: ControllerMetadata & {
        method: RequestMethod;
    }, config: MiddlewareConfiguration, module: string, app: any): Promise<void>;
    private static setupHandler(instance, metatype, app, method, path);
    private static setupHandlerWithProxy(exceptionsHandler, router, middleware, path);
}
