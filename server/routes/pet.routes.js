const PetController = require('../controllers/pet.controller');
module.exports = function(app){
    app.post('/api/pets/new', PetController.createPet);
    app.get('/api/', PetController.getAllPets);
    app.get('/api/pets/:id', PetController.getPet);
    app.put('/api/pets/:id/edit', PetController.updatePet);
    app.put('/api/like/:id', PetController.likePet);
    app.delete('/api/pets/:id/delete', PetController.deletePet);
}