"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dotenv_1.config)();
// ROUTE IMPORTS
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const enrolment_routes_1 = __importDefault(require("./routes/enrolment.routes"));
// CONFIG
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// MIDDLEWARE
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// ROUTES
app.use("/users", user_routes_1.default);
app.use("/courses", course_routes_1.default);
app.use("/enrolments", enrolment_routes_1.default);
// TEST ENDPOINT
app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});
// PORT LISTEN
app.listen(5000, () => {
    console.log(`Server running on port ${PORT}`);
});
