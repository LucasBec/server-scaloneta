const conexion = require('./conexionBD');

//conssulta a la bd para buscar futbolista por ID
const buscarPorId = async (idFutbolista) => {

    const consulta = `SELECT  dni, nombre, apellido, apodo, foto,
    (CASE
        WHEN posicion = 0 THEN 'Arquero'
        WHEN posicion = 1 THEN 'Defensor'
        WHEN posicion = 2 THEN 'Mediocampista'
        WHEN posicion = 3 THEN 'Delantero'
        ELSE ''
    END) AS posicion,
    (CASE
        WHEN pieHabil = 0  THEN 'Derecho'
        WHEN pieHabil = 1 THEN 'Izquierdo'
        ELSE ''
    END) AS pieHabil
    FROM futbolista
    WHERE activo = 1 AND idFutbolista = ?`;

    const [futbolista] = await conexion.query(consulta,idFutbolista);

    return futbolista;
}


//conssulta a la base de datos para buscar todos los futbolistas
const buscarTodos = async () => {

    const consulta = `SELECT  dni, nombre, apellido, apodo, foto, 
    (CASE
        WHEN posicion = 0 THEN 'Arquero'
        WHEN posicion = 1 THEN 'Defensor'
        WHEN posicion = 2 THEN 'Mediocampista'
        WHEN posicion = 3 THEN 'Delantero'
        ELSE ''
    END) AS posicion,
    (CASE
        WHEN pieHabil = 0  THEN 'Derecho'
        WHEN pieHabil = 1 THEN 'Izquierdo'
        ELSE ''
    END) AS pieHabil
    FROM futbolista
    WHERE activo = 1`;

    const [futbolista] = await conexion.query(consulta);    

    return futbolista;
}

const eliminar = async (idFutbolista) => {
    const consulta = 'UPDATE futbolista SET activo = 0 WHERE idFutbolista = ?';
    await conexion.query(consulta, [idFutbolista]);    
}


const crear = async (futbolista) => {


    const consulta = 'INSERT INTO futbolista SET ?';
    const [futbolistaNuevo] = await conexion.query(consulta, futbolista);

    console.log(futbolistaNuevo.insertId);

    return buscarPorId(futbolistaNuevo.insertId);
}

// Función para buscar un futbolista por DNI
const buscarPorDNI = async (dni) => {
    const consulta = 'SELECT * FROM futbolista WHERE dni = ?';
    try {
        const [futbolista] = await conexion.query(consulta, [dni]);
        return futbolista[0]; // Devuelve el primer resultado (o null si no se encuentra)
    } catch (error) {
        throw error;
    }
};

// Función para verificar si un futbolista con un DNI ya existe
const futbolistaExistente = async (dni) => {
    const futbolista = await buscarPorDNI(dni);
    return futbolista !== null; // Devuelve true si el futbolista existe, false si no existe
};



module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear,
    buscarPorDNI,
    futbolistaExistente,
}

