import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class TopicModel extends Model {
	public id!: number;
	public header!: string;
	public content!: string;
	public userId!: string;
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
		header: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'user_id',
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
