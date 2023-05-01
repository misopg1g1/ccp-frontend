import { Consumer } from '../../consumers/index.js'
import * as log from '../../util/log.js'

export const login = (server) => {
    server.post('/api/login', (req, res) => {
        Consumer.login(req.body)
            .then( r => {
                let response = { ...r }
                if (response.error) {
                    log.response_error('login', req, response.error)
                }
                res.json(response)
            }).catch((err) => {
                log.response_error('login', req, err)
                res.status(500).send(err)
            })
    })
}