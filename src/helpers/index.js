let currentId = 2;
// eslint-disable-next-line no-plusplus
const createId = () => ++currentId;

const removeEmptyProps = (obj) => Object.entries(obj).reduce((prevResult, [key, value]) => {
  if (value !== undefined) {
    // eslint-disable-next-line no-param-reassign
    prevResult[key] = value;
  }

  return prevResult;
}, {});

module.exports = {
  createId,
  removeEmptyProps,
};
