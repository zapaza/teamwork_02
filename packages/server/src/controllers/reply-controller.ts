import type { Request, Response } from 'express';
import { ReplyModel } from '../models';
import { removeSpecChars } from '../utils/remove-spec-chars';

class ReplyController {
	public async addReply(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { comment_id, reply_text, user_id } = req.body;

			if (!comment_id || !user_id || !reply_text) {
				return res
					.status(400)
					.json({ message: 'Comment ID, Reply Text and  User ID are required' });
			}

			const reply = await ReplyModel.create({
				comment_id,
				reply_text: removeSpecChars(reply_text),
				user_id,
				created_at: new Date(),
				updated_at: new Date(),
			});

			return res.status(201).json({ message: 'Reply added successfully', data: reply });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}

	public async getReply(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { id } = req.params;
			if (!id) return res.status(400).send('Comment ID is required.');

			const reply = await ReplyModel.findOne({ where: { id } });

			return res.status(200).json({ data: reply });
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error', error: (error as Error).message });
		}
	}

	public async deleteReply(req: Request, res: Response): Promise<Response> {
		if (!res.locals.user) {
			return res.status(401).json({ reason: 'Not auth' });
		}

		try {
			const { id } = req.params;
			if (!id) return res.status(400).send('Comment ID is required.');

			ReplyModel.destroy({
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

export { ReplyController };
