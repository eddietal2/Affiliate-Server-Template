const mongoose = require('mongoose');
export {};

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 100
    },
    featured: {
      type: Boolean,
      default: false
    },
    datePosted: {
        type: Date
    },
    description: {
      type: String,
      maxlength: 300
    },
    category: {
      type: String,
      maxlength: 100
    },
    rating: {
      type: Number,
      maxlength: 1
    },
    duration: {
      type: Number,
      maxlength: 500
    },
    price: {
      type: Number,
      maxlength: 3
    },
    sample: {
      type: String,
      maxlength: 700
    },
    reviews: {
      type: Array,
      default: []
    },


})


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
