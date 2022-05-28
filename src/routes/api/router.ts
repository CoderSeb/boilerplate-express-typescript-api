import express from 'express'
import ApiController from '../../controllers/api-controller.js'
const router = express.Router()
const controller = new ApiController()

router.get('/', controller.index)
router.get('/err', controller.internalError)
router.post('/err', controller.badRequest)

export { router as apiRouter }

