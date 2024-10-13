const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  quedusSuccessfullySolved: {
    type: Number,
    default: 0,
  },
  communityIds: [{ type: Types.ObjectId, ref: "Community", default: [] }],
  courses: [
    {
      name: {
        type: String,
        required: true,
      },
      personalQuedus: [
        {
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
          solved:{ // Al momento de compartir el quedu, esto cambiaría a un SolvedBy
            type: Boolean,
            default: false,
          },
          questions: [
            {
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
            },
          ],
        },
      ],
      "sharedQuedusIds": [{ type: Types.ObjectId, ref: "SharedQuedu" , default: [] }],
    },
  ],
   default: []
});

const User = mongoose.model("User", userSchema);

module.exports = User;
