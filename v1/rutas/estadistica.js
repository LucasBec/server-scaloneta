const Router = require('express');

const {estadistica} = require('../../controladores/estadistica');

const router = Router();

router
    .get('/estadistica', estadistica);

module.exports = router;