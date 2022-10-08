"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use("/api", index_1.default);
app.listen(process.env.PORT || 4000, function () {
    console.log("Server is running on port ".concat(process.env.PORT));
});
