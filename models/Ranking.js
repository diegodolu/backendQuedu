const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const rankingSchema = new Schema({
    month: {
      type: String,
      required: true,
    },
    ranking: {
      topContributors: [{ type: Types.ObjectId, ref: "User" }],
      topSolvers: [{ type: Types.ObjectId, ref: "User" }],
    },
  });

const Ranking = mongoose.model("Ranking", rankingSchema);

module.exports = Ranking;