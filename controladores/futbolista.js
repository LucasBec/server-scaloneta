const futbolistaBD = require('../baseDatos/futbolistaBD');

buscarPorId = async(req, res) => {
    try{
        const idFutbolista = req.params.idFutbolista;   
        
        if(!idFutbolista) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const futbolista = await futbolistaBD.buscarPorId(idFutbolista);

        res.json({estado:'OK', dato:futbolista});

    }catch (exec){
        throw exec;
    }
}


module.exports = {
    buscarPorId,
}

buscarTodos = async(req, res) => {
    try{
        const futbolistas = await futbolistaBD.buscarTodos();

        res.json({estado:'OK', dato:futbolistas});

    }catch (exec){
        throw exec;
    }
}

eliminar = async (req, res) => {
    const idFutbolista = req.params.idFutbolista;

    if(!idFutbolista){
        res.status(404).json({estado:'FALLO', msj:'no se especifico el id del futbolista'});
    }else{
        try{
            await futbolistaBD.eliminar(idFutbolista);
            res.status(200).json({estado:'OK', msj:'futbolista eliminado'});
        }catch (error){
            throw exec;
        }
    }
}

crear = async (req, res) => {

    const {dni, nombre, apellido, posicion, apodo, foto, pieHabil} = req.body;

    if(!dni || !nombre || !apellido || !posicion || !pieHabil){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        const futbolista = {
            dni:dni,
            nombre:nombre,
            apellido:apellido,
            posicion:posicion,
            apodo:apodo,
            foto:foto,
            pieHabil:pieHabil
        }; 


        try{
            const futbolistaNuevo = await futbolistaBD.crear(futbolista);
            res.status(201).json({estado:'ok', msj:'Futbolista creado', dato:futbolistaNuevo});
        }catch(exec){
            throw exec;
        }
    }
}


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear
}