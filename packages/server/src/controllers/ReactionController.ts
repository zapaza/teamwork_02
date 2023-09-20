import type { Request, Response } from 'express';
import { Reaction } from '../models/Reaction';

class ReactionController {
	// Метод для добавления реакции
	public async addReaction(req: Request, res: Response): Promise<Response> {
		try {
			const { topic_id } = req.params;
			const { emoji, user_id } = req.body;

			if (!emoji || !user_id) {
				return res.status(400).json({ message: 'Emoji and User ID are required' });
			}

			const reaction = await Reaction.create({
				topic_id,
				emoji,
				user_id,
				created_at: new Date(),
				updated_at: new Date(),
			});

			return res.status(201).json({ message: 'Reaction added successfully', data: reaction });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}

	// Метод для получения всех реакций на топик
	public async getReactions(req: Request, res: Response): Promise<Response> {
		try {
			const { topic_id } = req.params;

			const reactions = await Reaction.findAll({ where: { topic_id } });

			return res.status(200).json({ data: reactions });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}
}

export { ReactionController };
