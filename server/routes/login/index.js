export const login = (server) => {
    console.log('server')
    server.post('/api/login', (req, res) => {
        res.json(
            {
                "Title": "Hello from server!"
            }
        );         
    });
};