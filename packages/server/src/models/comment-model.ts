import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class CommentModel extends Model {
	public id!: number;
	public user_id!: string;
	public comment_text!: string;
	public topic_id!: number;
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
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		comment_text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		topic_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
