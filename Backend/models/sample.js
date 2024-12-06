const {Schema, model} = require("mongoose");

const SampleSchema = new Schema({
  name: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Sample", SampleSchema);
