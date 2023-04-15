export const login = (server) => {
    console.log('server')
    server.post('/api/login', (req, res) => {
        consumer.login(req.body)
            .then(async r => {
                let response = {...r};
                if (response.error) {
                    console.log('login', req, response.error);
                }
                res.json(response);
            })
            .catch(error => {
                console.log('login', req, error);
                res.status(400).send(error);
            });           
    });
};