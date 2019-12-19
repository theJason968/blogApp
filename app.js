var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOveride = require("method-override"),
    sanitizer = require("express-sanitizer"),
    expressSession = require("express-session")

//require routes
var blogRoute = require("./routes/blog"),
    indexRoute = require("./routes/index")

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

// Blog.create({
//     title: "po",
//     image: "https://images.unsplash.com/photo-1575015642299-5b92fcbd0ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     body: "aa"
// });

app.use("/blogs", blogRoute);
app.use("/", indexRoute);

app.listen(3000, function(){
    console.log("Server running");
});