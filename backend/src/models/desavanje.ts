import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Desavanje', Desavanje);