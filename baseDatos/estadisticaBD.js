const conexion = require('./conexionBD');

const estadistica = async () => {
    try {
        const consulta = 'call procEstadistica()';
        const [results] = await conexion.query(consulta);

        if (results && results[0] && results[0][0]) {
            const futbolistas = results[0][0].totalFutbolistas;
            const convocatorias = results[0][0].convocatorias;

            let fecha = '';
            if (results[0][0].fechaUltimasConvocatorias) {
                fecha = results[0][0].fechaUltimasConvocatorias;
            }

            const datos = {
                totalFutbolistas: futbolistas,
                convocatorias: convocatorias,
                fechaProximoPartido: fecha,
            };

            return datos;
        } else {
            // En este punto, los datos no están en la estructura esperada.
            console.error('La estructura de los resultados no es la esperada.');
            return null;
        }
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        return null;
    }
};

module.exports = {
    estadistica,
};
