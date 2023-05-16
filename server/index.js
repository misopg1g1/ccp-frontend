import express from 'express'
import loadRoutes from './routes/index.js'

async function createServer() {
  const app = express()
  app.use(express.json({ limit: '10mb', extended: true }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))
  app.set('port', process.env.PORT || 3003)
  loadRoutes(app)

  if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.info(`Find the server at: http://localhost:${app.get('port')}/`);
      })
  }
}

createServer().then(r => console.info(r));