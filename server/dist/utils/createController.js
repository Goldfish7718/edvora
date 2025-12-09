"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createController = (controllerFn) => {
    return (req, res, next) => {
        return controllerFn(req, res, next);
    };
};
exports.default = createController;
