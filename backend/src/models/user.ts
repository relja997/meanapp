import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('User', User);