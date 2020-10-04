"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Desavanje = new Schema({
    naziv: {
        type: String
    },
    pocetak: {
        type: Date,
        min: '2020-09-04'
    },
    kraj: {
        type: Date
    },
    status: {
        type: String
    },
    tip: {
        type: String
    },
    opis: {
        type: String
    },
    kreirao: {
        type: String
    },
    ucestvuju: [{
            type: Schema.Types.ObjectId
        }],
    zahtjevi: [{
            type: Schema.Types.ObjectId
        }]
});
exports.default = mongoose_1.default.model('Desavanje', Desavanje);
//# sourceMappingURL=desavanje.js.map