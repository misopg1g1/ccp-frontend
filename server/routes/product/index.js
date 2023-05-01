import { Consumer } from '../../consumers/index.js'
import * as log from '../../util/log.js'

export const product = (server) => {
    server.get('/api/products', (req, res) => {
        const token = req.get('Authorization')
        Consumer.getAllProducts(token)
        .then( r => {
            let response = { ...r }
            if (response.error) {
                log.response_error('product', req, response.error)
            }
            res.json(response)
        }).catch((err) => {
            log.response_error('product', req, err)
            res.status(500).send(err)
        })
    })
    server.get('/api/products/:productId', (req, res) => {
        Consumer.getProduct(req.params)
        .then( r => {
            let response = { ...r }
            if (response.error) {
                log.response_error('product', req, response.error)
            }
            res.json(response)
        }).catch((err) => {
            log.response_error('product', req, err)
            res.status(500).send(err)
        })
    })

    server.post('/api/products', (req, res) => {
        const token = req.get('Authorization')
        Consumer.createProduct(req.body, token)
        .then( r => {
            let response = { ...r }
            if (response.error) {
                log.response_error('product', req, response.error)
            }
            res.json(response)
        }).catch((err) => {
            log.response_error('product', req, err)
            res.status(500).send(err)
        })
    })
}