import { Consumer } from '../../consumers/index.js'
import * as log from '../../util/log.js'

export const user = (server) => {
    server.post('/api/user', (req, res) => {
        const token = req.get('Authorization')
        Consumer.createUser(req.body, token)
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