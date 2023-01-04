import {Router} from 'express'
import New from '.././controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware, New.create)
router.get('/', New.findAll)

export default router;