import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Knjiga', Knjiga);