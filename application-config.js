"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_adapter_1 = require("@nestjs/websockets/adapters/io-adapter");
class ApplicationConfig {
    constructor() {
        this.globalPipes = [];
        this.globalFilters = [];
        this.globalInterceptors = [];
        this.globalGuards = [];
        this.ioAdapter = new io_adapter_1.IoAdapter();
        this.globalPrefix = '';
    }
    setGlobalPrefix(prefix) {
        this.globalPrefix = prefix;
    }
    getGlobalPrefix() {
        return this.globalPrefix;
    }
    setIoAdapter(ioAdapter) {
        this.ioAdapter = ioAdapter;
    }
    getIoAdapter() {
        return this.ioAdapter;
    }
    useGlobalPipes(...pipes) {
        this.globalPipes = pipes;
    }
    getGlobalFilters() {
        return this.globalFilters;
    }
    useGlobalFilters(...filters) {
        this.globalFilters = filters;
    }
    getGlobalPipes() {
        return this.globalPipes;
    }
    getGlobalInterceptors() {
        return this.globalInterceptors;
    }
    useGlobalInterceptors(...interceptors) {
        this.globalInterceptors = interceptors;
    }
    getGlobalGuards() {
        return this.globalGuards;
    }
    useGlobalGuards(...guards) {
        this.globalGuards = guards;
    }
}
exports.ApplicationConfig = ApplicationConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24tY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvYXBwbGljYXRpb24tY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUVBQW1FO0FBSW5FO0lBQUE7UUFDWSxnQkFBVyxHQUF5QixFQUFFLENBQUM7UUFDdkMsa0JBQWEsR0FBc0IsRUFBRSxDQUFDO1FBQ3RDLHVCQUFrQixHQUFzQixFQUFFLENBQUM7UUFDM0MsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBQ2pDLGNBQVMsR0FBcUIsSUFBSSxzQkFBUyxFQUFFLENBQUM7UUFDOUMsaUJBQVksR0FBRyxFQUFFLENBQUM7SUFpRDlCLENBQUM7SUEvQ1UsZUFBZSxDQUFDLE1BQWM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVNLGVBQWU7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVNLFlBQVksQ0FBQyxTQUEyQjtRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRU0sWUFBWTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTSxjQUFjLENBQUMsR0FBRyxLQUEyQjtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRU0sZ0JBQWdCO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxHQUFHLE9BQTBCO1FBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxjQUFjO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFTSxxQkFBcUI7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNuQyxDQUFDO0lBRU0scUJBQXFCLENBQUMsR0FBRyxZQUErQjtRQUMzRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO0lBQzNDLENBQUM7SUFFTSxlQUFlO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFTSxlQUFlLENBQUMsR0FBRyxNQUFxQjtRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUF2REQsOENBdURDIn0=