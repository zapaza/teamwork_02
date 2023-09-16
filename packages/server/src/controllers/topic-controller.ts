import type { Request, Response } from 'express';
import { CommentModel, ReplyModel, TopicModel } from '../models';
import { removeSpecChars } from '../utils/remove-spec-chars';
import { stringToInt } from '../utils/string-to-int';

class TopicController {
	public async addTopic(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { header, content, userId } = req.body;
			if (!header || !userId || !content) {
				return res
					.status(400)
					.json({ message: 'Header, Content and User ID are required' });
			}

			const topic = await TopicModel.create({
				header: removeSpecChars(header),
				content: removeSpecChars(content),
				userId,
				created_at: new Date(),
				updated_at: new Date(),
			});

			return res.status(201).json({ message: 'Topic added successfully', data: topic });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}

	public async getTopic(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { id } = req.params;
			if (!id) return res.status(400).send('Topic ID is required.');

			const topic = await TopicModel.findOne({
				where: { id },
				include: [
					{
						model: CommentModel,
						as: 'comments',
						include: [{ model: ReplyModel, as: 'replies' }],
					},
				],
			});

			return res.status(200).json({ data: topic });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}

	public async getTopics(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { offset, limit } = req.query;
			const topics = await TopicModel.findAll({
				offset: stringToInt(offset as string),
				limit: stringToInt(limit as string),
			});

			return res.status(200).json({ data: topics });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}

	public async deleteTopic(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { id } = req.params;
			if (!id) return res.status(400).send('Topic ID is required.');

			TopicModel.destroy({
				where: { id },
			});

			return res.status(200).send('OK');
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}
}

export { TopicController };
