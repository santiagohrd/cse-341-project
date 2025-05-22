const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');
const validation = require('../middleware/validate')

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

// router.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
router.post('/', validation.saveContact, contactsController.createContact);
router.put('/:id', validation.saveContact, contactsController.updateContact);


router.delete('/:id', userController.deleteUser);



module.exports = router;