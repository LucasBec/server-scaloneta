const {Router} = require('express');

const { buscarPorId, buscarTodos,eliminar, crear, editar } = require('../../controladores/futbolista');


const router = Router();


//agregar
router.post('/futbolistas', crear);

// //eliminar
router.delete('/futbolistas/:idFutbolista', eliminar);

// //actualizar
router.put('/futbolistas/:idFutbolista', editar);

// //buscar
router.get('/futbolistas', buscarTodos);

//buscarPorID
router.get('/futbolistas/:idFutbolista', buscarPorId);



module.exports = router;