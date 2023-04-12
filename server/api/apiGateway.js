const config = require('../../util/getConfig');
const request = require('../../request');

module.exports = {
    login: ({ username, password, browser, os }) => {
        const url = `${config.apiGateway}/login`;
        console.log('username', username);
        console.log('password', password);
        console.log('browser', browser);
        console.log('os', os);
        return 'Autenticación exitosa';
    }
};