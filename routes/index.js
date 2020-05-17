var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

router.route('/users/update/:id')
  .put(userController.updateUsers)
  .delete(userController.deleteUsers)
  .get(userController.idsearch);

router.route('/users/search/:reg')
  .get(userController.regexsearch);

router.route('/authenticate')
  .post(userController.authenticateUser)


router.route('/notes/:id')
  .put(userController.putNotes)
  .get(userController.getNotes)

router.route('/notes/:id/:noteId')
  .delete(userController.deleteNote)





module.exports = router;