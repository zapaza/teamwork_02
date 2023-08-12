import { ICoordinates, IPacman, IPacmanParams } from '../types'
import AudioPlayer from './audioPlayer'

export default class PacMan implements IPacman {
  originalPosition: ICoordinates
  position: ICoordinates
  originalVelocity: ICoordinates
  velocity: ICoordinates
  tileLength: number
  radius: number
  speed: number
  radians: number
  openRate: number
  shrinkRate: number
  rotation: number
  lives: number
  isEating: boolean
  isShrinking: boolean
  isLevellingUp: boolean

  constructor({ position, velocity }: IPacmanParams, tileLength: number) {
    this.originalPosition = position
    this.position = { ...this.originalPosition }
    this.originalVelocity = velocity
    this.velocity = { ...this.originalVelocity }
    this.tileLength = tileLength
    this.radius = (tileLength * 3) / 8
    this.speed = tileLength / 8
    this.radians = Math.PI / 4
    this.openRate = Math.PI / 36
    this.shrinkRate = Math.PI / 220
    this.rotation = 0
    this.lives = 2
    this.isEating = false
    this.isShrinking = false
    this.isLevellingUp = false
  }

  /**
   * Рисует Пакмана на холсте.
   * @param ctx Контекст рисования холста.
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.rotation)
    ctx.translate(-this.position.x, -this.position.y)
    ctx.beginPath()
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius * 2,
      this.radians,
      Math.PI * 2 - this.radians
    )
    ctx.lineTo(this.position.x - this.tileLength / 4, this.position.y)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  /**
   * Обновляет положение Пакмана и его визуальное представление на холсте.
   * @param ctx Контекст рисования холста.
   */
  update(ctx: CanvasRenderingContext2D) {
    this.checkRotation()
    this.draw(ctx)
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.chomp()
    } else {
      this.radians = Math.PI / 4
    }
  }

  /**
   * Производит анимацию движения рта Пакмана при передвижении.
   */
  chomp() {
    if (this.radians < Math.PI / 36 || this.radians > Math.PI / 4) {
      if (this.isEating) {
        new AudioPlayer().playEating()
      }

      this.openRate = -this.openRate
    }

    this.radians += this.openRate
  }

  /**
   * Проверяет и устанавливает угол поворота Пакмана в зависимости от направления его движения.
   */
  checkRotation() {
    if (this.velocity.x > 0) {
      this.rotation = 0
    } else if (this.velocity.x < 0) {
      this.rotation = Math.PI
    } else if (this.velocity.y > 0) {
      this.rotation = Math.PI / 2
    } else if (this.velocity.y < 0) {
      this.rotation = (Math.PI * 3) / 2
    }
  }

  /**
   * Производит анимацию уменьшения размера Пакмана при столкновении с привидением.
   * @param ctx Контекст рисования холста.
   */
  shrink(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
    this.radians += this.shrinkRate
  }

  /**
   * Сбрасывает состояние Пакмана в исходное состояние.
   */
  reset() {
    this.position = { ...this.originalPosition }
    this.velocity = { ...this.originalVelocity }
    this.radians = Math.PI / 4
    this.openRate = Math.PI / 36
    this.rotation = 0
  }
}
