const cardSchemas = require('../../config/cardSchemas');

exports.CARD_SCHEMA_NAMES = Object.keys(cardSchemas);

exports.CARD_SCHEMA_LIST = Object.values(cardSchemas);

exports.getCardSchema = schemaName => cardSchemas[schemaName];
