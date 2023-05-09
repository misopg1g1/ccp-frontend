import { Consumer } from '../../consumers/index.js'
import * as log from '../../util/log.js'

export const seller = (server) => {
    server.get('/api/sellers', (req, res) => {
        const token = req.get('Authorization')
        Consumer.getAllSellers(token)
        .then( r => {
            let response = { ...r }
            if (response.error) {
                log.response_error('seller', req, response.error)
            }
            res.json(response)
        }).catch((err) => {
            log.response_error('seller', req, err)
            res.status(500).send(err)
        })
    })
}