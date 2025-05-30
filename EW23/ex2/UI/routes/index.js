const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_URL = 'http://localhost:15030/plantas';

// Rota principal - Lista de registros
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.render('index', {
      title: 'Lista de Plantas',
      plantas: response.data
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Erro ao carregar plantas');
  }
});

// Detalhe da planta
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    const planta = response.data;
    
    res.render('planta', {
      title: `Planta ${planta._id}`,
      planta: planta
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('error', {
      message: 'Planta não encontrada',
      error: error.response?.data || error.message
    });
  }
});

// Página da espécie
router.get('/especies/:nome', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const plantasEspecie = response.data.filter(p => 
      p.especie.nome_comum.toLowerCase() === req.params.nome.toLowerCase()
    );
    
    if (plantasEspecie.length === 0) {
      return res.status(404).send('Espécie não encontrada');
    }

    res.render('especie', {
      title: `Espécie ${req.params.nome}`,
      especie: {
        nome_comum: req.params.nome,
        nome_cientifico: plantasEspecie[0].especie.nome_cientifico
      },
      plantas: plantasEspecie
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Erro ao carregar dados da espécie');
  }
});

module.exports = router;