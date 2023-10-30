// framework express
const express = require('express');
// envio de correo electrónicos
const nodemailer = require('nodemailer');
// para gestionar cors
const cors = require('cors');
// para loguear las peticiones que recibe el servidor
var morgan = require('morgan');
//para trabajar con el sistema de archivos: crear leer etc archivos
var fs = require('fs');
// trabajar con las rutas de archivos y directorios del sistema de archivos
var path = require('path');
// handlerbar 
const handlebars = require('handlebars');
// mysql
const mysql = require('mysql2');
// manejo de variables de entorno
require('dotenv').config();
// configuracion de passport
const passport = require("passport");
require('./config/passport');
// mi app servidor 
const app = express();


// recibimos datos en formato json
app.use(express.json());
// urlconded se encarga de analizar los datos codificados en la url y los coloca en el req.body 
// para poder trabajar con ellos en el manejdaor de la ruta.
app.use(express.urlencoded({extended:true}))


// ESTO NO SE VIO EN CLASES
// descomentar y mirar lo que muestra la consola en cada solicitud (get o post) que recibe el servidor
app.use(morgan('short')); 

// CREA UN ARCHIVO DE ACCESO
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


app.use(cors());

// endpoint de testeo del API
app.get('/', (req, res)=>{
    // const saludo = 'bienvenido a prog3 - 2023!';
    const saludo = {estado:true, mensaje:'bienvenido!'}
    res.status(200).json(saludo);
});


// las rutas del api


// middlEWare
const { esEntrenador } = require('./middlewares/esEntrenador');
const { esPresidente } = require('./middlewares/esPresidente');


const v1Publico = require('./v1/rutas/publico');
const v1Auth = require('./v1/rutas/auth');

const v1Rival = require('./v1/rutas/rival');
const v1Futbolista = require('./v1/rutas/futbolista');
const v1Convocatoria = require('./v1/rutas/convocatoria');
const v1FutbolistaConvocatoria = require('./v1/rutas/futbolistaConvocatoria');

const v1Estadistica = require('./v1/rutas/estadistica');


app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/auth', v1Auth);

app.use('/api/v1/futbolista', v1Futbolista); //acceso público
app.use('/api/v1/rival', v1Rival);

// la ruta necesita que el cliente este autenticado y sea entrenador
app.use('/api/v1/futbolista', [passport.authenticate('jwt', {session: false}), esEntrenador], v1Futbolista);
app.use('/api/v1/convocatoria', [passport.authenticate('jwt', {session: false}), esEntrenador], v1Convocatoria);
app.use('/api/v1/futbolistaConvocatoria', [passport.authenticate('jwt', {session: false}), esEntrenador], v1FutbolistaConvocatoria);
//dashboard para presidente
app.use('/api/v1/estadistica', [passport.authenticate('jwt', {session: false}), esPresidente], v1Estadistica);



app.listen(process.env.PUERTO, ()=>{
    console.log(`- 🛵 API prog3 iniciada en: http://localhost:${process.env.PUERTO}/`);
})