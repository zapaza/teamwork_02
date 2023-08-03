import {
  IBoundary,
  IGameAssets,
  IGameTimer,
  IGameTimers,
  IGhost,
  IPellet,
  IPowerUp,
  IVariables,
} from './types'
import Boundary from './models/boundary'
import Pellet from './models/pallet'
import PowerUp from './models/powerUp'
import Ghost from './models/ghost'
import PacMan from './models/pacman'
import CycleTimer from './models/cycleTymer'
import ScaredTimer from './models/scaredTimer'
import RetreatingTimer from './models/retreatingTimer'

/**
 * Фабрика для создания различных объектов игры, таких как границы, точки, привидения, PacMan и таймеры.
 */
export class GameFactory {
  static PIPE_NAMES = {
    '-': 'horizontal',
    '|': 'vertical',
    1: 'corner-one',
    2: 'corner-two',
    3: 'corner-three',
    4: 'corner-four',
  }

  static TUNNEL_DATA = [
    { position: { x: -1, y: 13 } },
    { position: { x: -1, y: 15 } },
    { position: { x: 28, y: 13 } },
    { position: { x: 28, y: 15 } },
  ]

  static GHOST_DATA = [
    {
      color: 'red',
      position: { x: 31, y: 23 },
      velocity: { x: 0, y: -1 / 8 },
    },
    {
      color: 'pink',
      position: { x: 25, y: 23 },
      velocity: { x: 0, y: -1 / 8 },
    },
    {
      color: 'cyan',
      position: { x: 37, y: 29 },
      velocity: { x: 1 / 8, y: 0 },
    },
    {
      color: 'orange',
      position: { x: 19, y: 29 },
      velocity: { x: -1 / 8, y: 0 },
    },
  ]

  // @ts-ignore
  // @ts-ignore
  /**
   * Создает все необходимые ресурсы для игры на основе предоставленных данных карты и переменных.
   * @param map Массив, представляющий игровую карту.
   * @param variables Объект с переменными игры.
   * @param makeGhosts Функция для создания привидений (по умолчанию используется внутренняя реализация).
   * @param makePacman Функция для создания PacMan'а (по умолчанию используется внутренняя реализация).
   * @param makeCycleTimer Функция для создания таймера цикла (по умолчанию используется внутренняя реализация).
   * @param makeScaredTimer Функция для создания таймера испуга (по умолчанию используется внутренняя реализация).
   * @param makeRetreatingTimers Функция для создания таймеров ухода привидений (по умолчанию используется внутренняя реализация).
   * @param makeBoundaries Функция для создания границ (по умолчанию используется внутренняя реализация).
   * @param makePellets Функция для создания точек (по умолчанию используется внутренняя реализация).
   * @param makePowerUps Функция для создания усилителей (по умолчанию используется внутренняя реализация).
   * @param makePauseTextImage Функция для создания изображения с текстом паузы (по умолчанию используется внутренняя реализация).
   * @returns Объект, содержащий все необходимые ресурсы для игры.
   */
  static makeAssets(
    map: string[][],
    variables: IVariables,
    makeGhosts: (
      variables: IVariables
    ) => Record<string, IGhost> = GameFactory.makeGhosts,
    makePacman: (variables: IVariables) => PacMan = GameFactory.makePacman,
    // @ts-ignore
    makeCycleTimer: (
      ghosts: Record<string, IGhost>
    ) => IGameTimer = GameFactory.makeCycleTimer,
    // @ts-ignore
    makeScaredTimer: (
      ghosts: Record<string, IGhost>
    ) => IGameTimer = GameFactory.makeScaredTimer,
    makeRetreatingTimers: (
      ghosts: Record<string, IGhost>
    ) => IGameTimer[] = GameFactory.makeRetreatingTimers,
    makeBoundaries: (
      map: string[][],
      variables: IVariables
    ) => IBoundary[] = GameFactory.makeBoundaries,
    makePellets: (
      map: string[][],
      variables: IVariables
    ) => IPellet[] = GameFactory.makePellets,
    makePowerUps: (
      map: string[][],
      variables: IVariables
    ) => IPowerUp[] = GameFactory.makePowerUps,
    makePauseTextImage: () => HTMLImageElement = GameFactory.makePauseTextImage
  ): IGameAssets {
    const ghosts = makeGhosts(variables)
    return {
      props: {
        boundaries: makeBoundaries(map, variables),
        pellets: makePellets(map, variables),
        powerUps: makePowerUps(map, variables),
      },
      characters: {
        ghosts: ghosts,
        pacman: makePacman(variables),
      },
      timers: {
        cycleTimer: makeCycleTimer(ghosts),
        scaredTimer: makeScaredTimer(ghosts),
        retreatingTimers: makeRetreatingTimers(ghosts),
      },
      pauseTextImage: makePauseTextImage(),
    }
  }

