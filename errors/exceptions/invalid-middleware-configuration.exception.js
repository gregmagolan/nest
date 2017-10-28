"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_exception_1 = require("./runtime.exception");
const messages_1 = require("../messages");
class InvalidMiddlewareConfigurationException extends runtime_exception_1.RuntimeException {
    constructor() {
        super(messages_1.INVALID_MIDDLEWARE_CONFIGURATION);
    }
}
exports.InvalidMiddlewareConfigurationException = InvalidMiddlewareConfigurationException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1taWRkbGV3YXJlLWNvbmZpZ3VyYXRpb24uZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2V4Y2VwdGlvbnMvaW52YWxpZC1taWRkbGV3YXJlLWNvbmZpZ3VyYXRpb24uZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXVEO0FBQ3ZELDBDQUErRDtBQUUvRCw2Q0FBcUQsU0FBUSxvQ0FBZ0I7SUFDekU7UUFDSSxLQUFLLENBQUMsMkNBQWdDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0o7QUFKRCwwRkFJQyJ9