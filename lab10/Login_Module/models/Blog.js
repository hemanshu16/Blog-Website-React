const mongoose = require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    content: {
        type: String,
        required:true
    },
    author_id :{
    type: String,
    required: true,
    },
    date : {
        type : Date,
        required : true,
    },
    likes : {
        type : Number,
        required : true
    },
    comments : {
        type : [ { author_id : String, comment : String}]
    }
});
module.exports = mongoose.model("blog", blogSchema);