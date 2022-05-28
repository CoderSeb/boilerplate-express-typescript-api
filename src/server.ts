import express from 'express'
import fs from 'fs-extra'
import logger from 'morgan'
import path from 'path'
import { indexRouter } from './routes/router.js'

import helmet from 'helmet'

const run = () => {
  const server = express()

  // Specify port
  const PORT = process.env.PORT || 5000

  const __dirname = path.resolve()
  // Add logger
  // Console log errors only
  if (process.env.NODE_ENV !== 'production') {
    server.use(
      logger('dev', {
        skip: function (req: express.Request, res: express.Response) {
          return res.statusCode < 400
        }
      })
    )
  } else {
    server.use(
      logger('tiny', {
        skip: function (req: express.Request, res: express.Response) {
          return res.statusCode < 400
        }
      })
    )
  }

  // Log all requests to access.log
  server.use(
    logger('common', {
      stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
        flags: 'a'
      })
    })
  )

  server.use(helmet())

  // Add routes
  server.use(indexRouter)

  // Error handling
  server.use(
    (
      err: { status: number; message: string; stack: string },
      req: express.Request,
      res: express.Response,
      next: express.NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => {
      interface ErrorResponse {
        status: number
        message: string
        stack?: string
      }

      const errorResponse: ErrorResponse = {
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
      }
      res.status(errorResponse.status).send(errorResponse)
    }
  )

  // Start server
  server.listen(PORT, () => {
    console.log(`Boilerplate server listening at http://localhost:${PORT}`)
  })
}

try {
  run()
} catch (err: unknown) {
  console.error(err)
  process.exit(1)
}
