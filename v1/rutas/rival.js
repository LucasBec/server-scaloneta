const {Router} = require('express');

const { buscarPorId, buscarTodos,eliminar, crear, modificar } = require('../../controladores/rival');

const router = Router();

router
    .get('/rivales', buscarTodos)
    .get('/rivales/:idRival', buscarPorId);


module.exports = router;
