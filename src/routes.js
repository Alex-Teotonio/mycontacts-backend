const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');
const CategorieController = require('./app/controllers/CategorieController');

const router = Router();

router.get('/contacts', ContactController.index);

router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts', ContactController.update);

router.get('/categories', CategorieController.index);
router.put('/categories/:id', CategorieController.update);
router.get('/categories/:id', CategorieController.show);
router.delete('/categories/:id', CategorieController.delete);
router.post('/categories', CategorieController.store);

module.exports = router;
