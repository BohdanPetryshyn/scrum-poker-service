const { Router } = require('express');

const { createStory } = require('../../controllers/story');

const storyRouter = Router({ mergeParams: true });

storyRouter.post('/', createStory);

module.exports = storyRouter;
