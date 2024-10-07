const { getInteractionNamesController, addInteractionNameController, deleteInteractionNameController, updateInteractionNameController } = require('./interaction_names.controller');
const {authenticateToken} = require('../../../../middleware/auth.middleware');
const express = require('express');
const interactionNamesRoute = express.Router();

interactionNamesRoute.get('/', getInteractionNamesController);
interactionNamesRoute.post('/', authenticateToken(1), addInteractionNameController);
interactionNamesRoute.delete('/', authenticateToken(1), deleteInteractionNameController);
interactionNamesRoute.patch('/', authenticateToken(1), updateInteractionNameController);

module.exports = interactionNamesRoute;
