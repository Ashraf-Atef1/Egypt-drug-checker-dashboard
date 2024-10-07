const drugsInformationRoute = require('./drugs_informations/routes/drugs_informations.route');
const interactionNamesRoute = require('./drugs_informations/routes/interaction_names.route');
const interactionsRoute = require('./interactions/routes/interactions.route');
const tutorialStepsRoute = require('./tutorial_steps/routes/tutorial_steps.route');
const authenticationRoute = require('./users/routes/authentication.route');
const express = require('express');
const api = express.Router();

api.use('/drugs-information', drugsInformationRoute);
api.use('/interaction-names', interactionNamesRoute);
api.use('/interactions', interactionsRoute);
api.use('/tutorial-steps', tutorialStepsRoute);
api.use('/users', authenticationRoute);
module.exports = api;
