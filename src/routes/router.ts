import express from 'express'
import { apiRouter } from './api/router.js'

const router = express.Router()

router.use('/api', apiRouter)

router.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/api')
})

router.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send('Not Found')
})

export { router as indexRouter }

