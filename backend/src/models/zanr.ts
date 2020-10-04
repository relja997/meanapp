import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zanr = new Schema({
    naziv: {
        type: String
    },
    brojKnjiga: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Zanr', Zanr);


