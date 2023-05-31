const router = require('express').Router()
const usersController = require('../controller/users')


router.get('/:userId', usersController.getUserById)
router.patch('/:userId',()=>{})
router.delete('/:userId',usersController.deleteUserById)
router.get('/', usersController.getUsers);
router.post('/', usersController.postUser);

module.exports = router