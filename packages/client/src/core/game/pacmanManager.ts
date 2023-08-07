import BoundaryManager from './boundaryManager'
import {
  IBoundary,
  ICoordinates,
  IGameAssets,
  IPacman,
  IVariables,
} from './types'

/**
 * Класс PacmanManager управляет движением персонажа Pacman и взаимодействием
 * с элементами игрового мира.
 */
export default class PacmanManager {
  /**
   * Изменяет направление движения персонажа Pacman на основе последней нажатой клавиши.
   *
   * @param variables - Объект с переменными игрового состояния.
   * @param assets - Объект, содержащий различные игровые ресурсы.
   */
  static changeDirection(variables: IVariables, assets: IGameAssets) {
    const pacman = assets.characters.pacman
    const boundaries = assets.props.boundaries
    if (variables.lastKeyPressed === 'up') {
      this.checkDirectionChange(pacman, boundaries, {
        velocity: { x: 0, y: -pacman.speed },
      })
    } else if (variables.lastKeyPressed === 'down') {
      this.checkDirectionChange(pacman, boundaries, {
        velocity: { x: 0, y: pacman.speed },
      })
    } else if (variables.lastKeyPressed === 'right') {
      this.checkDirectionChange(pacman, boundaries, {
        velocity: { x: pacman.speed, y: 0 },
      })
    } else if (variables.lastKeyPressed === 'left') {
      this.checkDirectionChange(pacman, boundaries, {
        velocity: { x: -pacman.speed, y: 0 },
      })
    }
  }

  /**
   * Проверяет, произошло ли изменение направления движения Pacman при взаимодействии с границами.
   *
   * @param pacman - Объект, представляющий персонажа Pacman.
   * @param boundaries - Массив границ игрового поля.
   * @param options - Объект с информацией о скорости движения Pacman.
   */
  static checkDirectionChange(
    pacman: IPacman,
    boundaries: IBoundary[],
    { velocity }: { velocity: ICoordinates }
  ) {
    let count = 0
    for (let i = 0; i < boundaries.length; i++) {
      if (
        BoundaryManager.hitBoundaryConditional(pacman, boundaries[i], {
          velocity,
        })
      ) {
        count++
      }
    }
    if (count === 0) {
      pacman.velocity.x = velocity.x
      pacman.velocity.y = velocity.y
    }
  }

  /**
   * Проверяет, есть ли элементы для поедания рядом с персонажем Pacman и
   * обновляет его состояние еды.
   *
   * @param assets - Объект, содержащий различные игровые ресурсы.
   */
  static checkIfPacmanIsEating(assets: IGameAssets) {
    let count = 0
    const pacman = assets.characters.pacman
    assets.props.pellets.forEach(pellet => {
      if (
        pellet.position.y - pellet.radius <=
          pacman.position.y + pacman.radius * 2 + pacman.velocity.y * 2 &&
        pellet.position.y + pellet.radius >=
          pacman.position.y - pacman.radius * 2 + pacman.velocity.y * 2 &&
        pellet.position.x + pellet.radius >=
          pacman.position.x - pacman.radius * 2 + pacman.velocity.x * 2 &&
        pellet.position.x - pellet.radius <=
          pacman.position.x + pacman.radius * 2 + pacman.velocity.x * 2 &&
        !pellet.hasBeenEaten
      ) {
        count++
      }
    })
    pacman.isEating = count > 0
  }
}
