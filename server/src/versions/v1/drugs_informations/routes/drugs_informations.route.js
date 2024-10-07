const { getDrugsInformation, addDrugsInformation, deleteDrugsInformation, updateDrugsInformation } = require('./drugs_informations.controller');
const {authenticateToken} = require('../../../../middleware/auth.middleware');
const express = require('express');
const drugsInformationRoute = express.Router();

drugsInformationRoute.get('/', getDrugsInformation);
drugsInformationRoute.post('/', authenticateToken(2), addDrugsInformation);
drugsInformationRoute.delete('/', authenticateToken(1), deleteDrugsInformation);
drugsInformationRoute.patch('/', authenticateToken(2), updateDrugsInformation);

module.exports = drugsInformationRoute;
