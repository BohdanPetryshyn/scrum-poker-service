const toParticipantResponse = participant => ({
  participantId: participant['_id'],
  username: participant.username,
});

module.exports = toParticipantResponse;
