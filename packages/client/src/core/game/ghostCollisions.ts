import Graphics from './graphics'
import { IGameAssets, IGhost, IPacman, IVariables } from './types'

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
    return (
      ghost.position.y - ghost.radius <= pacman.position.y + pacman.radius &&
      ghost.position.y + ghost.radius >= pacman.position.y - pacman.radius &&
      ghost.position.x + ghost.radius >= pacman.position.x - pacman.radius &&
      ghost.position.x - ghost.radius <= pacman.position.x + pacman.radius
    )
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
      assets.characters.pacman.radians = Math.PI / 4
      cancelAnimationFrame(variables.animationId as number)
      assets.characters.pacman.isShrinking = true
      assets.audioPlayer.stopAllGhostAudio()
      assets.audioPlayer.playPacmanDeath()
      Graphics.runDeathAnimation(variables, ctx, assets)
    } else if (ghost.isScared) {
      variables.score += 200 * Math.pow(2, variables.killCount)
      variables.killCount++
      ghost.changeRetreatingState()
      ghost.retreatingTimer!.start()
      ghost.changeScaredState()
    }
  }
}
