const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const houseSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const houseValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Title must be a string')
    .required('Title is required'),
  description: yup
    .string().typeError('Description must be a string')
    .required('Description is required'),
  categoryId: yup
    .string().typeError('CategoryId must be a string')
    .test(
      'is-mongo-object-id',
      'CategoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .required('CategoryId is required'),
  img: yup
    .string().typeError('Img must be a string')
    .required('Img is required'),
  price: yup
    .number().typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive')
});

const houseUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Title must be a string'),
  description: yup.string().typeError('Description must be a string'),
  categoryId: yup.string().typeError('CategoryId must be a string')
    .test(
      'is-mongo-object-id',
      'CategoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  img: yup.string().typeError('Img must be a string'),
  price: yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive'),
});

houseSchema.statics.validate = (houseData) => houseValidationSchema.validateSync(houseData)
houseSchema.statics.validateUpdate = (houseData) => houseUpdateValidationSchema.validateSync(houseData)

const HouseModel = model('House', houseSchema);

module.exports = HouseModel;