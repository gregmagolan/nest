"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class ExpressAdapter {
    static create() {
        return express();
    }
    static createRouter() {
        return express.Router();
    }
}
exports.ExpressAdapter = ExpressAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYWRhcHRlcnMvZXhwcmVzcy1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1DO0FBRW5DO0lBQ1csTUFBTSxDQUFDLE1BQU07UUFDaEIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNLENBQUMsWUFBWTtRQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDSjtBQVJELHdDQVFDIn0=