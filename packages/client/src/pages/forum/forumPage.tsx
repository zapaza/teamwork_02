import { Button } from '@/components/ui/button/button';
import { Topic } from '@/components/ui/topic/topic';
import { CreateTopicModal } from '@/components/ui/create-topic-modal/createTopicModal';
import './forum-page.pcss';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { fetchAllTopics } from '@/store/forum/forumThunk';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

const forumMock = [
	{
		id: '1',
		topicTitle: 'Заголовок топика1',
		topicText:
			// eslint-disable-next-line max-len
			'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
	},
	{
		id: '2',
		topicTitle: 'Заголовок топика2',
		topicText:
			// eslint-disable-next-line max-len
			'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
	},
	{
		id: '3',
		topicTitle: 'Заголовок топика3',
		topicText:
			// eslint-disable-next-line max-len
			'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
	},
	{
		id: '4',
		topicTitle: 'Заголовок топика4',
		topicText:
			// eslint-disable-next-line max-len
			'Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика Полный текст топика!',
	},
];

export const ForumPage = () => {
	const [activeModal, setActiveModal] = useState(false);
	const forum = useSelector((state: RootState) => state.forum);
	const dispatch: AppDispatch = useDispatch();

	function changeActive() {
		setActiveModal(!activeModal);
	}

	useEffect(() => {
		async function fetchTopics() {
			await dispatch(fetchAllTopics());
		}

		fetchTopics();
	}, []);

	return (
		<>
			<div className="forum__container flex">
				<div className="all-topic-container flex flex-column">
					{forumMock.map(item => (
						<Topic key={item.id} {...item}/>
					))}
				</div>
				<Button
					name="createTopicBtn"
					className="button text-base-font-regular create-topic-btn"
					onClick={changeActive}>
					{t('create_topic')}
				</Button>
			</div>
			<CreateTopicModal active={activeModal} handleClose={changeActive}/>
		</>
	);
};
