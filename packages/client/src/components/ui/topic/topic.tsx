import React, { useState } from 'react';
import './topic.pcss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchReactions, fetchTopicById } from '@/store/forum/forumThunk';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import smile from '../../../assets/smiley-happy-plus.svg';
import { apiForum } from '@/core/api/api-forum';

export const Topic = (props: any) => {
	const dispatch: AppDispatch = useDispatch();
	const { id } = useParams();
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const user = useSelector((state: RootState) => state.auth);
	const location = useLocation();
	const navigate = useNavigate();

	async function refreshTopicById() {
		await dispatch(fetchTopicById(Number(id)));
		await dispatch(fetchReactions(Number(id)));
	}

	async function handleTopicClick() {
		navigate(`/forum-topic/${props.id}`);
	}

	async function handleSelectEmoji(data: any) {
		setShowEmojiPicker(!showEmojiPicker);
		await apiForum.addReaction(Number(id), data.unified, user.id!);
		refreshTopicById();
	}

	return (
		<div className="topic__container flex flex-column" onClick={() => handleTopicClick()}>
			<h3 className="topic__header">{props.header}</h3>
			<p className="topic__text text-base-font-regular">{props.content}</p>
			<div className="reactions__container flex">
				{props.reactions &&
					props.content !== '' &&
					props.reactions.map((item: any, index: any) => (
						<span className="emoji-span" key={index}>
							{String.fromCodePoint(parseInt(item.emoji, 16))}
						</span>
					))}
			</div>
			{location.pathname !== '/forum' && (
				<div className="picker__container">
					<img
						src={smile}
						alt="smile icon"
						className="smile-icon"
						onClick={() => setShowEmojiPicker(!showEmojiPicker)}
					/>
					<div className="emoji-picker">
						{showEmojiPicker && (
							<Picker data={data} onEmojiSelect={handleSelectEmoji}/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
