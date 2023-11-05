const Router = require('express');

const {buscarPorId, buscarTodas, nueva, resultado} = require('../../controladores/convocatoria');


const router = Router();


router
    .post('/nueva', nueva)
    .put('/convocatorias/:idConvocatoria', resultado)
    .get('/convocatorias', buscarTodas)
    .get('/convocatorias/:idConvocatoria', buscarPorId);

module.exports = router;