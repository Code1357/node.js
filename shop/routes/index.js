'use strict';

const router = require("express").Router(); // ExpressとRouterを初期化

// routesフォルダに拡散した経路をまとめる(経路の入り口を作る)
const userRoutes = require("./userRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const courseRoutes = require("./courseRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./apiRoutes");

//　関連する経路モジュールからの経路を、名前空間付きで使う(下記のこれらは、ミドルウェアとして動作する)
router.use('/api',apiRoutes); // この経路はhomeRouteとerrorRoutesの経路よりも上に追加する必要がある。
router.use("/users", userRoutes); // "/users"は名前空間
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;


/* 名前空間
例えば、ルーティングが下記の場合、
router.get('/users/:id', usersController.show, usersController.showView);

routes -> index.jsで名前空間を設定する
router.use('/users', userRoutes);

routes -> userRoutes.jsでは
router.get('/:id', usersController.show, usersController.showView);
というように、/users を略す事ができる

APIで使うにも都合が良くなるし、整理でき見やすくなり、また管理しやすくなる
*/