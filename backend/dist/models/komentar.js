"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Komentar = new Schema({
    korisnik: {
        type: Schema.Types.ObjectId
    },
    autor: {
        type: String
    },
    username: {
        type: String
    },
    knjiga: {
        type: Schema.Types.ObjectId
    },
    nazivKnj: {
        type: String
    },
    ocjena: {
        type: Number
    },
    komentar: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Komentar', Komentar);
//# sourceMappingURL=komentar.js.map