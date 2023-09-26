const {Router} = require('express');

const { buscarPorId } = require('../../controladores/jugador');



const router = Router();


//agregar
// router.post('/jugadores');

// //eliminar
// router.delete('/jugadores/:idJugador');

// //actualizar
// router.put('/jugadores/:idJugador');

// //buscar
// router.get('/jugadores');

//buscarPorID
router.get('/jugadores/:idJugador', buscarPorId);



module.exports = router;