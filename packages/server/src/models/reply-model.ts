import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class ReplyModel extends Model {
	public id!: number;
	public userId!: string;
	public content!: string;
	public commentId!: number;
	public created_at!: Date;
	public updated_at!: Date;
}

ReplyModel.init(
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
		commentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'comment_id',
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
		tableName: 'replies',
		sequelize,
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		hooks: {
			beforeUpdate: reply => {
				reply.updated_at = new Date();
			},
		},
	},
);

export { ReplyModel };
