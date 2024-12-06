const {Schema, model} = require("mongoose");

const SampleSchema = new Schema({
  name: { type: String, required: true }

  
},    {
  timestamps: true,

});

module.exports = model("sample", SampleSchema);
