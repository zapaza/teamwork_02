import type { Request, Response } from 'express';
import { CommentModel, ReplyModel, TopicModel } from '../models';
import { removeSpecChars } from '../utils/remove-spec-chars';

class TopicController {
	public async addTopic(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { topic_title, topic_text, user_id } = req.body;
			if (!topic_title || !user_id || !topic_text) {
				return res
					.status(400)
					.json({ message: 'Topic Title, Topic Text and  User ID are required' });
			}

			const topic = await TopicModel.create({
				topic_title: removeSpecChars(topic_title),
				topic_text: removeSpecChars(topic_text),
				user_id,
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

	public async getTopics(_req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const topics = await TopicModel.findAll();

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
