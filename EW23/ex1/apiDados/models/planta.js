const mongoose = require('mongoose');

const plantaSchema = new mongoose.Schema({
  _id: Number,
  numero_registo: Number,
  codigo_rua: Number,
  rua: String,
  local: String,
  freguesia: String,
  especie: {
    nome_comum: String,
    nome_cientifico: String,
    origem: String
  },
  estado: String,
  caracteristicas: {
    caldeira: Boolean,
    tutor: Boolean,
    implantacao: String
  },
  gestor: String,
  data_atualizacao: Date,
  numero_intervencoes: Number
});

module.exports = mongoose.model('plantas', plantaSchema);