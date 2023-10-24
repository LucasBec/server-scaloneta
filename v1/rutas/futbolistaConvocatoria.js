const Router = require('express');

const {nueva, FutbolistaConvocatoriaPorIdConvocatoria} = require('../../controladores/futbolistaConvocatoria');


const router = Router();


router
    .post('/nueva', nueva)    
    .get('/futbolistaConvocatoria/:idConvocatoria', FutbolistaConvocatoriaPorIdConvocatoria)

module.exports = router;