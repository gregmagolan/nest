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
const exception_handler_1 = require("./exception-handler");
const messages_1 = require("./messages");
class ExceptionsZone {
    static run(fn) {
        try {
            fn();
        }
        catch (e) {
            this.exceptionHandler.handle(e);
            throw messages_1.UNHANDLED_RUNTIME_EXCEPTION;
        }
    }
    static asyncRun(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fn();
            }
            catch (e) {
                this.exceptionHandler.handle(e);
                throw messages_1.UNHANDLED_RUNTIME_EXCEPTION;
            }
        });
    }
}
ExceptionsZone.exceptionHandler = new exception_handler_1.ExceptionHandler();
exports.ExceptionsZone = ExceptionsZone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy16b25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2V4Y2VwdGlvbnMtem9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQXVEO0FBQ3ZELHlDQUF5RDtBQUV6RDtJQUdXLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBYztRQUM1QixJQUFJLENBQUM7WUFDRCxFQUFFLEVBQUUsQ0FBQztRQUNULENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLHNDQUEyQixDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFPLFFBQVEsQ0FBQyxFQUF1Qjs7WUFDaEQsSUFBSSxDQUFDO2dCQUNELE1BQU0sRUFBRSxFQUFFLENBQUM7WUFDZixDQUFDO1lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLHNDQUEyQixDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDO0tBQUE7O0FBcEJ1QiwrQkFBZ0IsR0FBRyxJQUFJLG9DQUFnQixFQUFFLENBQUM7QUFEdEUsd0NBc0JDIn0=