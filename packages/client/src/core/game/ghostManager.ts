import GhostMovement from './ghostMovement'
import BoundaryManager from './boundaryManager'
import GhostCollision from './ghostCollisions'
import { IBoundary, IGameAssets, IGhost, IVariables } from './types'

/**
 * Класс `GhostManager` управляет поведением призраков в игре.
 */
export default class GhostManager {
  /**
   * Проверяет текущее состояние призрака (испуган, отступает, обычное)
   * и соответствующим образом корректирует его скорость,
   * чтобы она соответствовала длине тайла.
   * @param ghost Объект призрака.
   * @param variables Объект с переменными и состояниями игры.
   */
  static checkSpeedMatchesState(ghost: IGhost, variables: IVariables) {
    if (ghost.isScared && ghost.speed === variables.tileLength / 8) {
      GhostMovement.adjustPosition(ghost)
      ghost.velocity.x /= 2
      ghost.velocity.y /= 2
      ghost.speed /= 2
    } else if (
      ghost.isRetreating &&
      ghost.speed === variables.tileLength / 16
    ) {
      GhostMovement.adjustPosition(ghost)
      ghost.velocity.x *= 4
      ghost.velocity.y *= 4
      ghost.speed *= 4
    } else if (!ghost.isScared && ghost.speed === variables.tileLength / 16) {
      GhostMovement.adjustPosition(ghost)
      ghost.velocity.x *= 2
      ghost.velocity.y *= 2
      ghost.speed *= 2
    } else if (
      !ghost.isRetreating &&
      ghost.speed === variables.tileLength / 4
    ) {
      GhostMovement.adjustPosition(ghost)
      ghost.velocity.x /= 2
      ghost.velocity.y /= 2
      ghost.speed /= 2
    }
  }

  /**
   * Обновляет массив collisions на основе текущего положения призрака
   * и границ игрового мира. Он определяет, сталкивается ли призрак
   * с какими-либо границами, и обновляет массив collisions в
   * соответствии с этим.
   * @param boundaries Массив границ игрового поля.
   * @param collisions Массив со списком направлений, которые призрак не может выбрать из-за препятствий.
   * @param ghost Объект призрака
   */
  static updateCollisions(
    boundaries: IBoundary[],
    collisions: string[],
    ghost: IGhost
  ) {
    boundaries.forEach(boundary => {
      if (
        !collisions.includes('down') &&
        BoundaryManager.hitBoundaryConditional(ghost, boundary, {
          velocity: { x: 0, y: ghost.speed },
        })
      ) {
        collisions.push('down')
      } else if (
        !collisions.includes('right') &&
        BoundaryManager.hitBoundaryConditional(ghost, boundary, {
          velocity: { x: ghost.speed, y: 0 },
        })
      ) {
        collisions.push('right')
      } else if (
        !collisions.includes('left') &&
        BoundaryManager.hitBoundaryConditional(ghost, boundary, {
          velocity: { x: -ghost.speed, y: 0 },
        })
      ) {
        collisions.push('left')
      } else if (
        !collisions.includes('up') &&
        BoundaryManager.hitBoundaryConditional(ghost, boundary, {
          velocity: { x: 0, y: -ghost.speed },
        })
      ) {
        collisions.push('up')
      }
    })
    if (collisions.length > ghost.prevCollisions.length) {
      ghost.prevCollisions = collisions
    }
  }

  /**
   * Этот метод выбирает направление движения призрака на основе его текущего состояния
   * (испуган, отступает, обычное). Если призрак не испуган и не отступает,
   * метод использует GhostMovement.chaseAndScatter, чтобы определить
   * направление его движения. В противном случае, призрак будет
   * двигаться случайно.
   * @param ghost Объект призрака
   * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
   * @param collisions Массив со списком направлений, которые призрак не может выбрать из-за препятствий.
   * @param variables Объект с переменными и состояниями игры.
   */
  static chooseMovement(
    ghost: IGhost,
    assets: IGameAssets,
    collisions: string[],
    variables: IVariables
  ) {
    if (!ghost.isScared && !ghost.isRetreating) {
      GhostMovement.chaseAndScatter(ghost, assets, collisions, variables)
    } else {
      GhostMovement.moveRandomly(ghost, collisions)
    }

    GhostMovement.emptyPrevCollisions(ghost)
  }

  /**
   *  Проверяет столкновение между призраком и пакманом. Если столкновение обнаружено,
   *  метод вызывает GhostCollision.dealWithCollision,
   *  чтобы обработать столкновение.
   * @param ghost Объект призрака
   * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
   * @param variables Объект с переменными и состояниями игры.
   * @param ctx Контекст канваса для отрисовки столкновения.
   */
  static checkPacmanGhostCollision(
    ghost: IGhost,
    assets: IGameAssets,
    variables: IVariables,
    ctx: CanvasRenderingContext2D
  ) {
    if (GhostCollision.collisionConditional(ghost, assets.characters.pacman)) {
      GhostCollision.dealWithCollision(ghost, assets, variables, ctx)
    }
  }
}
