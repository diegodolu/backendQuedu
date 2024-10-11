const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

// Definir el esquema de preguntas
const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  answers: [
    {
      answer: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

// Definir el esquema de SharedQuedu
const sharedQueduSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  successPercentaje: {
    type: Number,
    required: true,
  },
  attempt: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  solvedBy: [{ type: Types.ObjectId, ref: "User" }],
  questions: [questionSchema],
});

const SharedQuedu = mongoose.model("SharedQuedu", sharedQueduSchema);

module.exports = SharedQuedu;