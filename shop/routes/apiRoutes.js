'use strict';

const router = require("express").Router();
const coursesController = require("../controllers/coursesController");
const usersController = require("../controllers/usersController");

// Express.jsのルータにAPI経路を追加
router.use(usersController.verifyToken);
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON)
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);

// APIのエラー処理ミドルウェアを追加
router.use(coursesController.errorJSON);

module.exports = router;


/* 本来、上記は名前空間を利用しなければ、下記のように記述する
router.get(" /api/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
 "/api/courses",
 coursesController.index,
 coursesController.filterUserCourses,
 coursesController.respondJSON
*/