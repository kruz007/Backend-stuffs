// require mongoose
// From mongoose we use a method which is Schema(this defines the structure of  the document we would store in a collection, its the thing that wraps around, note the S in Schema is capitalized)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const traineeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// lets create our model(model is what surrounds the Schema and provides us with an interface by which to communicate with our DB)

const Trainees = mongoose.model("Trainee", traineeSchema);

module.exports = Trainees;
