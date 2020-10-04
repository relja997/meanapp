"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zanr = new Schema({
    naziv: {
        type: String
    },
    brojKnjiga: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.default.model('Zanr', Zanr);
//# sourceMappingURL=zanr.js.map