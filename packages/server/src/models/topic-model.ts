import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class TopicModel extends Model {
	public id!: number;
	public topic_title!: string;
	public topic_text!: string;
	public user_id!: string;
	public created_at!: Date;
	public updated_at!: Date;
}

TopicModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		topic_title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		topic_text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.STRING,
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
		tableName: 'topics',
		sequelize,
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		hooks: {
			beforeUpdate: topic => {
				topic.updated_at = new Date();
			},
		},
	},
);

export { TopicModel };
