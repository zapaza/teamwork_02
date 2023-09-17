import { Router } from 'express';
import { ReactionController } from '../controllers/ReactionController';

const router = Router();
const reactionController = new ReactionController();

router.post('/topics/:topic_id/reactions', reactionController.addReaction);
router.get('/topics/:topic_id/reactions', reactionController.getReactions);

export default router;
