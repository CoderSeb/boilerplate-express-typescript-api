import express from 'express'
class ApiController {
  async index(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const result: string = 'Hello from API!'
      res.send(result)
    } catch (err: unknown) {
      next(err)
    }
  }
}

export default ApiController