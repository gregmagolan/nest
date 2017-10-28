"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException {
    /**
     * The base Nest Application exception, which is handled by the default Exceptions Handler.
     * If you throw an exception from your HTTP route handlers, Nest will map them to the appropriate HTTP response and send to the client.
     *
     * When `response` is an object:
     * - object will be stringified and returned to the user as a JSON response,
     *
     * When `response` is a string:
     * - Nest will create a response with two properties:
     * ```
     * message: response,
     * statusCode: X
     * ```
     */
    constructor(response, status) {
        this.response = response;
        this.status = status;
    }
    getResponse() {
        return this.response;
    }
    getStatus() {
        return this.status;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9leGNlcHRpb25zL2h0dHAtZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFDSTs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsWUFDcUIsUUFBeUIsRUFDekIsTUFBYztRQURkLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRWhDLFdBQVc7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sU0FBUztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQTFCRCxzQ0EwQkMifQ==