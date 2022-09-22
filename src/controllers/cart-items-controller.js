const UserModel = require('../models/user-model');
const createCartItemViewModel = require('../view-models/create-cart-item-view-model');
const {
  createBadDataError,
  createNotFoundError,
  sendErrorResponse,
} = require('../helpers/errors');

const findHouse = (cartItems, id) => cartItems.find((item) => item.houseId.toString() === id);

const fetchAll = (req, res) => {
  res.status(200).json(req.authUser.cartItems.map(createCartItemViewModel))
}

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCartItem(data);

    const foundCartItemDoc = findHouse(req.authUser.cartItems, data.houseId);
    if (foundCartItemDoc) throw createBadDataError('House already exists in cart');

    const newCartItem = {
      houseId: data.houseId,
      amount: data.amount,
    }

    req.authUser.cartItems.push(newCartItem);

    await req.authUser.save()

    res.status(200).json(createCartItemViewModel(newCartItemDoc))
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const update = async (req, res) => {
  const data = {
    houseId: req.params.id,
    amount: req.body.amount,
  }

  try {
    await UserModel.validateCartItem(data);

    const foundCartItemDoc = findHouse(req.authUser.cartItems, data.houseId);
    if (!foundCartItemDoc) throw createNotFoundError('House does not exist in cart');

    foundCartItemDoc.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(createCartItemViewModel(foundCartItemDocDoc))
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const remove = async (req, res) => {
  const houseId = req.params.id;

  try {
    const foundCartItemDoc = findHouse(req.authUser.cartItems, houseId);
    if (!foundCartItemDoc) throw createNotFoundError('House does not exist in cart');

    req.authUser.cartItems = req.authUser.cartItems.filter(x => x.houseId.toString() !== houseId);

    await req.authUser.save();

    res.status(200).json(createCartItemViewModel(foundCartItemDoc));
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

module.exports = {
  fetchAll,
  create,
  update,
  remove,
};