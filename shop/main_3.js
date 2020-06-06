
// リクエストのパスに応じて対応する経路???
router.get('/courses', homeController.showCourses);

// Errorの経路???
router.use(errorControllers.pageNotFoundError);
router.use(errorControllers.internalServerError);
