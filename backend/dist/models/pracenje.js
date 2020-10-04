"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Pracenje = new Schema({
    praceni: {
        type: Schema.Types.ObjectId
    },
    pratioc: {
        type: Schema.Types.ObjectId
    },
    obavjestenja: [{
            type: String
        }]
});
exports.default = mongoose_1.default.model('Pracenje', Pracenje);
//# sourceMappingURL=pracenje.js.map