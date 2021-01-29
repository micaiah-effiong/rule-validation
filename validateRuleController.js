/*
 * validate date based on set rules
 *
 * @public
 */

const evaluate = require("./validate");
const pickValue = require("./pickValue");

module.exports = function (req, res, next) {
  const { rule, data } = req.body;

  // check if rule exist
  if (!("rule" in req.body)) {
    return res.json({
      message: "rule is required.",
      status: "error",
      data: null,
    });
  }

  // check if rule is an object
  if (typeof rule !== "object") {
    return res.json({
      message: "rule should be an object.",
      status: "error",
      data: null,
    });
  }

  // check if data exist
  if (!("data" in req.body)) {
    return res.json({
      message: "data is required.",
      status: "error",
      data: null,
    });
  }

  // check if data is a string or object
  if (typeof data !== "object" && typeof data !== "string") {
    return res.json({
      message: "data should be an object or string.",
      status: "error",
      data: null,
    });
  }

  // pick field value from data
  const fieldValue = pickValue(data, rule.field);

  // check for missing value
  if (!fieldValue) {
    return res.json({
      message: `field ${rule.field} is missing from data.`,
      status: "error",
      data: null,
    });
  }

  // create response data object
  const responseData = {
    validation: {
      error: false,
      field: rule.field,
      field_value: fieldValue,
      condition: rule.condition,
      condition_value: rule.condition_value,
    },
    setValidationError(status) {
      this.validation.error = Boolean(status);
    },
  };

  if (!evaluate(fieldValue, rule.condition, rule.condition_value)) {
    // update status for validation error
    responseData.setValidationError(true);
    return res.status(400).json({
      message: `field ${rule.field} failed validation.`,
      status: "error",
      data: responseData,
    });
  }

  // update status for validation error
  responseData.setValidationError(false);
  return res.json({
    message: `field ${rule.field} successfully validated.`,
    status: "success",
    data: responseData,
  });
};
