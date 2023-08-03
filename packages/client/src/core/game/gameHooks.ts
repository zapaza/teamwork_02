import EventListener from './eventListeners'
import Physics from './physics'
import Graphics from './graphics'
import { IGameAssets, IPacman, IVariables } from './types'

/**
 * Класс `GameHooks` представляет игровую логику и управление игрой.
 */
export default class GameHooks {
  /**
   * Завершает настройку игры после загрузки ресурсов.
   * @param variables Объект с переменными игры.
   * @param player Объект игрока.
   * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
   * @param ctx Контекст холста для отрисовки игровой информации.
   */
  static finishSetup(
    variables: IVariables,
    player: any,
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D
  ) {
    variables.player = player
    assets['timers']['cycleTimer'].start()
    EventListener.addDirectionDetection(variables)
    EventListener.addVisibilityDetection(variables, assets)
    EventListener.addPauseDetection(variables, assets, ctx)
    variables.start = false
    variables.startTime = performance.now()
  }

  /**
   * Применяет физику игры (взаимодействие с объектами).
   * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
   * @param ctx Контекст холста для отрисовки игровой информации.
   * @param variables Объект с переменными игры.
   */
  static implementPhysics(
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D,
    variables: IVariables
  ) {
    Physics.implementBoundaries(assets, ctx)
    Physics.implementPellets(assets, ctx, variables)
    Physics.implementPowerUps(assets, ctx, variables)
    Physics.implementGhosts(assets, ctx, variables)
    Physics.implementPacman(variables, assets, ctx)
  }

  /**
   * Применяет графику игры (отрисовка игровой информации).
   * @param variables Объект с переменными игры.
   * @param pacman Объект PacMan.
   */
  static implementGraphics(variables: IVariables, pacman: IPacman) {
    const info = document.querySelector<HTMLCanvasElement>('#info')
    const ctx = info!.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, info!.width, info!.height)
      ctx.font = '16px Inter'
      ctx.textBaseline = 'middle'

      Graphics.displayScore(ctx, variables)
      Graphics.displayLevel(ctx, variables)
      Graphics.displayLives(ctx, pacman)
    }
  }
}
