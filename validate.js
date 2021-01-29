/*
 * evaluate and validate data based on set conditions
 *
 * @public
 */

const validators = {
  eq: (fieldDate, value) => fieldDate === value,
  neq: (fieldDate, value) => fieldDate !== value,
  gt: (fieldDate, value) => fieldDate > value,
  gte: (fieldDate, value) => fieldDate >= value,
  contains: (fieldDate, value) => fieldDate.includes(value),
};

module.exports = function (fieldDate, condition, value) {
  try {
    return validators[condition](fieldDate, value);
  } catch (err) {
    return;
  }
};
