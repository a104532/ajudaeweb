const Planta = require('../models/planta');

// List all plants
exports.list = async () => {
    return await Planta.find();
};

// Get plant by ID
exports.getById = async (id) => {
    return await Planta.findById(id);
};

// Get plants by species
exports.getByEspecie = async (especie) => {
    return await Planta.find({'especie.nome_comum': especie});
};

// Get plants by implantation
exports.getByImplantacao = async (implantacao) => {
    return await Planta.find({'caracteristicas.implantacao': implantacao});
};

// Get all freguesias (sorted, unique)
exports.getFreguesias = async () => {
    const freguesias = await Planta.distinct('freguesia');
    return freguesias.sort();
};

// Get all species (sorted, unique)
exports.getEspecies = async () => {
    return await Planta.aggregate([
        {
            $group: {
                _id: {
                    cientifico: "$especie.nome_cientifico",
                    comum: "$especie.nome_comum"
                }
            }
        },
        {
            $project: {
                _id: 0,
                nome_cientifico: "$_id.cientifico",
                nome_comum: "$_id.comum"
            }
        },
        {
            $sort: { nome_cientifico: 1 }
        }
    ]);
};

// Create new plant
exports.create = async (plantaData) => {
    const planta = new Planta(plantaData);
    return await planta.save();
};

// Delete plant
exports.delete = async (id) => {
    return await Planta.deleteOne({_id: id});
};