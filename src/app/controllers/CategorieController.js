const CategorieRepository = require('../repositories/CategorieRepository');

class CategorieController {
  async index(request, response) {
    const rows = await CategorieRepository.findAll();

    return response.json(rows);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ error: 'Name is required' });
    }

    const categorieExists = CategorieRepository.findByName(name);

    if (!categorieExists) {
      return response.status(400).json({ error: 'Categorie is already exists' });
    }

    const newCategorie = await CategorieRepository.create(name);

    return response.json(newCategorie);
  }

  async show(request, response) {
    const { id } = request.params;

    const row = CategorieRepository.findById(id);

    if (!row) {
      return response.status(404).json({ error: 'Categorie not found' });
    }

    return response.json(row);
  }

  async delete(request, response) {
    const { id } = request.params;

    const deleteOp = CategorieRepository.delete(id);

    return response.status(200).json(deleteOp);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name } = request.body;

    const nameExists = CategorieRepository.findByName(name);

    if (!nameExists) {
      return response.status(404).json({ error: 'Categorie nof found' });
    }

    const newCategorieUpdate = CategorieRepository.update(id, name);

    return response.status(200).json(newCategorieUpdate);
  }
}

module.exports = new CategorieController();
