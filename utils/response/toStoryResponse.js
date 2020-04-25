const toStoryResponse = story => ({
  storyId: story['_id'],
  summary: story.summary,
  description: story.description,
});

module.exports = toStoryResponse;
