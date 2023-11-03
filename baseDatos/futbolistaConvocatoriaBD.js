const conexion = require('./conexionBD');

const borrarPorIdConvocatoria = async (cn,idConvocatoria) => {

    const consulta = 'DELETE FROM futbolistaConvocatoria WHERE convocatoria = ?;';
    const [result] = await cn.query(consulta, idConvocatoria);
    
    return result;
}

const FutbolistaConvocatoriaPorIdConvocatoria = async (idConvocatoria) => {
    const consulta = `SELECT f.idFutbolista, f.nombre, f.apellido, fc.dorsal, fc.convocatoria,
                        (CASE
                            WHEN posicion = 0 THEN 'Arquero'
                            WHEN posicion = 1 THEN 'Defensor'
                            WHEN posicion = 2 THEN 'Mediocampista'
                            WHEN posicion = 3 THEN 'Delantero'
                        END) as posicion,
                        (CASE
                            WHEN fc.esTitular = 0 THEN 'No'
                            WHEN fc.esTitular = 1 THEN 'Si'
                        END) as titular,
                        (CASE
                            WHEN fc.esCapitan = 0 THEN 'No'
                            WHEN fc.esCapitan = 1 THEN 'Si'
                        END) as capitan                        
                        FROM futbolista AS f
                        INNER JOIN futbolistaConvocatoria AS fc on fc.futbolista = f.idFutbolista
                        WHERE f.activo = 1 AND fc.convocatoria = ?`;

    const [convocados] = await conexion.query(consulta,idConvocatoria);    

    return convocados;
}



const nueva =  async(idConvocatoria,futbolistas) => {
    const cn = await conexion.getConnection();

    try {
        await cn.beginTransaction();
 
        await borrarPorIdConvocatoria(cn,idConvocatoria);
        
        futbolistas.forEach(async element => {
            const dato = {convocatoria:idConvocatoria, futbolista:element}
            const consulta = 'INSERT INTO futbolistaConvocatoria SET ?';
            const [result] = await cn.query(consulta, dato);
        })

        await cn.commit();
    } catch (error) {
        await cn.rollback();
        throw error;
    } finally {
        cn.release();
    }
}

const actualizarEsCapitanYEsTitular = async (idFutbolista, idConvocatoria, esCapitan, esTitular) => {
    const consulta = 'UPDATE futbolistaConvocatoria SET esCapitan = ?, esTitular = ? WHERE futbolista = ? AND convocatoria = ?';
    try {
        const [result] = await conexion.query(consulta, [esCapitan, esTitular, idFutbolista, idConvocatoria]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    nueva,
    borrarPorIdConvocatoria,
    FutbolistaConvocatoriaPorIdConvocatoria,
    actualizarEsCapitanYEsTitular,
    conexion,
}
