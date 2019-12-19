var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOveride = require("method-override"),
    sanitizer = require("express-sanitizer");

var app = express();
mongoose.connect("mongodb://localhost/restful_blog", {useNewUrlParser: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//Use sanitizer after body-parser
app.use(sanitizer());
app.use(methodOveride("_method"));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//Model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now} 
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "po",
//     image: "https://images.unsplash.com/photo-1575015642299-5b92fcbd0ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     body: "aa"
// });

app.get("/", (req, res) =>{
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) =>{
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error")
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});

//new ROUTE
app.get("/blogs/new", (req, res) =>{
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", (req, res) =>{
    // let title = req.body.blog.title;
    // let image = req.body.blog.image;
    // let body = req.body.blog.body;
    // let blogData = {title: title, image: image, body: body}
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("error")
        }else{
            res.redirect("/blogs")
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, findBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("show", {blog: findBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, findBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: findBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
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
app.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs")
        }z
    });
});

app.listen(3000, function(){
    console.log("Server running");
});