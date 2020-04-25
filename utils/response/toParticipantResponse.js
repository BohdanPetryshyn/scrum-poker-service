const toParticipantResponse = participant => ({
  participantId: participant['_id'],
  username: participant.username,
  isHost: participant.isHost,
});

module.exports = toParticipantResponse;
