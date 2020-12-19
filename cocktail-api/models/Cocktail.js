const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  recipe: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
  ingredients: {
    type: Schema.Types.Mixed,
    required: true
  },
});


const Cocktail = mongoose.model("Cocktail", CocktailSchema);

module.exports = Cocktail;