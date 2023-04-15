import express from 'express'
import { login } from './routes/login/index.js'

async function route(server) {
  login(server);
}

async function createServer() {
  const app = express()
  app.use(express.json({ limit: '10mb', extended: true }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.set('port', process.env.PORT || 3003);
  route(app);
  app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  });
}

createServer()