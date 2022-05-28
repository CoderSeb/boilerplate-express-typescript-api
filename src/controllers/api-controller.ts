import express from 'express'
import createError from 'http-errors'
class ApiController {
  async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const result = 'Hello from API!'
      res.send(result)
    } catch (err: unknown) {
      next(err)
    }
  }

  async internalError(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      throw new Error()
    } catch (err: unknown) {
      next(err)
    }
  }

  async badRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      throw createError(400, 'My bad request')
    } catch (err: unknown) {
      next(err)
    }
  }
}

export default ApiController
