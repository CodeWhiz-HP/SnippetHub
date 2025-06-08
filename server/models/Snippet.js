const mongoose = require("mongoose");
const Category = require("./Category");

const snippetSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    tags: String,
    pinned: Boolean,
    fileName: String,
    fileUrl: String,
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;