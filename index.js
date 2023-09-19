// framework express
const express = require('express');
// envio de correo electrónicos
const nodemailer = require('nodemailer');

// para gestionar cors
const cors = require('cors');

// ESTO NO SE VIO EN CLASES
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


// mi app servidor 
const app = express();

// recibimos datos en formato json
app.use(express.json());
// urlconded se encarga de analizar los datos codificados en la url y los coloca en el req.body 
// para poder trabajar con ellos en el manejdaor de la ruta.
app.use(express.urlencoded({extended:true}))


// ESTO NO SE VIO EN CLASES
// descomentar y mirar lo que muestra la consola en cada solicitud (get o post) que recibe el servidor
app.use(morgan('dev')); 

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


app.post('/contacto', (req, res)=>{
    const {nombre, correo, mensaje} = req.body;
    
    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '/handlebars/plantilla.hbs'), 'utf8');
    
    const correoTemplate = handlebars.compile(plantillaHds2);
  
    // Datos de la plantilla
    const datos = {
      nombre: nombre,
      correo: correo,
      mensaje: mensaje
    };
  
    // Renderizo la plantilla con los datos
    const correoHtml = correoTemplate(datos);

    // console.log(correoHtml);
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })

    const opciones = {
        from : correo,
        to:'oreopepito01@gmail.com',
        subject:'Consulta App Scaloneta',
        html: correoHtml
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            // console.log('error -> ', error);
            const respuesta = 'correo no enviado';
            res.json({respuesta});
        }else{
            // console.log(info);
            const respuesta = 'correo enviado';
            res.json({respuesta});
        }
    })
});


// conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'scaloneta12',
    database: 'scaloneta12',
    password: '2023$prog3'
});

app.get('/jugadores', (req, res) =>{
    const consulta = 'SELECT * FROM futbolista WHERE activo = 1';
    conexion.execute(consulta, (error, resultado, campos) => {
        if (error){
            console.log(error);
        }else{
            console.log(campos);
            res.status(200).json(resultado);
        }
    })
});



app.listen(process.env.PUERTO, ()=>{
    console.log('API prog3 iniciada ' + process.env.PUERTO);
})