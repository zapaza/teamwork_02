import { Wrapper } from '@/components/ui/wrapper/wrapper';
import './main-page.pcss';
import { t } from 'i18next';
import { usePage } from '@/hooks/usePage';

export const MainPage = () => {

	usePage({ initPage: initMainPage });

	return (
		<main className="main-page flex  flex-ai-center flex-column">
			<h1 className="main-page__header text-2-xl-font-light">{t('welcome')}</h1>
			<div className="main-page__container flex flex-10a ">
				<Wrapper>
					<p className="main-page__content-block text-lg-font-regular">
						{t('main_description_1')}
					</p>
					<p className="main-page__content-block text-lg-font-regular">
						<b>{t('main_target')}</b> - {t('main_description_2')}
					</p>
					<p className="main-page__content-block text-lg-font-regular">
						{t('main_description_3')}
					</p>
					<p className="main-page__content-block text-lg-font-regular">
						{t('main_description_4')}
					</p>
				</Wrapper>
				<img
					className="
					 main-page__content-block
					 main-page__content-block_colored
					 text-lg-font-regular"
					src="./images/mainPage/pacman-image-1.png"
					alt="Картинка по игре"
				/>
				<img
					className="
            main-page__content-block
            main-page__content-block_colored
            text-lg-font-regular"
					src="./images/mainPage/pacman-image-2.png"
					alt="Картинка по игре"
				/>
				<Wrapper>
					<div className="main-page__content-block text-lg-font-regular">
						<h2 className="text-lg-font-regular">{t('rules')}:</h2>
						{t('rule_1')} <br/>
						{t('rule_2')} <br/>
						{t('rule_3')} <br/>
						{t('rule_4')} <br/>
						{t('rule_5')} <br/>
					</div>
				</Wrapper>
				<Wrapper className="flex-11a">
					<h3 className="text-lg-font-regular">{t('creators')}:</h3>
					<ul className="main-page__list text-sm-font-regular">
						<li className="main-page__list-item">
							<a
								className="text-sm-font-regular main-page__link"
								href="https://github.com/TolkachevPeter"
								target="_blank"
								rel="noreferrer">
								{t('team_member_1')}
							</a>
						</li>
						<li className="main-page__list-item">
							<a
								className="text-sm-font-regular main-page__link"
								href="https://github.com/SatanLittleHelper"
								target="_blank"
								rel="noreferrer">
								{t('team_member_2')}
							</a>
						</li>
						<li className="main-page__list-item">
							<a
								className="text-sm-font-regular main-page__link"
								href="https://github.com/Sammily"
								target="_blank"
								rel="noreferrer">
								{t('team_member_3')}
							</a>
						</li>
						<li className="main-page__list-item">
							<a
								className="text-sm-font-regular main-page__link"
								href="https://github.com/Kustov-Ilya"
								target="_blank"
								rel="noreferrer">
								{t('team_member_4')}
							</a>
						</li>
						<li className="main-page__list-item">
							<a
								className="text-sm-font-regular main-page__link"
								href="https://github.com/zapaza"
								target="_blank"
								rel="noreferrer">
								{t('team_member_5')}
							</a>
						</li>
					</ul>

					<p className="text-xs-font-light">
						<a
							className="text-xs-font-light main-page__link"
							href="https://github.com/zapaza/teamwork_02"
							target="_blank"
							rel="noreferrer">
							{t('project_1')}
						</a>
						{t('project_2')}
					</p>
				</Wrapper>
			</div>
		</main>
	);
};

export const initMainPage = () => Promise.resolve();
