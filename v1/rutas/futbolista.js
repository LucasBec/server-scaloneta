const {Router} = require('express');
const {upload} = require("../../controladores/subirArchivo");

const { buscarPorId, buscarTodos,eliminar, crear, editar } = require('../../controladores/futbolista');


const router = Router();


//agregar
router.post('/futbolistas', upload, crear);

// //eliminar
router.delete('/futbolistas/:idFutbolista', eliminar);

// //actualizar
router.put('/futbolistas/:idFutbolista', editar);

// //buscar
router.get('/futbolistas', buscarTodos);

//buscarPorID
router.get('/futbolistas/:idFutbolista', buscarPorId);



module.exports = router;