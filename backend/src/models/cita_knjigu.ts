import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
export default mongoose.model('CitaKnjigu', CitaKnjigu);