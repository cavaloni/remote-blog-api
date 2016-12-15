const mongoose = require('mongoose');


const blogSchema = mongoose.Schema(
 {
   title: {type: String, required: true}, 
   author: {
     firstName: {type: String, required: true}, 
     lastName: {type: String, required: true}
    }, 
   content: {type: String, required: true}
 }
);

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)

blogSchema.virtual('nameString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()});

blogSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    name: this.name,
    title: this.title,
    author: this.nameString
  };
}

const BlogPosts = mongoose.model('blogs', blogSchema);

module.exports = {BlogPosts};