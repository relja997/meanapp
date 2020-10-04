"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Knjiga = new Schema({
    naziv: {
        type: String
    },
    autori: [
        { type: String }
    ],
    datum_izd: {
        type: String
    },
    zanrovi: [
        { type: String }
    ],
    opis: {
        type: String
    },
    slika: {
        type: String,
        default: 'image1600515580195book-generic.jpg'
    },
    ocjena: {
        type: Number
    },
    approved: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Knjiga', Knjiga);
//# sourceMappingURL=knjiga.js.map