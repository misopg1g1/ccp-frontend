import { Consumer } from '../../consumers/index.js'
import * as log from '../../util/log.js'

export const category = (server) => {
    server.get('/api/categories', (req, res) => {
        const token = req.get('Authorization')
        Consumer.getAllCategories(token)
        .then( r => {
            let response = { ...r }
            if (response.error) {
                log.response_error('category', req, response.error)
            }
            res.json(response)
        }).catch((err) => {
            log.response_error('category', req, err)
            res.status(500).send(err)
        })
    })
}