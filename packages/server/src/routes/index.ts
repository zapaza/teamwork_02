import { Router } from 'express';
import { TopicController } from '../controllers/topic-controller';
import { CommentController } from '../controllers/comment-controller';
import { ReplyController } from '../controllers/reply-controller';
import { checkAuth } from '../middlewares/check-auth';

const TOPIC_URL = '/topic';
const COMMENT_URL = '/comment';
const REPLY_URL = '/reply';

const router = Router();
const topicController = new TopicController();
const commentController = new CommentController();
const replyController = new ReplyController();

router.use(checkAuth);

router.post(TOPIC_URL, topicController.addTopic);
router.get(`${TOPIC_URL}/all`, topicController.getTopics);
router.get(`${TOPIC_URL}/:id`, topicController.getTopic);
router.delete(`${TOPIC_URL}/:id`, topicController.deleteTopic);

router.post(COMMENT_URL, commentController.addComment);
router.get(`${COMMENT_URL}/:id`, commentController.getComment);
router.delete(`${COMMENT_URL}/:id`, commentController.deleteComment);

router.post(REPLY_URL, replyController.addReply);
router.get(`${REPLY_URL}/:id`, replyController.getReply);
router.delete(`${REPLY_URL}/:id`, replyController.deleteReply);

export default router;
