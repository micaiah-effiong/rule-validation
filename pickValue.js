/*
 * pick a value from nested object
 *
 * @public
 */

module.exports = function (obj, str) {
  const strArray = str.split(".");
  let value = obj;

  try {
    strArray.forEach((lvl, index) => {
      value = value[lvl];
    });
  } catch (err) {
    return;
  }

  return value;
};
