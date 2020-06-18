'use strict';

const router = require("express").Router();
const homeController = require("../controllers/homeController");

// 下記から、getとpostの経路(ルーティングパスを記入)
router.get('/', homeController.index); /*1*/
router.get('/contact', homeController.getSubscriptionPage); /*2*/
router.get('/chat', homeController.chat);

module.exports = router;