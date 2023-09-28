const {Router} = require('express');

const { buscarPorId, buscarTodos,eliminar, crear } = require('../../controladores/futbolista');


const router = Router();


//agregar
router.post('/futbolistas', crear);

// //eliminar
router.delete('/futbolistas/:idFutbolista', eliminar);

// //actualizar
// router.put('/futbolistas/:idFutbolista');

// //buscar
router.get('/futbolistas', buscarTodos);

//buscarPorID
router.get('/futbolistas/:idFutbolista', buscarPorId);



module.exports = router;