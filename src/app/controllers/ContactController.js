// index => Listar registros
// show => Obter registros
// store = > Criar registros
// update => Atualizar registros
// delete => Deletar registros

const isValidUUID = require('../utils/isValidUUID');
const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    response.json(await ContactRepository.findAll(orderBy));
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user Id' });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }
    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactRepository.delete(id);
    // 204 => No content.
    response.sendStatus(204);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;
    // const emailExists = await ContactRepository.findByEmail(email);

    // if (emailExists) {
    //   return response.status(404).json({ error: 'Email is already exists' });
    // }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    const categoryId = category_id || null;
    const emailValid = email || null;
    const newContact = await ContactRepository.create(name, emailValid, phone, categoryId);

    return response.json(newContact);
  }

  async update(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user Id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }
    const contactExistis = ContactRepository.findById(id);

    if (!contactExistis) {
      return response.status(404).json({ error: 'User not found' });
    }
    const newContactUpdate = await ContactRepository.update(id, {
      name, email, phone, category_id: category_id || null,
    });

    return response.json(newContactUpdate);
  }
}

// Aplicando pattern Singleton => A classe em questão só pode ser instanciada uma vez
module.exports = new ContactController();
