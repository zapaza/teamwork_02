import Graphics from './graphics'
import { IGameAssets, IPacman, IPellet, IVariables } from './types'
import playGame from './game'

/**
 * Класс PelletManager отвечает за управление точками (пеллетами) в игре Pacman
 */
export default class PelletManager {
  /**
   * Проверяет, съел ли пакман пеллет. Если пакман съел пеллет, вызывается
   * соответствующий метод для изменения состояния пеллета и увеличения счета игрока.
   * @param pellet Объект пеллета, который проверяется на съедение.
   * @param pacman Объект PacMan.
   * @param variables Объект с переменными и состояниями игры.
   */
  static eatPellet(pellet: IPellet, pacman: IPacman, variables: IVariables) {
    if (
      pellet.position.x === pacman.position.x &&
      pellet.position.y === pacman.position.y
    ) {
      pellet.changeEatenState();
      variables.score += 10;
    }
  }

  /**
   * Проверяет условие перехода на следующий уровень. Если все пеллеты съедены,
   * игра переходит на следующий уровень, и проигрывается соответствующая анимация.
   * @param assets Объект, содержащий все игровые ресурсы и персонажей.
   * @param variables Объект с переменными и состояниями игры.
   * @param ctx Контекст рендеринга для отрисовки.
   */

  static checkLevelUpCondition(assets: IGameAssets, variables: IVariables, ctx: CanvasRenderingContext2D) {
    let eatenPellets = 0;
    assets["props"]["pellets"].forEach((pellet) => {
      if (pellet.hasBeenEaten) {
        eatenPellets++;
      }
      if (eatenPellets === assets["props"]["pellets"].length) {
        cancelAnimationFrame(variables.animationId as number);
        assets["characters"]["pacman"].isLevellingUp = true;
        Graphics.runLevelUpAnimation(variables, assets, ctx);
      }
    });
  }

  /**
   * Сбрасывает состояние игры после перехода на следующий уровень
   * @param assets Объект, содержащий все игровые ресурсы и персонажей.
   * @param variables Объект с переменными и состояниями игры.
   * @param callback Функция обратного вызова для продолжения игры после сброса.
   */
  static resetAfterLevelUp(
    assets: IGameAssets,
    variables: IVariables,
    callback = playGame
  ) {
    assets["characters"]["pacman"].reset();
    variables.lastKeyPressed = "";
    variables.levelUpCount = 0;
    assets["timers"]["cycleTimer"].reset();
    assets["timers"]["scaredTimer"].reset();
    if (assets["timers"]["scaredTimer"].duration as number > 0){
      (assets["timers"]["scaredTimer"].duration as number) -= 500;
    }

    Object.values(assets["characters"]["ghosts"]).forEach((ghost) => {
      ghost.reset();
    });
    assets["props"]["pellets"].forEach((pellet) => {
      pellet.changeEatenState();
    });
    assets["props"]["powerUps"].forEach((powerUp) => {
      if (powerUp.hasBeenEaten) {
        powerUp.changeEatenState();
      }
    });
    assets["timers"]["cycleTimer"].start();
    callback(variables.player);
  }
}
