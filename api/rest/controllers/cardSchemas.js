import { CARD_SCHEMAS } from '../../../utils/config/cardSchemas';

export const getCardSchemas = (req, res) => {
  res.status(200).json(CARD_SCHEMAS);
};
