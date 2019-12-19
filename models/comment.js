var mongoose = require("mongoose");

//comment model
commentSchema = new mongoose.Schema(
    {
        text: String,
        author: {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
    }
)

module.exports = mongoose.model("Comments", commentSchema);