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


// Función para verificar si un futbolista con un DNI ya existe
const futbolistaExistente = async (dni) => {
    const futbolista = await buscarPorDNI(dni);
    return futbolista !== null; // Devuelve true si el futbolista existe, false si no existe
};

crear = async (req, res) => {
    const { dni, nombre, apellido, posicion, apodo, foto, pieHabil } = req.body;

    if (!dni || !nombre || !apellido || !posicion || !pieHabil) {
        res.status(404).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
    } else {
        // Primero, verifica si el DNI ya existe en la base de datos
        try {
            const futbolistaExistente = await futbolistaBD.buscarPorDNI(dni);

            if (futbolistaExistente) {
                // Si futbolistaExistente tiene un valor, significa que ya existe un futbolista con ese DNI
                res.status(400).json({ estado: 'FALLA', msj: 'El DNI ya ha sido registrado anteriormente' });
            } else {
                // Si no existe un futbolista con ese DNI, procede a crear el nuevo futbolista
                const futbolista = {
                    dni: dni,
                    nombre: nombre,
                    apellido: apellido,
                    posicion: posicion,
                    apodo: apodo,
                    foto: foto,
                    pieHabil: pieHabil
                };

                const futbolistaNuevo = await futbolistaBD.crear(futbolista);
                res.status(201).json({ estado: 'ok', msj: 'Futbolista creado', dato: futbolistaNuevo });
            }
        } catch (error) {
            res.status(500).json({ estado: 'FALLA', msj: 'Falla del servidor' });
        }
    }
}


//tener en cuenta que la funcion editar no permite editar el dni ya que es unico de cada persona
editar = async (req, res) => {
    const idFutbolista = req.params.idFutbolista; // Obtenemos el ID del futbolista de los parámetros
    const { nombre, apellido, posicion, apodo, pieHabil, foto } = req.body;
    
    if (!idFutbolista) {
        res.status(404).json({ estado: 'FALLO', msj: 'No se especificó el ID del futbolista' });
    } else if (!nombre || !apellido || !posicion || !pieHabil) {
        // ^Verificamos si falta alguno de los campos obligatorios^
        res.status(400).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
    } else {
        const nuevosDatos = {
            nombre: nombre,
            apellido: apellido,
            posicion: posicion,
            apodo: apodo,
            foto: foto,
            pieHabil: pieHabil
        };

        try {
            const futbolistaActualizado = await futbolistaBD.editar(nuevosDatos, idFutbolista);
            if (futbolistaActualizado) {
                res.status(200).json({ estado: 'OK', msj: 'Futbolista editado exitosamente', dato: futbolistaActualizado });
            } else {
                res.status(404).json({ estado: 'FALLO', msj: 'Futbolista no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ estado: 'FALLA', msj: 'Error al actualizar el futbolista' });
        }
    }
};





module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear,
    editar,
    futbolistaExistente,
}