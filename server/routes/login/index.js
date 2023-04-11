const consumer = require('../../consumers/selector.js');
const log = require('../../util/log');

module.exports = server => {
    server.post('/api/login', (req, res) => {
        consumer.login(req.body)
            .then(async r => {
                let response = {...r};
                if (response.error) {
                    log.response_error('login', req, response.error);
                }
                res.json(response);
            })
            .catch(error => {
                log.response_error('login', req, error);
                res.status(400).send(error);
            });
    });
};
