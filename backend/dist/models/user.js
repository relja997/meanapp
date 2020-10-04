"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    username: {
        type: String
    },
    slika: {
        type: String,
        default: 'image1600259014954generic-profile-pic.png'
    },
    password: {
        type: String
    },
    datum: {
        type: String
    },
    grad: {
        type: String
    },
    drzava: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    approved: {
        type: String
    },
    last_active: {
        type: Date
    },
    knjige_procitao: [{
            type: Schema.Types.ObjectId
        }],
    knjige_trenutno: [{
            type: Schema.Types.ObjectId
        }],
    knjige_za_citanje: [{
            type: Schema.Types.ObjectId
        }]
});
exports.default = mongoose_1.default.model('User', User);
//# sourceMappingURL=user.js.map