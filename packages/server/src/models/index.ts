import { ReplyModel } from './reply-model';
import { CommentModel } from './comment-model';
import { TopicModel } from './topic-model';

ReplyModel.belongsTo(CommentModel, {
	foreignKey: 'comment_id',
	as: 'comment',
	onDelete: 'CASCADE',
	hooks: true,
});

TopicModel.hasMany(CommentModel, {
	foreignKey: {
		name: 'topic_id',
	},
	as: 'comments',
	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
	hooks: true,
});

CommentModel.belongsTo(TopicModel, {
	foreignKey: 'topic_id',
	as: 'topic',
	onDelete: 'CASCADE',
	hooks: true,
});

CommentModel.hasMany(ReplyModel, {
	foreignKey: {
		name: 'comment_id',
	},
	as: 'replies',
	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
	hooks: true,
});

export { TopicModel, CommentModel, ReplyModel };
