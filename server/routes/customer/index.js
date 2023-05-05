import { Consumer } from "../../consumers/index.js";
import * as log from '../../util/log.js'

export const customer = (server) => {
  server.get('/api/customers', (req, res) => {
    const token = req.get('Authorization');
    Consumer.getAllCustomers(token)
    .then(r => {
      let response = { ...r };
      if (response.error) {
        log.response_error('customer', req, response.error);
      }
      res.json(response);
    }).catch((err) => {
      log.response_error('customer', req, err);
      res.status(500).send(err);
    });
  });

  server.post('/api/customers', (req, res) => {
    const token = req.get('Authorization');
    Consumer.createCustomer(req.body, token)
    .then(r => {
      let response = { ...r };
      if (response.error) {
        log.response_error('customer', req, response.error);
      }
      res.json(response);
    }).catch((err) => {
      log.response_error('customer', req, err);
      res.status(500).send(err);
    });
  });
};
