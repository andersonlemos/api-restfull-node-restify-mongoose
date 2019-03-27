"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Router {
    render(response, next) {
        return (document) => {
            if (document) {
                response.send(document);
            }
            else {
                response.send(404);
            }
        };
    }
}
exports.Router = Router;
