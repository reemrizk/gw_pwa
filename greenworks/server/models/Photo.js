const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  barcode: String,
  imageUrl: String,       // Relative or full URL to the uploaded photo
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Photo", photoSchema);
