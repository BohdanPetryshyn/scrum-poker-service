const PokerSession = require('../models/PokerSession');
const Participant = require('../models/Participant');
const logger = require('../../utils/logger');

const createPokerSession = async (topic, cardSchema, hostUsername) => {
  let savedPokerSession = null;

  const session = await PokerSession.startSession();
  await session.withTransaction(async () => {
    const participant = await new Participant({
      username: hostUsername,
      isHost: true,
    }).save({ session });

    const pokerSession = await new PokerSession({
      topic,
      cardSchema,
      host: participant['_id'],
    }).save({ session });

    participant.pokerSession = pokerSession['_id'];
    participant.save({ session });

    logger.info(
      `Poker session ${pokerSession} created by user ${hostUsername}.`
    );

    savedPokerSession = await pokerSession.populate('host').execPopulate();

    return pokerSession;
  });
  session.endSession();

  return savedPokerSession;
};

module.exports = createPokerSession;
