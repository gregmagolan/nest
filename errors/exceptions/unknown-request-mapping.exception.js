"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_exception_1 = require("./runtime.exception");
const messages_1 = require("../messages");
class UnknownRequestMappingException extends runtime_exception_1.RuntimeException {
    constructor() {
        super(messages_1.UNKNOWN_REQUEST_MAPPING);
    }
}
exports.UnknownRequestMappingException = UnknownRequestMappingException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5rbm93bi1yZXF1ZXN0LW1hcHBpbmcuZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2V4Y2VwdGlvbnMvdW5rbm93bi1yZXF1ZXN0LW1hcHBpbmcuZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXVEO0FBQ3ZELDBDQUFzRDtBQUV0RCxvQ0FBNEMsU0FBUSxvQ0FBZ0I7SUFDaEU7UUFDSSxLQUFLLENBQUMsa0NBQXVCLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0o7QUFKRCx3RUFJQyJ9