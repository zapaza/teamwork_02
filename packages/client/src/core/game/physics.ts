import BoundaryManager from './boundaryManager'
import PelletManager from './pelletManager'
import PowerUpManager from './powerUpManager'
import GhostManager from './ghostManager'
import PacmanManager from './pacmanManager'
import { IGameAssets, IVariables } from './types'

export default class Physics {
  /**
   * Реализует границы игрового поля и обработку столкновений для персонажа Pacman.
   * @param assets - Игровые ресурсы, содержащие препятствия и персонажа Pacman.
   * @param ctx - Контекст рендеринга холста.
   */
  static handleBoundariesAndCollisionsWithPacman(
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D
  ) {
    assets.props.boundaries.forEach(boundary => {
      boundary.draw(ctx)
      BoundaryManager.stopPacmanCollision(boundary, assets.characters.pacman)
    })
  }

  /**
   * Реализует точки (пеллеты), их поедание и проверку условия перехода на следующий уровень.
   * @param assets - Игровые ресурсы, содержащие пеллеты и персонажа Pacman.
   * @param ctx - Контекст рендеринга холста.
   * @param variables - Игровые переменные.
   */
  static handlePelletsAndLevelUpCondition(
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D,
    variables: IVariables
  ) {
    assets.props.pellets.forEach(pellet => {
      if (!pellet.hasBeenEaten) {
        pellet.draw(ctx)
        PelletManager.eatPellet(pellet, assets.characters.pacman, variables)
      }
    })
    PelletManager.checkLevelUpCondition(assets, variables, ctx)
  }

  /**
   * Реализует бонусы (пауэр-апы) и их поедание.
   * @param assets - Игровые ресурсы, содержащие бонусы.
   * @param ctx - Контекст рендеринга холста.
   * @param variables - Игровые переменные.
   */
  static handlePowerUpsAndEating(
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D,
    variables: IVariables
  ) {
    assets.props.powerUps.forEach(powerUp => {
      if (!powerUp.hasBeenEaten) {
        powerUp.update(ctx)
        PowerUpManager.eatPowerUp(powerUp, assets, variables)
      }
    })
  }

  /**
   * Реализует движение призраков и обработку столкновений с Pacman..
   * @param assets - Игровые ресурсы, содержащие бонусы.
   * @param ctx - Контекст рендеринга холста.
   * @param variables - Игровые переменные.
   */
  static handleGhostsAndCollisionsWithPacman(
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D,
    variables: IVariables
  ) {
    Object.values(assets.characters.ghosts).forEach(ghost => {
      GhostManager.checkSpeedMatchesState(ghost, variables)
      const collisions: string[] = []
      ghost.update(ctx)
      BoundaryManager.implementTunnel(ghost, variables)
      GhostManager.updateCollisions(assets.props.boundaries, collisions, ghost)
      if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
        GhostManager.chooseMovement(ghost, assets, collisions, variables)
      }
      GhostManager.checkPacmanGhostCollision(ghost, assets, variables, ctx)
    })
  }

  /**
   * Реализует движение, изменение направления и поедание для персонажа Pacman.
   * @param assets - Игровые ресурсы, содержащие бонусы.
   * @param ctx - Контекст рендеринга холста.
   * @param variables - Игровые переменные.
   */
  static handlePacmanMovementAndEating(
    variables: IVariables,
    assets: IGameAssets,
    ctx: CanvasRenderingContext2D
  ) {
    PacmanManager.changeDirection(variables, assets)
    PacmanManager.checkIfPacmanIsEating(assets)
    assets.characters.pacman.update(ctx)
    BoundaryManager.implementTunnel(assets.characters.pacman, variables)
  }
}
