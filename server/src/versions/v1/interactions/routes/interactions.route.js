const express = require('express');
const interactionsRoute = express.Router();
const {authenticateToken} = require('../../../../middleware/auth.middleware');
const { getInteractions, addInteraction, deleteInteraction, updateInteraction } = require('./interactions.controller');

interactionsRoute.get('/', getInteractions);
interactionsRoute.post('/', authenticateToken(1), addInteraction);
interactionsRoute.delete('/', authenticateToken(1), deleteInteraction);
interactionsRoute.patch('/', authenticateToken(1), updateInteraction);

module.exports = interactionsRoute;
