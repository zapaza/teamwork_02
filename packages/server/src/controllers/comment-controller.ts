import type { Request, Response } from 'express';
import { CommentModel, ReplyModel } from '../models';
import { removeSpecChars } from '../utils/remove-spec-chars';

class CommentController {
	public async addComment(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { topic_id, comment_text, user_id } = req.body;

			if (!topic_id || !user_id || !comment_text) {
				return res
					.status(400)
					.json({ message: 'Topic ID, Comment Text and  User ID are required' });
			}

			const comment = await CommentModel.create({
				topic_id,
				comment_text: removeSpecChars(comment_text),
				user_id,
				created_at: new Date(),
				updated_at: new Date(),
			});

			return res.status(201).json({ message: 'Comment added successfully', data: comment });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}

	public async getComment(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { id } = req.params;
			if (!id) return res.status(400).send('Comment ID is required.');

			const comment = await CommentModel.findOne({
				where: { id },
				include: [{ model: ReplyModel, as: 'replies' }],
			});

			return res.status(200).json({ data: comment });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}

	public async deleteComment(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { id } = req.params;
			if (!id) return res.status(400).send('Comment ID is required.');

			CommentModel.destroy({
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

export { CommentController };
