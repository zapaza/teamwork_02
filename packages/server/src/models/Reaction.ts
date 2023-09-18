import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Reaction extends Model {
	public id!: number;
	public topic_id!: string;
	public emoji!: string;
	public user_id!: string;
	public created_at!: Date;
	public updated_at!: Date;
}

Reaction.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		topic_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		emoji: {
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
		tableName: 'reactions',
		sequelize,
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		hooks: {
			beforeUpdate: reaction => {
				reaction.updated_at = new Date();
			},
		},
	},
);

export { Reaction };
