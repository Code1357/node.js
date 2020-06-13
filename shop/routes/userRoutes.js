'use strict';

const router = require('express').Router();
const usersController = require('../controllers/usersController');

 
// mail.jsからの移動
router.get('/', usersController.index /*3*/, usersController.indexView /*3.1*/);
router.get('/new', usersController.new); /*4*/
router.post('/create', /* usersController.validate */ usersController.create, /*5*/usersController.redirectView); /*5.1*/
router.get("/login", usersController.login);
router.post('/login', usersController.authenticate); // login時のPOSTリクエスト処理
router.get('/:id/edit', usersController.edit);
router.get("/logout", usersController.logout, usersController.redirectView);
router.put("/:id/update", usersController.update, usersController.redirectView); // PUT
router.delete("/:id/delete", usersController.delete, usersController.redirectView); // DELETE
router.get('/:id', usersController.show, usersController.showView); /*6*/

module.exports = router;