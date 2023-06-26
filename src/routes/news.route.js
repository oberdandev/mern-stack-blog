import {Router} from 'express'
import New from '.././controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware, New.create);
router.get('/', New.findAll);
router.get('/top', New.topNews);
router.get('/search', New.searchByTitleOrText);
router.get('/byUser/:id', New.searchByUser);
router.get('/:id', New.findById);

router.patch('/:id', authMiddleware, New.update);
router.delete('/:id', authMiddleware, New.delete);

export default router;