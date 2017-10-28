"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_exception_1 = require("./runtime.exception");
const messages_1 = require("../messages");
class UnknownDependenciesException extends runtime_exception_1.RuntimeException {
    constructor(type) {
        super(messages_1.UnknownDependenciesMessage(type));
    }
}
exports.UnknownDependenciesException = UnknownDependenciesException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5rbm93bi1kZXBlbmRlbmNpZXMuZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2V4Y2VwdGlvbnMvdW5rbm93bi1kZXBlbmRlbmNpZXMuZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXVEO0FBQ3ZELDBDQUF5RDtBQUV6RCxrQ0FBMEMsU0FBUSxvQ0FBZ0I7SUFDOUQsWUFBWSxJQUFZO1FBQ3BCLEtBQUssQ0FBQyxxQ0FBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQUpELG9FQUlDIn0=