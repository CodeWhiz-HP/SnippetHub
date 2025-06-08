const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name: String,
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
    
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;