"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RuntimeException extends Error {
    constructor(msg = ``) {
        super(msg);
        this.msg = msg;
    }
    what() {
        return this.msg;
    }
}
exports.RuntimeException = RuntimeException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZS5leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9lcnJvcnMvZXhjZXB0aW9ucy9ydW50aW1lLmV4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLHNCQUE4QixTQUFRLEtBQUs7SUFDdkMsWUFBb0IsTUFBTSxFQUFFO1FBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQURLLFFBQUcsR0FBSCxHQUFHLENBQUs7SUFFNUIsQ0FBQztJQUVNLElBQUk7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUFSRCw0Q0FRQyJ9