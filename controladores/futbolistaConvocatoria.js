const futbolistasConvocatoriaBD = require('../baseDatos/futbolistaConvocatoriaBD');


nueva  = async (req, res) => {
    const {idConvocatoria, futbolistas} = req.body;
    try{
        const nuevaLista = await futbolistasConvocatoriaBD.nueva(idConvocatoria,futbolistas);
        console.log('futbolistas: ',futbolistas)
        res.status(201).json({estado:'OK', msj:'Convocatoria Realizada!'});
    }catch (exec){
        throw exec;
    }
};

FutbolistaConvocatoriaPorIdConvocatoria = async (req, res) => {
    const {idConvocatoria} = req.params;

    try{
        const convocados = await futbolistasConvocatoriaBD.FutbolistaConvocatoriaPorIdConvocatoria(idConvocatoria);
        res.status(201).json({estado:'OK', dato:convocados});
        console.log('convocados: ', convocados)
    }catch (exec){
        throw exec;
    }
};

const actualizarEquipoTitular = async (idConvocatoria, equipoTitular) => {
    const { titulares, capitan } = equipoTitular;
    const cn = await futbolistasConvocatoriaBD.conexion.getConnection();
    try {
        await cn.beginTransaction();
        for (const idFutbolista of titulares) {
            await futbolistasConvocatoriaBD.actualizarEsCapitanYEsTitular(idFutbolista, idConvocatoria, 0, 1);
        }
        if (capitan.length > 0) {
            await futbolistasConvocatoriaBD.actualizarEsCapitanYEsTitular(capitan[0], idConvocatoria, 1, 1);
        }
        await cn.commit();
    } catch (error) {
        await cn.rollback();
        throw error;
    } finally {
        cn.release();
    }
};

equipoTitular = async (req, res) => {
    const { idConvocatoria, equipoTitular } = req.body;
    try {
        await actualizarEquipoTitular(idConvocatoria, equipoTitular);
        res.status(200).json({ estado: 'OK', msj: 'Equipo titular establecido con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al establecer el equipo titular.' });
    }
};



module.exports = {
    nueva,
    FutbolistaConvocatoriaPorIdConvocatoria,
    equipoTitular,

};

