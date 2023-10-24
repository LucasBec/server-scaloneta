const conexion = require('./conexionBD');

const estadistica = async () => {
    // este procedimiento almacenado retorna 2 valores de forma separada la proxima clase lo mejoramos
    const consulta = 'call procEstadistica()';
    
    const [results] = await conexion.query(consulta);    
    
    // console.log(results);
    const convocatorias = results[1][0].convocatorias;
    const futbolistas = results[0][0].futbolistas;

    const datos = {
        futbolistasActivos : futbolistas,
        convocatorias : convocatorias
    }

    return datos;
}


module.exports = {
    estadistica
}
