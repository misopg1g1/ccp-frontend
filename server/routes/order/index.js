import { Consumer } from "../../consumers/index.js"
import * as log from "../../util/log.js";

export const order = (server) => {
  server.get('/api/orders', (req, res) => {
    const token = req.get('Authorization');
    Consumer.getAllOrders(token)
    .then(r => {
      let response = { ...r };
      if (response.error) {
        log.response_error('order', req, response.error);
      }
      res.json(response);
    }).catch((err) => {
      log.response_error('order', req, err);
      res.status(500).send(err);
    });
  });
}