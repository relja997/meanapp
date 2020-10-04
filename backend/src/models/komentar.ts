import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Komentar', Komentar);