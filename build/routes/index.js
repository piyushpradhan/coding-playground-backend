"use strict";
var express = require("express");
var containerRoutes = require("./containerRoutes");
var router = express.Router();
var defaultRoutes = [
    {
        path: "/containers",
        route: containerRoutes,
    },
];
defaultRoutes.forEach(function (route) {
    router.use(route.path, route.route);
});
module.exports = router;
