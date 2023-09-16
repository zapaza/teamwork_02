import { ReplyModel } from './reply-model';
import { CommentModel } from './comment-model';
import { TopicModel } from './topic-model';

ReplyModel.belongsTo(CommentModel, {
	foreignKey: 'commentId',
	as: 'comment',
	onDelete: 'CASCADE',
	hooks: true,
});

TopicModel.hasMany(CommentModel, {
	foreignKey: {
		name: 'topicId',
	},
	as: 'comments',
	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
	hooks: true,
});

CommentModel.belongsTo(TopicModel, {
	foreignKey: 'topicId',
	as: 'topic',
	onDelete: 'CASCADE',
	hooks: true,
});

CommentModel.hasMany(ReplyModel, {
	foreignKey: {
		name: 'commentId',
	},
	as: 'replies',
	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
	hooks: true,
});

export { TopicModel, CommentModel, ReplyModel };
