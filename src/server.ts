import express from 'express'
import { indexRouter } from './routes/router.js'
const run = () => {
  const server = express()

  // Specify port
  const PORT = process.env.PORT || 5000

  // Add routes
  server.use(indexRouter)

  // Error handling
  server.use((err: { status: number, message: string, stack: string }, req: express.Request, res: express.Response, next: express.NextFunction) => {
    interface ErrorResponse { status: number, message: string, stack?: string}

    const errorResponse: ErrorResponse = {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    }
    res.status(errorResponse.status).send(errorResponse)
  })

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