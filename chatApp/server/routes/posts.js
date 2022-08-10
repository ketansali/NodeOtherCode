import express from 'express'
import { getPosts, createPosts, updatePosts, deletePost} from '../controllers/posts.js';

const router = express.Router();

router.get('/',getPosts)
router.post('/',createPosts)
router.patch('/:id',updatePosts)
router.delete('/:id',deletePost)

export default router; 