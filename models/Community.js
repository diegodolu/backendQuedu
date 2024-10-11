const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const communitySchema = new Schema({
    name: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    numberOfQuedus: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sharedQuedusIds: [{ type: Types.ObjectId, ref: "SharedQuedu" }],
  });

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;