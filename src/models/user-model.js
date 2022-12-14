const { Schema, Types, model } = require('mongoose');
const yup = require('yup');
const HouseModel = require('./house-model');

const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  cartItems: {
    type: [{
      houseId: {
        type: Schema.Types.ObjectId,
        ref: 'House',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      }
    }],
    default: []
  },
  favoriteHouses: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    }],
    default: []
  },
}, {
  timestamps: true
});

const cartItemValidationSchema = yup.object({
  houseId: yup.string().typeError('User.cartItems element.houseId must be a string')
    .required('User.cartItems element.houseId is required')
    .test(
      'is-mongo-object-id',
      'User.cartItems element.houseId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .test(
      'house-exists',
      'house was not found using cartItems element.houseId ',
      async (houseId) => {
        const houseExists = await HouseModel.exists({ _id: houseId });

        return houseExists;
      }
    ),

  amount: yup.number().typeError('User.cartItems element.amount must be a number')
    .required('User.cartItems element.amount is required')
    .integer('User.cartItems element.amount must be integer')
    .positive('User.cartItems element.amount must be positive'),
});

const userValidationSchema = yup.object({
  email: yup
    .string().typeError('User.email must be a string')
    .required('User.email is required')
    .email('Invalid User.email format')
    .test(
      'email-check',
      'User.email already exists',
      async (email) => {
        const foundUser = await UserModel.findOne({ email });

        return foundUser === null;
      }
    ),

  password: yup.string().typeError('User.password must be a string')
    .required('User.password is required')
    .min(8, 'User.password must have at least 8 symbols')
    .max(32, 'User.password must be no more than 32 symbols')
    .matches(/[a-z]/, 'User.password must have at least one lowercase letter')
    .matches(/[A-Z]/, 'User.password must have at least one uppercase letter')
    .matches(/\d/, 'User.password must have at least one number')
    .matches(/\W/, 'User.password must have at least one special symbol'),

  passwordConfirmation: yup.string().typeError('User.passwordConfirmation must be a string')
    .required('User.passwordConfirmation is required')
    .oneOf([yup.ref('password')], 'User.passwordConfirmation does not match User.password'),

  role: yup.string().typeError('User.role must be a string')
    .oneOf(['USER', 'ADMIN']),

  cartItems: yup.array(cartItemValidationSchema),

  favoriteHouses: yup
    .array(yup.string().typeError('User.favoriteHouses element must be a string')
      .required('User.favoriteHouses element is required')
      .test(
        'is-mongo-object-id',
        'User.favoriteHouses element must be valid MongoDB object Id',
        Types.ObjectId.isValid
      )),
});

const userUpdateValidationSchema = yup.object({
  email: yup
    .string().typeError('User.email must be a string')
    .email('Invalid User.email format')
    .test(
      'email-check',
      'User.email already exists',
      async (email) => {
        const foundUser = await UserModel.findOne({ email });

        return foundUser === null;
      }
    ),

  password: yup
    .string().typeError('User.password must be a string')
    .min(8, 'User.password must have at least 8 symbols')
    .max(32, 'User.password must be no more than 32 symbols')
    .matches(/[a-z]/, 'User.password must have at least one lowercase letter')
    .matches(/[A-Z]/, 'User.password must have at least one uppercase letter')
    .matches(/\d/, 'User.password must have at least one number')
    .matches(/\W/, 'User.password must have at least one special symbol')
    .oneOf([yup.ref('passwordConfirmation')], 'User.password does not match User.passwordConfirmation'),

  passwordConfirmation: yup.string().typeError('User.passwordConfirmation must be a string'),

  role: yup.string().typeError('User.role must be a string')
    .oneOf(['USER', 'ADMIN']),

  cartItems: yup.array(cartItemValidationSchema),

  favoriteHouses: yup
    .array(yup.string().typeError('User.favoriteHouses element must be a string')
      .required('User.favoriteHouses element is required')
      .test(
        'is-mongo-object-id',
        'User.favoriteHouses element must be valid MongoDB object Id',
        Types.ObjectId.isValid
      )),
});

userSchema.statics.validateData = (userData) => userValidationSchema.validate(userData);
userSchema.statics.validateUpdateData = (userData) => userUpdateValidationSchema.validate(userData);
userSchema.statics.validateCartItem = (cartItem) => cartItemValidationSchema.validate(cartItem);

const UserModel = model('User', userSchema);

module.exports = UserModel;