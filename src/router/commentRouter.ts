import express from 'express'
import CommentController from '../controller/commentController';


const router = express.Router();

router.get('/:aid',CommentController.getCommentByAid)
router.post('/', CommentController.postComment)

export default router;