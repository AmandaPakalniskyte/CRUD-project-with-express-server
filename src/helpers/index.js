let currentId = 2;
// eslint-disable-next-line no-plusplus
const createId = () => ++currentId;

const isValidJokeData = ({ question, punchline }) => question !== undefined && typeof question === 'string' && question !== ''
  && punchline !== undefined && typeof punchline === 'string' && punchline !== '';

const createCmpById = (houseIdStr) => ({ id }) => id === Number(houseIdStr);

const removeEmptyProps = (obj) => Object.entries(obj).reduce((prevResult, [key, value]) => {
  if (value !== undefined && value !== null) {
    // eslint-disable-next-line no-param-reassign
    prevResult[key] = value;
  }

  return prevResult;
}, {});

module.exports = {
  createId,
  isValidJokeData,
  createCmpById,
  removeEmptyProps,
};
