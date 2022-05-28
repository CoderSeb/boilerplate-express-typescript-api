import express from 'express'
import { indexRouter } from './routes/router.js'

const run = () => {
  const server = express()

  const PORT = process.env.PORT || 5000

  server.use(indexRouter)

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