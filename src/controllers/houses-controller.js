const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const HouseModel = require('../models/house-model');
const createHousePopulatedViewModel = require('../view-models/create-house-populated-view-model');
const createHouseViewModel = require('../view-models/create-house-view-model');

const createHouseNotFoundError = (houseId) => createNotFoundError(`House with id '${houseId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;
  const joinedDocuments = joinBy === 'categoryId';

  try {
    const houseDocs = joinedDocuments
      ? await HouseModel.find().populate('categoryId')
      : await HouseModel.find();

    res.status(200).json(joinedDocuments
      ? houseDocs.map(createHousePopulatedViewModel)
      : houseDocs.map(createHouseViewModel)
    );
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const houseId = req.params.id;
  const { joinBy } = req.query;
  const joinedDocument = joinBy === 'categoryId';

  try {
    const foundHouseDoc = joinedDocument
      ? await HouseModel.findById(houseId).populate('categoryId')
      : await HouseModel.findById(houseId);
    if (foundHouseDoc === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(joinedDocument
      ? createHousePopulatedViewModel(foundHouseDoc)
      : createHouseViewModel(foundHouseDoc)
    );
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newHouseData = req.body;

  try {
    await HouseModel.validateData(newHouseData);

    const newHouseDoc = await HouseModel.create(newHouseData)

    res.status(201).json(createHouseViewModel(newHouseDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newHouseData = { title, description, categoryId, img, price };

  try {
    await HouseModel.validateData(newHouseData);

    const updatedHouseDoc = await HouseModel.findByIdAndUpdate(
      houseId,
      newHouseData,
      { new: true, runValidators: true }
    );

    if (updatedHouseDoc === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(createHouseViewModel(updatedHouseDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newHouseData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    await HouseModel.validateUpdateData(newHouseData);

    const updatedHouseDoc = await HouseModel.findByIdAndUpdate(
      houseId,
      newHouseData,
      { new: true }
    );

    if (updatedHouseDoc === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(createHouseViewModel(updatedHouseDoc))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const houseId = req.params.id;

  try {
    const deletedHouseDoc = await HouseModel.findByIdAndDelete(houseId);
    if (deletedHouseDoc === null) createHouseNotFoundError(houseId);

    res.status(200).json(createHouseViewModel(deletedHouseDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
