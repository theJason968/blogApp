var express = require("express");
var router = express.Router();
var blogModel = require("../models/blog");


router.get("/", (req, res) =>{
    res.render("landingPage");
});
