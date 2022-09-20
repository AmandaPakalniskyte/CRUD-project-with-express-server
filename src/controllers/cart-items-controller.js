const UserModel = require('../models/user-model');
const {
  createBadDataError,
  createNotFoundError,
  sendErrorResponse,
} = require('../helpers/errors');

const findHouse = (cartItems, id) => cartItems.find((item) => item.houseId.toString() === id);

const fetchAll = (req, res) => {
  res.status(200).json(req.authUser.cartItems)
}

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCartItem(data);

    const foundHouse = findHouse(req.authUser.cartItems, data.houseId);
    if (foundHouse) throw createBadDataError('House already exists in cart');

    const newCartItem = {
      houseId: data.houseId,
      amount: data.amount,
    }

    req.authUser.cartItems.push(newCartItem);

    await req.authUser.save()

    res.status(200).json(newCartItem)
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

    const foundHouse = findHouse(req.authUser.cartItems, data.houseId);
    if (!foundHouse) throw createNotFoundError('House does not exist in cart');

    foundHouse.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(foundHouse)
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const remove = async (req, res) => {
  const houseId = req.params.id;

  try {
    const foundHouse = findHouse(req.authUser.cartItems, houseId);
    if (!foundHouse) throw createNotFoundError('House does not exist in cart');

    req.authUser.cartItems = req.authUser.cartItems.filter(x => x.houseId.toString() !== houseId);

    await req.authUser.save();

    res.status(200).json(foundHouse);
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