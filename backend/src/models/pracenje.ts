import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
})

export default mongoose.model('Pracenje', Pracenje);