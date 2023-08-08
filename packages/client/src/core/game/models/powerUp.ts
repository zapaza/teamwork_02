import { ICoordinates, IPowerUp } from '../types'

/**
 * Класс `PowerUp` представляет объект силового бонуса (Power-Up) на игровом поле.
 */
export default class PowerUp implements IPowerUp {
  position: ICoordinates
  radius: number
  hasBeenEaten: boolean
  rate: number
  tileLength: number

  constructor({ position }: { position: ICoordinates }, tileLength: number) {
    this.position = position
    this.radius = (tileLength * 7) / 20
    this.hasBeenEaten = false
    this.rate = -tileLength / 50
    this.tileLength = tileLength
  }

  /**
   * Изменяет состояние бонуса на "съеден" или "не съеден".
   */
  changeEatenState() {
    this.hasBeenEaten = !this.hasBeenEaten
  }

  /**
   * Обновляет состояние бонуса и рисует его на холсте.
   * @param ctx Контекст рисования холста.
   */
  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
    this.flash()
  }

  /**
   * Рисует бонус на холсте.
   * @param ctx Контекст рисования холста.
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.closePath()
  }

  /**
   * Мигает бонусом, меняя его радиус.
   */
  flash() {
    if (
      this.radius <= this.tileLength / 4 ||
      this.radius >= (this.tileLength * 9) / 20
    ) {
      this.rate = -this.rate
    }
    this.radius += this.rate
  }
}
