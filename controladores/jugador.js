const jugadorBD = require('../baseDatos/jugadorBD');

buscarPorId = async(req, res) => {
    try{
        const idJugador = req.params.idJugador;   
        
        if(!idJugador) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const jugador = await jugadorBD.buscarPorId(idJugador);

        res.json({estado:'OK', dato:jugador});

    }catch (exec){
        throw exec;
    }
}


module.exports = {
    buscarPorId,
}