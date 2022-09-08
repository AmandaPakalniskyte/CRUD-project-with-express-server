const { Schema, model } = require('mongoose');

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
    type: String,
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

const HouseModel = model('House', houseSchema);

module.exports = HouseModel;