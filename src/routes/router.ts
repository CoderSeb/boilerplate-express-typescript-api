import express from 'express'
import createError from 'http-errors'
import { apiRouter } from './api/router.js'


const router = express.Router()

router.use('/api', apiRouter)

router.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/api')
})

router.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(createError(404))
})

export { router as indexRouter }

