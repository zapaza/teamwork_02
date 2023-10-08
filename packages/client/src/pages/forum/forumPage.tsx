import { Button } from '@/components/ui/button/button';
import { Topic } from '@/components/ui/topic/topic';
import { CreateTopicModal } from '@/components/ui/create-topic-modal/createTopicModal';
import './forum-page.pcss';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { fetchAllTopics, fetchReactions } from '@/store/forum/forumThunk';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { apiForum } from '@/core/api/api-forum';

export const ForumPage = () => {
	const [activeModal, setActiveModal] = useState(false);
	const topics = useSelector((state: RootState) => state.forum.data.topics);
	const dispatch: AppDispatch = useDispatch();

	function changeActive() {
		setActiveModal(!activeModal);
	}

	async function fetchTopics() {
		await dispatch(fetchAllTopics());
		topics.forEach(async item => await dispatch(fetchReactions(item.id)));
	}

	useEffect(() => {
		fetchTopics();
	}, []);

	async function submitForm(data: any) {
		try {
			await apiForum.addTopic(data);
			await fetchTopics();
		} catch (error) {
			console.error('Failed to create topic:', error);
		}
	}

	return (
		<>
			<div className="forum">
				<div className="forum__container flex">
					<div className="all-topic-container flex flex-column">
						{topics.map(item => (
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
			</div>

			<CreateTopicModal
				active={activeModal}
				handleClose={changeActive}
				handleSubmit={submitForm}
			/>
		</>
	);
};
