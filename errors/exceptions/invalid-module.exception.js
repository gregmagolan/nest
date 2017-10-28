"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_exception_1 = require("./runtime.exception");
const messages_1 = require("../messages");
class InvalidModuleException extends runtime_exception_1.RuntimeException {
    constructor(trace) {
        const scope = (trace || []).map((module) => module.name).join(' -> ');
        super(messages_1.InvalidModuleMessage(scope));
    }
}
exports.InvalidModuleException = InvalidModuleException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1tb2R1bGUuZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2V4Y2VwdGlvbnMvaW52YWxpZC1tb2R1bGUuZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXVEO0FBQ3ZELDBDQUFtRDtBQUVuRCw0QkFBb0MsU0FBUSxvQ0FBZ0I7SUFDMUQsWUFBWSxLQUFZO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxLQUFLLENBQUMsK0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFMRCx3REFLQyJ9