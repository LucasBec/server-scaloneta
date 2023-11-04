const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) =>{

    const erros = validationResult(req);

    // existen errors?
    if (!erros.isEmpty()){
        return res.status(400).json({estado:'FALLA', msj:erros.mapped()})
    }

    // no hay errores sigo con la ejecucion del controlador de la ruta
    next();
}

module.exports ={
    validarCampos,
}