const config = require('../config');
const countryCode = require('./getCountryCode');
const env = require('./getEnv');

module.exports = config[countryCode][env];