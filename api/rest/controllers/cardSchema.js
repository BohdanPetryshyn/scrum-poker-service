const { CARD_SCHEMA_LIST } = require('../../../utils/config/cardSchemas');

exports.getCardSchemas = (req, res) => {
  res.status(200).json(CARD_SCHEMA_LIST);
};
