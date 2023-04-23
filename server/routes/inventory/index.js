import { Consumer } from '../../consumers/index.js'
import * as log from '../../util/log.js'

export const inventory = (server) => {
    server.put('/api/products/:productId/inventories', (req, res) => {
        Consumer.addInventory(req.params, req.body)
        .then( r => {
            let response = { ...r }
            if (response.error) {
                log.response_error('inventory', req, response.error)
            }
            res.json(response)
        }).catch((err) => {
            log.response_error('inventory', req, err)
            res.status(500).send(err)
        })
    })
}