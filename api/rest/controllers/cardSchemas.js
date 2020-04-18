const { CARD_SCHEMAS } = require('../../../utils/config/cardSchemas');

exports.getCardSchemas = (req, res) => {
  res.status(200).json(CARD_SCHEMAS);
};
