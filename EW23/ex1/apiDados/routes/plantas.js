const express = require('express');
const router = express.Router();
const plantaController = require('../controllers/planta');

// GET /plantas - with optional query params
router.get('/', function(req, res) {
    if (req.query.especie) {
        plantaController.getByEspecie(req.query.especie)
            .then(data => res.jsonp(data))
            .catch(err => res.status(500).jsonp(err));
    } else if (req.query.implant) {
        plantaController.getByImplantacao(req.query.implant)
            .then(data => res.jsonp(data))
            .catch(err => res.status(500).jsonp(err));
    } else {
        plantaController.list()
            .then(data => res.jsonp(data))
            .catch(err => res.status(500).jsonp(err));
    }
});

// GET /plantas/freguesias - must come before /:id
router.get('/freguesias', function(req, res) {
    plantaController.getFreguesias()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
});

// GET /plantas/especies - must come before /:id
router.get('/especies', function(req, res) {
    plantaController.getEspecies()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
});

// GET /plantas/:id
router.get('/:id', function(req, res) {
    plantaController.getById(req.params.id)
        .then(data => {
            if (data) {
                res.jsonp(data);
            } else {
                res.status(404).jsonp({error: "Planta não encontrada"});
            }
        })
        .catch(err => res.status(500).jsonp(err));
});

// POST /plantas
router.post('/', function(req, res) {
    plantaController.create(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(err => res.status(500).jsonp(err));
});

// DELETE /plantas/:id
router.delete('/:id', function(req, res) {
    plantaController.delete(req.params.id)
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(204).end();
            } else {
                res.status(404).jsonp({error: "Planta não encontrada"});
            }
        })
        .catch(err => res.status(500).jsonp(err));
});

module.exports = router;