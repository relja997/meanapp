"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let CitaKnjigu = new Schema({
    korisnik: {
        type: Schema.Types.ObjectId
    },
    knjiga: {
        type: Schema.Types.ObjectId
    },
    ukupnoStr: {
        type: Number
    },
    procitano: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('CitaKnjigu', CitaKnjigu);
//# sourceMappingURL=cita_knjigu.js.map