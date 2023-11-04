const conexion = require('./conexionBD');

const estadistica = async () => {

    const consulta = 'call procEstadistica()';
    
    const [results] = await conexion.query(consulta);    
    
    // console.log(results);
    const convocatorias = results.convocatorias;
    const futbolistas = results.totalFutbolistas;
    const fecha = results.fechaUltimasConvocatorias;

    const datos = {
        totalFutbolistas : futbolistas,
        convocatorias : convocatorias,
        fechaProximoPartido : fecha
    }

    return datos;
}


module.exports = {
    estadistica
}

