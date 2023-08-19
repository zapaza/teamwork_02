import Wrapper from '../../components/ui/wrapper/wrapper';
import './main-page.pcss';

function MainPage() {
	return (
		<main className='main-page flex  flex-ai-center flex-column'>
			<h1 className='main-page__header text-2-xl-font-light'>Добро пожаловать в Pacman</h1>
			<div className='main-page__container flex flex-10a '>
				<Wrapper>
					<p className='main-page__content-block text-lg-font-regular'>
            Погрузитесь в увлекательный мир Пакмана - современной аркадной игры, которая
            вобрала дух классики и привнесла новые элементы в игровой процесс.
					</p>
					<p className='main-page__content-block text-lg-font-regular'>
						<b>Цель игры</b> - собирать все точки на поле.
					</p>
					<p className='main-page__content-block text-lg-font-regular'>
            Остерегайтесь четырех неуловимых призраков, которые настойчиво преследуют
            Пакмана.
					</p>
					<p className='main-page__content-block text-lg-font-regular'>
            Энергетические бонусы, разбросанные по лабиринту, придают Пакману временную
            силу атаки и позволяют ему обратиться против призраков на короткое время. В
            этот момент раздражающие преследователи оглушаются, превращаясь в синих
            призраков, и Пакман может съесть их, зарабатывая дополнительные очки.
					</p>
				</Wrapper>
				<img
					className='
					 main-page__content-block
					 main-page__content-block_colored
					 text-lg-font-regular'
					src='./images/mainPage/pacman-image-1.png'
					alt='Картинка по игре'
				/>
				<img
					className='
            main-page__content-block
            main-page__content-block_colored
            text-lg-font-regular'
					src='./images/mainPage/pacman-image-2.png'
					alt='Картинка по игре'
				/>
				<Wrapper>
					<div className='main-page__content-block text-lg-font-regular'>
						<h2 className='text-lg-font-regular'>Правила игры:</h2>
            1. Управление и движение: Используйте клавиши со стрелками на клавиатуре для
            перемещения Пакмана вверх, вниз, влево и вправо. <br/>
            2. Цель игры: Ваша цель - собрать все точки на игровом поле, избегая
            столкновений с призраками. Собранное количество точек отображается в верхней
            части экрана. <br/>
            3. Призраки: В игре присутствуют четыре призрака, которые будут преследовать
            Пакмана в лабиринте. Если Пакман заденет призрака, игра закончится.
            Избегайте призраков и будьте настороже. <br/>
            4. Энерджайзеры: Размещены в различных местах лабиринта, энерджайзеры дают
            Пакману временную способность атаковать призраков. В этот момент вы можете
            съесть призраков, чтобы получить дополнительные очки. <br/>
            5. Очки и рекорды: Количество очков, набранных в игре, отображается на
            экране. Старайтесь набрать как можно больше очков, уклоняясь от призраков и
            собирая все точки на поле. Вы можете установить новый рекорд и соревноваться
            с друзьями. <br/>
					</div>
				</Wrapper>
				<Wrapper className='flex-11a'>
					<h3 className='text-lg-font-regular'>Создатели игры:</h3>
					<ul className='main-page__list text-sm-font-regular'>
						<li className='main-page__list-item'>
							<a
								className='text-sm-font-regular main-page__link'
								href='https://github.com/TolkachevPeter'
								target='_blank'
								rel='noreferrer'>
                Толкачев Петр
							</a>
						</li>
						<li className='main-page__list-item'>
							<a
								className='text-sm-font-regular main-page__link'
								href='https://github.com/SatanLittleHelper'
								target='_blank'
								rel='noreferrer'>
                Фенин Александр
							</a>
						</li>
						<li className='main-page__list-item'>
							<a
								className='text-sm-font-regular main-page__link'
								href='https://github.com/Sammily'
								target='_blank'
								rel='noreferrer'>
                Усова Даша
							</a>
						</li>
						<li className='main-page__list-item'>
							<a
								className='text-sm-font-regular main-page__link'
								href='https://github.com/Kustov-Ilya'
								target='_blank'
								rel='noreferrer'>
                Кустов Илья
							</a>
						</li>
						<li className='main-page__list-item'>
							<a
								className='text-sm-font-regular main-page__link'
								href='https://github.com/zapaza'
								target='_blank'
								rel='noreferrer'>
                Чумаков Станислав
							</a>
						</li>
					</ul>

					<p className='text-xs-font-light'>
						<a
							className='text-xs-font-light main-page__link'
							href='https://github.com/zapaza/teamwork_02'
							target='_blank'
							rel='noreferrer'>
              Проект
						</a>
              разработа в рамках курса &quot;Мидл фронтенд-разработчик &quot;,
              командой &quot;GOLOVOLOMKA &quot;
            ©
					</p>
				</Wrapper>
			</div>
		</main>
	);
}

export default MainPage;
