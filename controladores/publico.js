const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req, res) =>{
    const {nombre, correo, mensaje} = req.body;
    
    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utiles/handlebars/plantilla.hbs'), 'utf8');
    
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
}