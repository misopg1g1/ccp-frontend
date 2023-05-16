
import { Consumer } from "../../consumers/index.js"
import * as log from "../../util/log.js";

export const visit = (server) => {
  server.get('/api/visits', (req, res) => {
    const token = req.get('Authorization');
    Consumer.getAllVisits(token)
    .then(r => {
      let response = { ...r };
      if (response.error) {
        log.response_error('visit', req, response.error);
      }
      res.json(response);
    }).catch((err) => {
      log.response_error('visit', req, err);
      res.status(500).send(err);
    });
  });
}