  /**
   * Создает границы для игровой карты на основе предоставленных данных карты и переменных.
   * @param map Массив, представляющий игровую карту.
   * @param variables Объект с переменными игры.
   * @param makeTunnelBoundaries Функция для создания туннельных границ (по умолчанию используется внутренняя реализация).
   * @returns Массив объектов границ.
   */
  static makeBoundaries(
    map: string[][],
    variables: IVariables,
    makeTunnelBoundaries: (
      boundaries: IBoundary[],
      variables: IVariables
    ) => void = GameFactory.makeTunnelBoundaries
  ) {
    const boundaries: IBoundary[] = []
    map.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element !== ' ' && element !== '.' && element !== 'o') {
          const regularImage = new Image()
          // @ts-ignore
          regularImage.src = `./images/pipe-${GameFactory.PIPE_NAMES[element]}.png`
          const whiteImage = new Image()
          // @ts-ignore
          whiteImage.src = `./images/pipe-${GameFactory.PIPE_NAMES[element]}-white.png`
          const boundary = new Boundary(
            {
              position: {
                x: variables.tileLength * j,
                y: variables.tileLength * i,
              },
              regularImage: regularImage,
              whiteImage: whiteImage,
            },
            variables.tileLength
          )
          boundaries.push(boundary)
        }
      })
    })
    makeTunnelBoundaries(boundaries, variables)
    return boundaries
  }

  /**
   * Создает туннельные границы для игровой карты на основе предоставленных данных переменных.
   * @param boundaries Массив объектов границ, к которому будут добавлены туннельные границы.
   * @param variables Объект с переменными игры.
   */
  static makeTunnelBoundaries(boundaries: IBoundary[], variables: IVariables) {
    const regularImage = new Image()
    regularImage.src = './images/pipe-horizontal.png'
    const whiteImage = new Image()
    whiteImage.src = './images/pipe-horizontal-white.png'
    GameFactory.TUNNEL_DATA.forEach(data => {
      const tunnelBoundary = new Boundary(
        {
          position: {
            x: variables.tileLength * data.position.x,
            y: variables.tileLength * data.position.y,
          },
          regularImage: regularImage,
          whiteImage: whiteImage,
        },
        variables.tileLength
      )
      boundaries.push(tunnelBoundary)
    })
  }

  /**
   * Создает точки для игровой карты на основе предоставленных данных карты и переменных.
   * @param map Массив, представляющий игровую карту.
   * @param variables Объект с переменными игры.
   * @returns Массив объектов точек.
   */
  static makePellets(map: string[][], variables: IVariables) {
    const pellets: IPellet[] = []
    map.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === '.') {
          const pellet = new Pellet(
            {
              position: {
                x: (variables.tileLength * (2 * j + 1)) / 2,
                y: (variables.tileLength * (2 * i + 1)) / 2,
              },
            },
            variables.tileLength
          )
          pellets.push(pellet)
        }
      })
    })
    return pellets
  }

  /**
   * Создает усилители для игровой карты на основе предоставленных данных карты и переменных.
   * @param map Массив, представляющий игровую карту.
   * @param variables Объект с переменными игры.
   * @returns Массив объектов усилителей.
   */
  static makePowerUps(map: string[][], variables: IVariables) {
    const powerUps: IPowerUp[] = []
    map.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 'o') {
          const powerUp = new PowerUp(
            {
              position: {
                x: (variables.tileLength * (2 * j + 1)) / 2,
                y: (variables.tileLength * (2 * i + 1)) / 2,
              },
            },
            variables.tileLength
          )
          powerUps.push(powerUp)
        }
      })
    })
    return powerUps
  }

  /**
   * Создает привидений для игры на основе предоставленных данных переменных.
   * @param variables Объект с переменными игры.
   * @returns Объект, содержащий привидений с ключами "red", "pink", "cyan" и "orange".
   */
  static makeGhosts(variables: IVariables) {
    const ghosts: Record<string, IGhost> = {}
    GameFactory.GHOST_DATA.forEach(data => {
      ghosts[data.color] = new Ghost(
        {
          position: {
            x: (variables.tileLength * data.position.x) / 2,
            y: (variables.tileLength * data.position.y) / 2,
          },
          velocity: {
            x: variables.tileLength * data.velocity.x,
            y: variables.tileLength * data.velocity.y,
          },
          color: data.color,
        },
        variables.tileLength
      )
    })
    return ghosts
  }

  /**
   * Создает PacMan'а для игры на основе предоставленных данных переменных.
   * @param variables Объект с переменными игры.
   * @returns Объект PacMan'а.
   */
  static makePacman(variables: IVariables) {
    return new PacMan(
      {
        position: {
          x: (variables.tileLength * 29) / 2,
          y: (variables.tileLength * 47) / 2,
        },
        velocity: {
          x: 0,
          y: 0,
        },
      },
      variables.tileLength
    )
  }

  /**
   * Создает таймер цикла для игры на основе предоставленных данных привидений.
   * @param ghosts Объект с привидениями.
   * @returns Объект таймера цикла.
   */
  static makeCycleTimer(ghosts: Record<string, IGhost>) {
    return new CycleTimer(Object.values(ghosts))
  }

  /**
   * Создает таймер испуга для игры на основе предоставленных данных привидений.
   * @param ghosts Объект с привидениями.
   * @returns Объект таймера испуга.
   */
  static makeScaredTimer(ghosts: Record<string, IGhost>) {
    return new ScaredTimer(Object.values(ghosts))
  }

  /**
   * Создает таймеры ухода привидений для игры на основе предоставленных данных привидений.
   * @param ghosts Объект с привидениями.
   * @returns Массив объектов таймеров ухода привидений.
   */
  static makeRetreatingTimers(ghosts: Record<string, IGhost>) {
    const retreatingTimers: IGameTimer[] = []
    Object.values(ghosts).forEach(ghost => {
      const retreatingTimer = new RetreatingTimer(ghost)
      ghost.retreatingTimer = retreatingTimer as IGameTimer
      retreatingTimers.push(retreatingTimer as IGameTimer)
    })
    return retreatingTimers
  }

  /**
   * Создает изображение с текстом паузы для игры.
   * @returns Изображение с текстом паузы.
   */
  static makePauseTextImage() {
    const image = new Image()
    image.src = './images/pause-text.png'
    return image
  }
}
