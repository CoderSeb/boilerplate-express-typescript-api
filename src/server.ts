import express from 'express'

const run = () => {
  const server = express()

  const PORT = process.env.PORT || 5000

  server.get('/', (req, res) => {
    res.send('Hello World!')
  })

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