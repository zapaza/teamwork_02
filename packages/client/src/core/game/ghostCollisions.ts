import Graphics from './graphics'
import Animator from './animations'
import { IGameAssets, IGhost, IPacman, IVariables } from './types'
import playGame from './game'

/**
 * Класс `GhostCollision` предоставляет функции для обработки столкновений
 * призраков с Pacman и управления игровым процессом после столкновений.
 */
export default class GhostCollision {
  /**
   * Проверяет, происходит ли столкновение между призраком и Pacman.
   * @param ghost Объект призрака.
   * @param pacman Объект Pacman.
   * @returns `true`, если происходит столкновение, и `false` в противном случае.
   */
  static collisionConditional(ghost: IGhost, pacman: IPacman) {
    return ghost.position.y - ghost.radius <= pacman.position.y + pacman.radius &&
      ghost.position.y + ghost.radius >= pacman.position.y - pacman.radius &&
      ghost.position.x + ghost.radius >= pacman.position.x - pacman.radius &&
      ghost.position.x - ghost.radius <= pacman.position.x + pacman.radius

  }

  /**
   * Обрабатывает столкновение призрака с Pacman.
   * @param ghost Объект призрака.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param variables Объект с переменными и состояниями игры.
   * @param ctx Контекст холста для отрисовки игровых объектов.
   */
  static dealWithCollision(
    ghost: IGhost,
    assets: IGameAssets,
    variables: IVariables,
    ctx: CanvasRenderingContext2D
  ) {
    if (!ghost.isScared && !ghost.isRetreating) {
      assets['characters']['pacman'].radians = Math.PI / 4
      cancelAnimationFrame(variables.animationId as number)
      assets['characters']['pacman'].isShrinking = true
      Graphics.runDeathAnimation(variables, ctx, assets)
    } else if (ghost.isScared) {
      variables.score += 200 * Math.pow(2, variables.killCount)
      variables.killCount++
      ghost.changeRetreatingState()
      ghost.retreatingTimer!.start()
      ghost.changeScaredState()
    }
  }

  /**
   * Проверяет количество жизней Pacman после столкновения с призраком.
   * Если у Pacman остались жизни, происходит сброс после смерти.
   * В противном случае игра завершается.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param variables Объект с переменными и состояниями игры.
   * @param ctx Контекст холста для отрисовки игровых объектов.
   * @param endGame Функция для завершения игры (по умолчанию `GhostCollision.endGame`).
   * @param resetAfterDeath Функция для сброса состояния после смерти Pacman (по умолчанию `GhostCollision.resetAfterDeath`).
   */
  static checkPacmanLives(
    assets: IGameAssets,
    variables: IVariables,
    ctx: CanvasRenderingContext2D,
    endGame = GhostCollision.endGame,
    resetAfterDeath = GhostCollision.resetAfterDeath
  ) {
    if (assets['characters']['pacman'].lives <= 0) {
      endGame(variables, assets, ctx)
    } else {
      assets['characters']['pacman'].lives--
      resetAfterDeath(assets, variables)
    }
  }

  /**
   * Завершает игру после смерти Pacman (когда у Pacman заканчиваются жизни).
   * Сохраняет результаты игры в лидерборд (если игра была совершена зарегистрированным пользователем)
   * и сбрасывает состояние игры для начала новой игры.
   * @param variables Объект с переменными и состояниями игры.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param ctx Контекст холста для отрисовки игровых объектов.
   * @param saveScore Функция для сохранения результатов игры в лидерборд (по умолчанию `GhostCollision.saveScore`).
   * @param resetAfterGameOver Функция для сброса состояния игры после
   * завершения игры (по умолчанию `GhostCollision.resetAfterGameOver`).
   */
  static async endGame(
    variables: IVariables,
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D,
    saveScore = GhostCollision.saveScore,
    resetAfterGameOver = GhostCollision.resetAfterGameOver
  ) {
    cancelAnimationFrame(variables.animationId as number)
    if (variables.player) {
      await saveScore(variables, '')
      // todo после запроса добавить переход на страницу лидборда
    }
    // resetAfterGameOver(assets, variables)
    Animator.displayGameOver(ctx);
  }

  /**
   * Сохраняет результаты игры в лидерборд.
   * @param variables Объект с переменными и состояниями игры.
   * @param getBackendUrl Функция для получения URL бэкенда (по умолчанию `GhostCollision.getBackendUrl`).
   * @returns Промис с результатом сохранения результатов игры (успешно или с ошибкой).
   */
  static async saveScore(
    variables: IVariables,
    getBackendUrl: string
  ) {
    // TODO сделать роут для отправки инфы на бек? что бы выводить потом его в лидерборд
  }


  /**
   * Сбрасывает состояние игры после завершения игры (когда у Pacman заканчиваются жизни).
   * Подготавливает игру для начала новой игры.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param variables Объект с переменными и состояниями игры.
   */
  static resetAfterGameOver(assets: IGameAssets, variables: IVariables) {
    assets['props']['pellets'].forEach((pellet) => {
      if (pellet.hasBeenEaten) {
        pellet.changeEatenState()
      }
    })
    assets['props']['powerUps'].forEach((powerUp) => {
      if (powerUp.hasBeenEaten) {
        powerUp.changeEatenState()
      }
    })
    assets['timers']['cycleTimer'].reset()
    assets['timers']['scaredTimer'].reset()
    assets['timers']['scaredTimer'].duration = 7000
    Object.values(assets['characters']['ghosts']).forEach((ghost) => {
      ghost.reset()
    })
    assets['characters']['pacman'].reset()
    assets['characters']['pacman'].lives = 2
    variables.lastKeyPressed = ''
    variables.level = 1

    window.removeEventListener('keydown', variables.directionEventListener as (event: Event) => void);
    window.removeEventListener('visibilitychange', variables.visibilityEventListener as (event: Event) => void);
    window.removeEventListener('keydown', variables.pauseEventListener as (event: Event) => void);
  }

  /**
   * Сбрасывает состояние игры после смерти Pacman (когда Pacman сталкивается с призраком).
   * Подготавливает игру для продолжения после смерти Pacman.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param variables Объект с переменными и состояниями игры.
   * @param callbackOne Функция обратного вызова для запуска новой игры (по умолчанию `playGame`).
   */
  static resetAfterDeath(
    assets: IGameAssets,
    variables: IVariables,
    callbackOne = playGame) {
    assets['characters']['pacman'].reset()
    variables.lastKeyPressed = ''
    assets['timers']['cycleTimer'].reset()
    assets['timers']['scaredTimer'].reset()
    Object.values(assets['characters']['ghosts']).forEach((ghost) => {
      ghost.reset()
    })
    assets['timers']['cycleTimer'].start()
    callbackOne(variables.player)
  }
}
