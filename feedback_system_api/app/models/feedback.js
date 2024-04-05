const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const validator = require('validator')

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      required: true
    },
    message: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      required: false
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

FeedbackSchema.plugin(mongoosePaginate)
FeedbackSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('Feedback', FeedbackSchema)
