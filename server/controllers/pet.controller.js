const Pet = require('../models/pet.model');

module.exports.createPet = (req, res) => {
    const { name, type, desc, skill1, skill2, skill3 } = req.body;
    Pet.create({name, type, desc, skill1, skill2, skill3})
    .then(pet => res.json(pet))
    .catch(err => res.status(400).json(err));
};

module.exports.getAllPets = (req, res) => {
    Pet.find({})
    .then(pets => res.json(pets))
    .catch(err => res.json(err));
};

module.exports.getPet = (req, res) => {
	Pet.findOne({ _id: req.params.id })
		.then(pet => res.json(pet))
		.catch(err => res.json(err));
};

module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
    .then(updatedPet => res.json(updatedPet))
    .catch(err => res.status(400).json(err));
};

module.exports.likePet = (req, res) => {
    Pet.updateOne( {_id: req.params._id},
        {$inc: {likes:1} } )
    .then(() => res.json({message:"Likes increased"}))
    .catch(err=> res.json(err));
};
module.exports.deletePet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err));
};