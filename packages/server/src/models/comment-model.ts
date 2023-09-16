import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class CommentModel extends Model {
	public id!: number;
	public userId!: string;
	public content!: string;
	public topicId!: number;
	public created_at!: Date;
	public updated_at!: Date;
}

CommentModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'user_id',
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		topicId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'topic_id',
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		tableName: 'comments',
		sequelize,
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		hooks: {
			beforeUpdate: comment => {
				comment.updated_at = new Date();
			},
		},
	},
);

export { CommentModel };
