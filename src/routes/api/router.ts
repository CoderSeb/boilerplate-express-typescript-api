import express from 'express'
import ApiController from '../../controllers/api-controller.js'
const router = express.Router()
const controller = new ApiController()

router.get('/', controller.index)

export { router as apiRouter }
