"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_exception_1 = require("./runtime.exception");
const messages_1 = require("../messages");
class InvalidMiddlewareException extends runtime_exception_1.RuntimeException {
    constructor(name) {
        super(messages_1.InvalidMiddlewareMessage(name));
    }
}
exports.InvalidMiddlewareException = InvalidMiddlewareException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1taWRkbGV3YXJlLmV4Y2VwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2Vycm9ycy9leGNlcHRpb25zL2ludmFsaWQtbWlkZGxld2FyZS5leGNlcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBdUQ7QUFDdkQsMENBQXVEO0FBRXZELGdDQUF3QyxTQUFRLG9DQUFnQjtJQUM1RCxZQUFZLElBQVk7UUFDcEIsS0FBSyxDQUFDLG1DQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKO0FBSkQsZ0VBSUMifQ==