const Router = require('express');

const {buscarPorId, buscarTodas, nueva, modificar} = require('../../controladores/convocatoria');


const router = Router();


router
    .post('/nueva', nueva)
    .put('/modificar/:idConvocatoria', modificar)
    .get('/convocatorias', buscarTodas)
    .get('/convocatorias/:idConvocatoria', buscarPorId);

module.exports = router;