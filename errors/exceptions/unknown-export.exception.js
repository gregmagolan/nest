"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_exception_1 = require("./runtime.exception");
const messages_1 = require("../messages");
class UnknownExportException extends runtime_exception_1.RuntimeException {
    constructor(name) {
        super(messages_1.UnknownExportMessage(name));
    }
}
exports.UnknownExportException = UnknownExportException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5rbm93bi1leHBvcnQuZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2V4Y2VwdGlvbnMvdW5rbm93bi1leHBvcnQuZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXVEO0FBQ3ZELDBDQUFtRDtBQUVuRCw0QkFBb0MsU0FBUSxvQ0FBZ0I7SUFDeEQsWUFBWSxJQUFZO1FBQ3BCLEtBQUssQ0FBQywrQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDSjtBQUpELHdEQUlDIn0=