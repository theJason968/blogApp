var express = require("express");
var router = express.Router();
var blogModel = require("../models/blog");

router.get("/blogs", (req, res) =>{
    blogModel.find({}, function(err, blogs){
        if(err){
            console.log("error")
        }else{
            res.render("main/index", {blogs: blogs});
        }
    });
});

//new ROUTE
router.get("/blogs/new", (req, res) =>{
    res.render("new");
});

//CREATE ROUTE
router.post("/blogs", (req, res) =>{
    // let title = req.body.blog.title;
    // let image = req.body.blog.image;
    // let body = req.body.blog.body;
    // let blogData = {title: title, image: image, body: body}
    //create blog
    blogModel.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("error")
        }else{
            res.redirect("/blogs")
        }
    });
});

//SHOW ROUTE
router.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, findBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("main/show", {blog: findBlog});
        }
    });
});

//EDIT ROUTE
router.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, findBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("main/edit", {blog: findBlog});
        }
    });
});

//UPDATE ROUTE
router.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs")
        }z
    });
});