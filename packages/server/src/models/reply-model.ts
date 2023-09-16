import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class ReplyModel extends Model {
	public id!: number;
	public user_id!: string;
	public reply_text!: string;
	public comment_id!: number;
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
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reply_text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		comment_id: {
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
