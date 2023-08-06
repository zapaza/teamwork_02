import Animator from './animations'
import PelletManager from './pelletManager'
import GhostCollision from './ghostCollisions'
import { ICoordinates, IGameAssets, IPacman, IVariables } from './types'

/**
 * Класс `Graphics` предоставляет функции для отрисовки графики и анимации в игре.
 */
export default class Graphics {
  /**
   * Отображает текущий счет игрока.
   * @param ctx Контекст канваса для отрисовки счета.
   * @param variables Объект с переменными и состояниями игры.
   */
  static displayScore(ctx: CanvasRenderingContext2D, variables: IVariables) {
    ctx.fillStyle = 'white'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${variables.score}`, 10, 15)
  }

  /**
   * Отображает текущий уровень игры.
   * @param ctx Контекст канваса для отрисовки уровня.
   * @param variables Объект с переменными и состояниями игры.
   */
  static displayLevel(ctx: CanvasRenderingContext2D, variables: IVariables) {
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(`Level ${variables.level}`, 300, 15)
  }

  /**
   * Отображает количество жизней игрока в виде иконки Pacman.
   * @param ctx Контекст канваса для отрисовки иконки Pacman.
   * @param pacman Объект класса Pacman с информацией о текущем количестве жизней.
   * @param drawPacmanIcon Функция для отрисовки иконки Pacman (по умолчанию `Graphics.drawPacmanIcon`).
   */
  static displayLives(
    ctx: CanvasRenderingContext2D,
    pacman: IPacman,
    drawPacmanIcon = Graphics.drawPacmanIcon
  ) {
    if (pacman.lives >= 1) {
      drawPacmanIcon(ctx, {
        x: 580,
        y: 15,
      })
    }

    if (pacman.lives >= 2) {
      drawPacmanIcon(ctx, {
        x: 540,
        y: 15,
      })
    }
  }

  /**
   * Отображает иконку Pacman.
   * @param ctx Контекст канваса для отрисовки иконки Pacman.
   * @param position Позиция для размещения иконки Pacman (объект с координатами x и y).
   */
  static drawPacmanIcon(ctx: CanvasRenderingContext2D, position: ICoordinates) {
    ctx.beginPath()
    ctx.arc(position.x, position.y, 15, Math.PI / 4, (Math.PI * 7) / 4)
    ctx.lineTo(position.x - 5, position.y)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
  }

  /**
   * Запускает анимацию уровня "Level Up!".
   * @param variables Объект с переменными и состояниями игры.
   * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
   * @param ctx Контекст канваса для отрисовки игровых элементов.
   * @param runLevelUpAnimation Функция для продолжения анимации "Level Up!" (по умолчанию `Graphics.runLevelUpAnimation`).
   */
  static runLevelUpAnimation(
    variables: IVariables,
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D,
    runLevelUpAnimation = Graphics.runLevelUpAnimation
  ) {
    variables.animationId = requestAnimationFrame(() =>
      runLevelUpAnimation(variables, assets, ctx)
    )
    if (performance.now() - variables.startTime >= variables.frameLifetime) {
      Animator.drawLevelUpBoard(ctx, assets['props']['boundaries'])

      if (variables.levelUpCount % 10 === 0 && variables.levelUpCount !== 0) {
        assets['props']['boundaries'].forEach(boundary => boundary.flash())
      }
      variables.levelUpCount++

      if (variables.levelUpCount >= 350) {
        assets['characters']['pacman'].isLevellingUp = false
        cancelAnimationFrame(variables.animationId)
        variables.level++
        PelletManager.resetAfterLevelUp(assets, variables)
      }
      variables.startTime = performance.now()
    }
  }

  /**
   * Запускает анимацию смерти персонажа Pacman.
   * @param variables Объект с переменными и состояниями игры.
   * @param ctx Контекст канваса для отрисовки игровых элементов.
   * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
   * @param runDeathAnimation Функция для продолжения анимации смерти (по умолчанию `Graphics.runDeathAnimation`).
   */
  static runDeathAnimation(
    variables: IVariables,
    ctx: CanvasRenderingContext2D,
    assets: IGameAssets,
    runDeathAnimation = Graphics.runDeathAnimation
  ) {
    variables.animationId = requestAnimationFrame(() =>
      runDeathAnimation(variables, ctx, assets)
    )
    if (performance.now() - variables.startTime >= variables.frameLifetime) {
      Animator.drawBoard(ctx, assets)
      const pacman = assets['characters']['pacman']
      if (pacman.radians < Math.PI) {
        pacman.shrink(ctx)
      } else {
        pacman.isShrinking = false
        cancelAnimationFrame(variables.animationId)
        GhostCollision.checkPacmanLives(assets, variables, ctx)
      }
      variables.startTime = performance.now()
    }
  }
}
