const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  price: Number,
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
