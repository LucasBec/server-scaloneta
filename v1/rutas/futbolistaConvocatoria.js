const Router = require('express');

const {nueva, FutbolistaConvocatoriaPorIdConvocatoria, equipoTitular} = require('../../controladores/futbolistaConvocatoria');


const router = Router();


router
    .post('/nueva', nueva)    
    .get('/futbolistaConvocatoria/:idConvocatoria', FutbolistaConvocatoriaPorIdConvocatoria)
    .put('/equipoTitular', equipoTitular)

module.exports = router;