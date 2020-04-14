// mendeklarasikan sebuah variabel dengan mengimpor library dari node_modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
// memuat semua variabel env dari file.env
require('dotenv').config();

const app = express();
// menentukan nomer port yang akan digunakan server
const port = process.env.PORT || 5000;

//mengkoneksikan ke database
mongoose.connect(process.env.DB, {
        useNewUrlParser: true
    })
    // apabila berhasil melakukan koneksi akan memunculkan pesan 'Database connected successfully'
    .then(() => console.log(`Database connected successfully`))
    // jika tidak berhasil maka memunculkan pesan err
    .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

// mengizinkan CORS Cross Origin Resource Sharing
// CORS adalah mekanisme untuk memberi tahu browser, apakah sebuah request yang di-dispatch dari aplikasi web domain lain atau origin lain, ke aplikasi web kita itu diperbolehkan atau tidak
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// set bodyParser sebagai middleware yang akan memparsing body request
app.use(bodyParser.json());

// set route
app.use('/api', routes);

// jika route tidak ditemukan menampilkan pesan err
app.use((err, req, res, next) => {
    console.log(err);
    next();
});

// server berjalan dengan menampilkan pesan Server runnig on port (nama port)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});