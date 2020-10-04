"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const app = express_1.default();
const PATH = "../../Lab2 resenje/img";
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + file.originalname);
    }
});
let upload = multer({
    storage: storage
});
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/users');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
const user_1 = __importDefault(require("./models/user"));
const knjiga_1 = __importDefault(require("./models/knjiga"));
const komentar_1 = __importDefault(require("./models/komentar"));
const desavanje_1 = __importDefault(require("./models/desavanje"));
const cita_knjigu_1 = __importDefault(require("./models/cita_knjigu"));
const pracenje_1 = __importDefault(require("./models/pracenje"));
const zanr_1 = __importDefault(require("./models/zanr"));
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.find({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/upload').post(upload.single('image'), function (req, res, next) {
    console.log(req.file);
    if (!req.file) {
        return res.status(500).send({ message: 'Upload fail' });
    }
    else {
        return res.json({ "p": req.file['filename'] });
    }
});
router.route('/logout').post((req, res) => {
    let username = req.body.username;
    user_1.default.updateOne({ 'username': username }, { $set: { 'last_active': new Date() } }, (err, l) => {
        res.json('logged out');
    });
});
router.route('/nadjiKnjigu').post((req, res) => {
    knjiga_1.default.find({ '_id': req.body.id }, (err, knj) => {
        if (err)
            console.log(err);
        else {
            res.json(knj);
        }
    });
});
router.route('/nadjiCitaKnjigu').post((req, res) => {
    cita_knjigu_1.default.findOne({ 'korisnik': req.body.kor._id, 'knjiga': req.body.id }, (err, knj) => {
        if (err)
            console.log(err);
        else {
            res.json(knj);
        }
    });
});
router.route('/updateCitaKnjigu').post((req, res) => {
    cita_knjigu_1.default.updateOne({ 'korisnik': req.body.kor._id, 'knjiga': req.body.id }, { $set: { 'ukupnoStr': req.body.uk, 'procitano': req.body.tr } }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json('done');
    });
});
router.route('/insertCitaKnjigu').post((req, res) => {
    cita_knjigu_1.default.update({ 'korisnik': req.body.kor._id, 'knjiga': req.body.id }, { 'korisnik': req.body.kor._id, 'knjiga': req.body.id, 'ukupnoStr': req.body.uk, 'procitano': req.body.tr }, { upsert: true }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json('done');
    });
});
router.route('/zaprati').post((req, res) => {
    pracenje_1.default.update({ 'pratioc': req.body.pratioc._id, 'praceni': req.body.praceni._id }, { 'pratioc': req.body.pratioc._id, 'praceni': req.body.praceni._id }, { upsert: true }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json('done');
    });
});
router.route('/obavijesti').post((req, res) => {
    console.log(req.body._id);
    pracenje_1.default.updateMany({ 'praceni': req.body._id }, { $push: { obavjestenja: `Korisnik ${req.body.username} koga pratite je komentarisao u trenutku ${new Date()}` } }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json('done');
    });
});
router.route('/komentarisi').post((req, res) => {
    komentar_1.default.update({ 'korisnik': req.body.kor._id, 'knjiga': req.body.knjiga, 'komentar': req.body.kom }, { 'korisnik': req.body.kor._id, 'knjiga': req.body.knjiga, 'ocjena': req.body.ocj, 'komentar': req.body.kom, 'autor': req.body.kor.ime, 'username': req.body.kor.username }, { upsert: true }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json('done');
    });
});
router.route('/findUser').post((req, res) => {
    user_1.default.find({ '_id': req.body.id }, (err, usr) => {
        if (err)
            console.log(err);
        else
            res.json(usr);
    });
});
router.route('/dohvObavjestenja').post((req, res) => {
    pracenje_1.default.find({ 'pratioc': req.body._id }, (err, prat) => {
        if (err)
            console.log(err);
        else
            res.json(prat);
    });
});
router.route('/vratiKorisnike').get((req, res) => {
    user_1.default.find({}, (err, usr) => {
        if (err)
            console.log(err);
        else
            res.json(usr);
    });
});
router.route('/getRegistrovaniKorisnici').get((req, res) => {
    user_1.default.find({ approved: 'yes' }, (err, usr) => {
        if (err)
            console.log(err);
        else
            res.json(usr);
    });
});
router.route('/getDesavanja').get((req, res) => {
    desavanje_1.default.find({}, (err, des) => {
        if (err)
            console.log(err);
        else
            res.json(des);
    });
});
router.route('/vratiProcitane').post((req, res) => {
    knjiga_1.default.find({ '_id': { $in: req.body.kor.knjige_procitao } }).skip(req.body.off * req.body.lmt).limit(req.body.lmt).exec((err, knj) => {
        if (err)
            console.log(err);
        else {
            res.json(knj);
        }
    });
});
router.route('/dohvatiZahtjeveKnjige').get((req, res) => {
    knjiga_1.default.find({ 'approved': 'no' }, (err, knj) => {
        if (err)
            console.log(err);
        else {
            res.json(knj);
        }
    });
});
router.route('/getZahtjeviRegistracija').get((req, res) => {
    user_1.default.find({ 'approved': 'no' }, (err, usr) => {
        if (err)
            console.log(err);
        else {
            res.json(usr);
        }
    });
});
router.route('/korUcestvuje').post((req, res) => {
    desavanje_1.default.find({ 'ucestvuju': req.body.kor._id, '_id': req.body.des._id }, (err, des) => {
        if (err)
            console.log(err);
        else {
            res.json(des);
        }
    });
});
router.route('/vratiTrenutne').post((req, res) => {
    knjiga_1.default.find({ '_id': { $in: req.body.kor.knjige_trenutno } }).skip(req.body.off * req.body.lmt).limit(req.body.lmt).exec((err, knj) => {
        if (err)
            console.log(err);
        else {
            res.json(knj);
        }
    });
});
router.route('/dalJeProcitana').post((req, res) => {
    knjiga_1.default.find({ '_id': { $in: req.body.kor.knjige_procitao } }, (err, knj) => {
        if (err)
            console.log(err);
        else {
            res.json(knj);
        }
    });
});
router.route('/vratiPlanirane').post((req, res) => {
    knjiga_1.default.find({ '_id': { $in: req.body.kor.knjige_za_citanje } }).skip(req.body.off * req.body.lmt).limit(req.body.lmt).exec((err, knj) => {
        if (err)
            console.log(err);
        else {
            res.json(knj);
        }
    });
});
router.route('/ukloniIzListe').post((req, res) => {
    user_1.default.updateOne({ '_id': req.body.idKor }, { $pull: { 'knjige_za_citanje': req.body.idKnj } }, { 'new': true }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json('success');
    });
});
router.route('/dozvoliZahtjeve').post((req, res) => {
    desavanje_1.default.update({ '_id': req.body._id }, { $push: { 'ucestvuju': req.body.zahtjevi }, $pullAll: { 'zahtjevi': req.body.zahtjevi } }, { 'new': true }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json('success');
    });
});
router.route('/getKorisnik').post((req, res) => {
    user_1.default.findOne({ '_id': req.body.id }, (err, usr) => {
        if (err)
            console.log(err);
        else
            res.json(usr);
    });
});
router.route('/dovuciJavnaDesavanja').get((req, res) => {
    desavanje_1.default.find({ $and: [{ $or: [{ 'status': 'aktivno' }, { 'status': 'planirano' }] }, { 'tip': 'javno' }] }, (err, des) => {
        if (err)
            console.log(err);
        else {
            res.json(des);
        }
    });
});
router.route('/nadjiKomentare').post((req, res) => {
    komentar_1.default.find({ 'knjiga': req.body.id }, (err, kom) => {
        if (err)
            console.log(err);
        else {
            res.json(kom);
        }
    });
});
router.route('/dovuciKomentare').post((req, res) => {
    komentar_1.default.find({ 'korisnik': req.body.id }, (err, kom) => {
        if (err)
            console.log(err);
        else {
            res.json(kom);
        }
    });
});
router.route('/pretragaKnjige').post((req, res) => {
    let autor = req.body.autor;
    let naziv = req.body.naziv;
    let zanr = req.body.zanr;
    let regexAut;
    let regexNaz;
    let regexZan;
    if (autor != "") {
        regexAut = new RegExp(".*" + autor + ".*", "i");
    }
    else
        regexAut = /.*/;
    if (naziv != "") {
        regexNaz = new RegExp(".*" + naziv + ".*", "i");
    }
    else
        regexNaz = /.*/;
    if (zanr != "") {
        regexZan = new RegExp(".*" + zanr + ".*", "i");
    }
    else
        regexZan = /.*/;
    knjiga_1.default.find({ $and: [{ 'naziv': { $regex: regexNaz } }, { 'autori': { $regex: regexAut } }, { 'zanrovi': { $regex: regexZan } }] }, (err, knjiga) => {
        if (err)
            console.log(err);
        else {
            res.json(knjiga);
        }
    });
});
router.route('/pretraziKorisnike').post((req, res) => {
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let username = req.body.username;
    let email = req.body.mail;
    console.log(ime);
    console.log(prezime);
    console.log(username);
    console.log(email);
    let regexIme;
    let regexPrezime;
    let regexUsername;
    let regexEmail;
    if (ime != "") {
        regexIme = new RegExp(".*" + ime + ".*", "i");
    }
    else
        regexIme = /.*/;
    if (prezime != "") {
        regexPrezime = new RegExp(".*" + prezime + ".*", "i");
    }
    else
        regexPrezime = /.*/;
    if (username != "") {
        regexUsername = new RegExp(".*" + username + ".*", "i");
    }
    else
        regexUsername = /.*/;
    if (email != "") {
        regexEmail = new RegExp(".*" + email + ".*", "i");
    }
    else
        regexEmail = /.*/;
    user_1.default.find({ $and: [{ 'ime': { $regex: regexIme } }, { 'prezime': { $regex: regexPrezime } }, { 'username': { $regex: regexUsername } }, { 'email': { $regex: regexEmail } }] }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route('/sendmail').post((req, res) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'reljag97@gmail.com',
            pass: "H@ck3R50"
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions = {
        from: 'reljag97@gmail.com',
        to: req.body.email,
        subject: `Promjena lozinke`,
        html: `<h1>Link za promjenu lozinke</h1>
                    <a href="http://localhost:4200/promjena">Promijeni lozinku</a>`
    };
    let email = req.body.email;
    user_1.default.find({ 'email': email }, (err, user) => {
        if (err)
            console.log(err);
        if (user[0]) {
            console.log("pronasao korisnika");
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send('error');
                }
                else {
                    console.log('Email sent: ' + info.response);
                    res.json('success');
                }
            });
        }
        else {
            console.log("Korisnik sa datim mejlom ne postoji");
            res.json("Korisnik sa datim e-mailom ne postoji");
        }
    });
});
router.route('/promijeni').post((req, res) => {
    user_1.default.updateOne({ username: req.body.usr }, { $set: { password: req.body.newP } }, (err, l) => {
        res.json('done');
    });
});
router.route('/dozvoliKnjigu').post((req, res) => {
    knjiga_1.default.updateOne({ _id: req.body.id }, { $set: { approved: 'yes' } }, (err, l) => {
        res.json('done');
    });
});
router.route('/dozvoliKorisnika').post((req, res) => {
    user_1.default.updateOne({ _id: req.body.id }, { $set: { approved: 'yes' } }, (err, l) => {
        res.json('done');
    });
});
router.route('/updateProsjek').post((req, res) => {
    knjiga_1.default.updateOne({ '_id': req.body.id }, { $set: { ocjena: req.body.pro } }, (err, l) => {
        res.json('done');
    });
});
router.route('/saveDesavanje').post((req, res) => {
    desavanje_1.default.updateOne({ '_id': req.body._id }, { $set: { status: req.body.status } }, (err, l) => {
        res.json('done');
    });
});
router.route('/saveUser').post((req, res) => {
    user_1.default.replaceOne({ '_id': req.body._id }, {
        'ime': req.body.ime,
        'prezime': req.body.prezime,
        'username': req.body.username,
        'password': req.body.password,
        'datum': req.body.datum,
        'grad': req.body.grad,
        'drzava': req.body.drzava,
        'email': req.body.email,
        'type': req.body.type,
        'approved': req.body.approved
    }, (err, l) => {
        res.json('done');
    });
});
router.route('/sacuvajKnjigu').post((req, res) => {
    knjiga_1.default.replaceOne({ '_id': req.body._id }, {
        'naziv': req.body.naziv,
        'autori': req.body.autori,
        'datum_izd': req.body.datum_izd,
        'zanrovi': req.body.zanrovi.split(","),
        'opis': req.body.opis,
    }, (err, l) => {
        res.json('done');
    });
});
router.route('/izmjeniKomentar').post((req, res) => {
    komentar_1.default.replaceOne({ '_id': req.body.id }, {
        'knjiga': req.body.knjiga,
        'korisnik': req.body.kor._id,
        'autor': req.body.kor.ime,
        'username': req.body.kor.username,
        'komentar': req.body.kom,
        'ocjena': req.body.ocj
    }, (err, l) => {
        res.json('done');
    });
});
router.route('/promijeniSifru').post((req, res) => {
    user_1.default.updateOne({ email: req.body.mail }, { $set: { password: req.body.pass } }, (err, l) => {
    });
    user_1.default.find({ 'email': req.body.mail }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/dodajPratioce').post((req, res) => {
    pracenje_1.default.find({ 'praceni': req.body.id }, (err, pra) => {
        if (err)
            console.log(err);
        else
            res.json(pra);
    });
});
router.route('/dohvatiZanrove').get((req, res) => {
    zanr_1.default.find({}, (err, zan) => {
        if (err)
            console.log(err);
        else
            res.json(zan);
    });
});
router.route('/vratiDesavanje').post((req, res) => {
    desavanje_1.default.find({ '_id': req.body.id }, (err, des) => {
        if (err)
            console.log(err);
        else
            res.json(des);
    });
});
router.route('/vratiKnjige').get((req, res) => {
    knjiga_1.default.find({}, (err, knj) => {
        if (err)
            console.log(err);
        else
            res.json(knj);
    });
});
router.route('/dodajProcitano').post((req, res) => {
    user_1.default.findOneAndUpdate({ '_id': req.body.kor._id }, { $push: { 'knjige_procitao': req.body.id } }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json(l);
    });
});
router.route('/dodajZahtjev').post((req, res) => {
    desavanje_1.default.findOneAndUpdate({ '_id': req.body.desavanje._id }, { $push: { 'zahtjevi': req.body.korisnik._id } }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json(l);
    });
});
router.route('/dodajZanr').post((req, res) => {
    zanr_1.default.update({ 'naziv': req.body.naziv }, { 'naziv': req.body.naziv, 'brojKnjiga': 0 }, { upsert: true }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json(l);
    });
});
router.route('/obrisiZanr').post((req, res) => {
    zanr_1.default.remove({ 'naziv': req.body.naziv, 'brojKnjiga': { $not: { $gt: 0 } } }, (err) => {
        if (err)
            console.log(err);
    });
});
router.route('/inkrementirajZanr').post((req, res) => {
    console.log(req.body.zanrovi);
    zanr_1.default.updateMany({ 'naziv': { $in: req.body.zanrovi } }, { $inc: { 'brojKnjiga': 1 } }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json(l);
    });
});
router.route('/dodajTrenutno').post((req, res) => {
    user_1.default.findOneAndUpdate({ '_id': req.body.kor._id }, { $push: { 'knjige_trenutno': req.body.id } }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json(l);
    });
});
router.route('/dodajZaCitanje').post((req, res) => {
    user_1.default.findOneAndUpdate({ '_id': req.body.kor._id }, { $push: { 'knjige_za_citanje': req.body.id } }, (err, l) => {
        if (err)
            console.log(err);
        else
            res.json(l);
    });
});
router.route('/register').post((req, res) => {
    let user = new user_1.default(req.body);
    user.save().
        then(user => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/dodajKnjigu').post((req, res) => {
    let knj = new knjiga_1.default(req.body);
    knj.save().
        then(user => {
        res.status(200).json({ 'knjiga': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'knjiga': 'no' });
    });
});
router.route('/dodajDesavanje').post((req, res) => {
    let des = new desavanje_1.default(req.body);
    des.save().
        then(des => {
        res.status(200).json({ 'desavanje': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'desavanje': 'no' });
    });
});
router.route('/news').get((req, res) => {
    user_1.default.findOne({ 'username': 'admin' }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user.get('news'));
        }
    });
});
router.route('/newsByUser').post((req, res) => {
    user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user.get('news'));
        }
    });
});
router.route('/addNewsToAdmin').post((req, res) => {
    user_1.default.collection.updateOne({ 'username': 'admin' }, { $push: { 'news': 'vest5' } });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map