import { Consumer } from '../../consumers/index.js'
import * as log from '../../util/log.js'

export const country = (server) => {
    server.get('/api/countries', (req, res) => {
        Consumer.getAllCountries()
        .then( response => {
            if (response.error) {
                log.response_error('country', req, response.error)
            }
            res.json(response)
        }).catch((err) => {
            log.response_error('country', req, err)
            res.status(500).send(err)
        })
    })

    server.get('/api/countries/:country/cities', (req, res) => {
      Consumer.getCitiesByCountry(req.params)
      .then( response => {
          if (response.error) {
              log.response_error('city', req, response.error)
          }
          res.json(response)
      }).catch((err) => {
          log.response_error('city', req, err)
          res.status(500).send(err)
      })
  })
}
