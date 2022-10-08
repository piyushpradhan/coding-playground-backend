"use strict";
const express = require("express");
const containerRoutes = require("./containerRoutes");
const router = express.Router();
const defaultRoutes = [
    {
        path: "/containers",
        route: containerRoutes,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;
