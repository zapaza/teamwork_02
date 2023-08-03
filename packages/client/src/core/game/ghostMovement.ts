import {
  ICoordinates,
  IGameAssets,
  IGhost,
  IPacman,
  IPathway,
  IVariables,
} from './types'

/**
 * Класс `GhostMovement` предоставляет функции для управления движением призраков в игре.
 */
export default class GhostMovement {
  /**
   * Корректирует позицию призрака в зависимости от его
   * текущего состояния (отступление или обычное движение).
   * @param ghost Объект призрака.
   * @param shiftBeforeRetreating Функция для корректировки позиции призрака перед отступлением (по умолчанию `GhostMovement.shiftBeforeRetreating`).
   * @param shiftRegular Функция для корректировки позиции призрака при обычном движении (по умолчанию `GhostMovement.shiftRegular`).
   */
  static adjustPosition(
    ghost: IGhost,
    shiftBeforeRetreating = GhostMovement.shiftBeforeRetreating,
    shiftRegular = GhostMovement.shiftRegular
  ) {
    if (ghost.isRetreating) {
      shiftBeforeRetreating(ghost)
    } else {
      shiftRegular(ghost)
    }
  }

  /**
   * Корректирует позицию призрака перед отступлением.
   * @param ghost Объект призрака.
   * @param shiftLeft Функция для корректировки позиции призрака влево (по умолчанию `GhostMovement.shiftLeft`).
   * @param shiftRight Функция для корректировки позиции призрака вправо (по умолчанию `GhostMovement.shiftRight`).
   * @param shiftUp Функция для корректировки позиции призрака вверх (по умолчанию `GhostMovement.shiftUp`).
   * @param shiftDown Функция для корректировки позиции призрака вниз (по умолчанию `GhostMovement.shiftDown`).
   */
  static shiftBeforeRetreating(
    ghost: IGhost,
    shiftLeft = GhostMovement.shiftLeft,
    shiftRight = GhostMovement.shiftRight,
    shiftUp = GhostMovement.shiftUp,
    shiftDown = GhostMovement.shiftDown
  ) {
    if (ghost.velocity.x > 0) {
      shiftLeft(ghost)
    } else if (ghost.velocity.x < 0) {
      shiftRight(ghost)
    }
    if (ghost.velocity.y > 0) {
      shiftUp(ghost)
    } else if (ghost.velocity.y < 0) {
      shiftDown(ghost)
    }
  }

  /**
   * Корректирует позицию призрака при обычном движении.
   * @param ghost Объект призрака.
   */
  static shiftRegular(ghost: IGhost) {
    if (ghost.position.x % 4 !== 0) ghost.position.x += 2
    if (ghost.position.y % 4 !== 0) ghost.position.y += 2
  }

  /**
   * Корректирует позицию призрака влево.
   * @param ghost Объект призрака.
   */
  static shiftLeft(ghost: IGhost) {
    if (ghost.position.x % 8 === 2) ghost.position.x -= 2
    else if (ghost.position.x % 8 === 4) ghost.position.x -= 4
    else if (ghost.position.x % 8 === 6) ghost.position.x -= 6
  }

  /**
   * Корректирует позицию призрака вправо.
   * @param ghost Объект призрака.
   */
  static shiftRight(ghost: IGhost) {
    if (ghost.position.x % 8 === 2) ghost.position.x += 6
    else if (ghost.position.x % 8 === 4) ghost.position.x += 4
    else if (ghost.position.x % 8 === 6) ghost.position.x += 2
  }

  /**
   * Корректирует позицию призрака вверх.
   * @param ghost Объект призрака.
   */
  static shiftUp(ghost: IGhost) {
    if (ghost.position.y % 8 === 2) ghost.position.y -= 2
    else if (ghost.position.y % 8 === 4) ghost.position.y -= 4
    else if (ghost.position.y % 8 === 6) ghost.position.y -= 6
  }

  /**
   * Корректирует позицию призрака вниз.
   * @param ghost Объект призрака.
   */
  static shiftDown(ghost: IGhost) {
    if (ghost.position.y % 8 === 2) ghost.position.y += 6
    else if (ghost.position.y % 8 === 4) ghost.position.y += 4
    else if (ghost.position.y % 8 === 6) ghost.position.y += 2
  }

  /**
   * Осуществляет преследование или разбегание призрака в зависимости от его текущего состояния.
   * @param ghost Объект призрака.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param collisions Массив со списком направлений, которые призрак не может выбрать из-за препятствий.
   * @param variables Объект с переменными и состояниями игры.
   * @param calculateDistance Функция для вычисления расстояния между призраком и целевыми направлениями (по умолчанию `GhostMovement.calculateDistance`).
   * @param pickDirection Функция для выбора направления движения призрака (по умолчанию `GhostMovement.pickDirection`).
   */
  static chaseAndScatter(
    ghost: IGhost,
    assets: IGameAssets,
    collisions: string[],
    variables: IVariables,
    calculateDistance = GhostMovement.calculateDistance,
    pickDirection = GhostMovement.pickDirection
  ) {
    if (ghost.velocity.x > 0) {
      ghost.prevCollisions.push('right')
    } else if (ghost.velocity.x < 0) {
      ghost.prevCollisions.push('left')
    } else if (ghost.velocity.y > 0) {
      ghost.prevCollisions.push('down')
    } else if (ghost.velocity.y < 0) {
      ghost.prevCollisions.push('up')
    }

    const pathways: IPathway[] = []
    ghost.prevCollisions.forEach(collision => {
      if (!collisions.includes(collision)) {
        pathways.push({ direction: collision })
      }
    })
    calculateDistance(assets, ghost, pathways, variables)
    pickDirection(pathways, ghost)
  }

  /**
   * Вычисляет расстояние между призраком и целевыми направлениями.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param ghost Объект призрака.
   * @param pathways Массив с возможными направлениями для движения призрака.
   * @param variables Объект с переменными и состояниями игры.
   * @param addCoordinates Функция для добавления координат целевых направлений (по умолчанию `GhostMovement.addCoordinates`).
   * @param chase Функция для вычисления вектора направления преследования (по умолчанию `GhostMovement.chase`).
   * @param scatter Функция для вычисления вектора направления разбегания (по умолчанию `GhostMovement.scatter`).
   * @param calculateHypotenuse Функция для вычисления гипотенузы треугольника по двум катетам (по умолчанию `GhostMovement.calculateHypotenuse`).
   */
  static calculateDistance(
    assets: IGameAssets,
    ghost: IGhost,
    pathways: IPathway[],
    variables: IVariables,
    addCoordinates = GhostMovement.addCoordinates,
    chase = GhostMovement.chase,
    scatter = GhostMovement.scatter,
    calculateHypotenuse = GhostMovement.calculateHypotenuse
  ) {
    pathways.forEach(pathway => {
      addCoordinates(pathway, ghost, variables)
      let displacementFromAim
      if (ghost.isChasing) {
        displacementFromAim = chase(ghost, pathway, assets, variables)
      } else if (!ghost.isChasing) {
        displacementFromAim = scatter(ghost, pathway)
      }
      calculateHypotenuse(displacementFromAim as ICoordinates, pathway)
    })
  }

  /**
   * Добавляет координаты целевых направлений к путям движения призрака.
   * @param pathway Объект пути движения призрака.
   * @param ghost Объект призрака.
   * @param variables Объект с переменными и состояниями игры.
   */
  static addCoordinates(
    pathway: IPathway,
    ghost: IGhost,
    variables: IVariables
  ) {
    if (pathway.direction === 'up') {
      pathway.position = {
        x: ghost.position.x,
        y: ghost.position.y - variables.tileLength / 8,
      }
    } else if (pathway.direction === 'left') {
      pathway.position = {
        x: ghost.position.x - variables.tileLength / 8,
        y: ghost.position.y,
      }
    } else if (pathway.direction === 'right') {
      pathway.position = {
        x: ghost.position.x + variables.tileLength / 8,
        y: ghost.position.y,
      }
    } else if (pathway.direction === 'down') {
      pathway.position = {
        x: ghost.position.x,
        y: ghost.position.y + variables.tileLength / 8,
      }
    }
  }

  /**
   * Вычисляет вектор направления преследования призрака к пакману.
   * @param ghost Объект призрака.
   * @param pathway Объект пути движения призрака.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param variables Объект с переменными и состояниями игры.
   * @param isOrangeFarFromPacman Функция для проверки, находится ли оранжевый призрак достаточно далеко от пакмана (по умолчанию `GhostMovement.isOrangeFarFromPacman`).
   * @param findRedOrangeAimPath Функция для вычисления вектора направления преследования к пакману для красного и оранжевого призрака (по умолчанию `GhostMovement.findRedOrangeAimPath`).
   * @param findPinkAimPath Функция для вычисления вектора направления преследования к пакману для розового призрака (по умолчанию `GhostMovement.findPinkAimPath`).
   * @param findCyanAimPath Функция для вычисления вектора направления преследования к пакману для голубого призрака (по умолчанию `GhostMovement.findCyanAimPath`).
   * @param findOrangeScatterPath Функция для вычисления вектора направления разбегания для оранжевого призрака (по умолчанию `GhostMovement.findOrangeScatterPath`).
   */
  static chase(
    ghost: IGhost,
    pathway: IPathway,
    assets: IGameAssets,
    variables: IVariables,
    isOrangeFarFromPacman = GhostMovement.isOrangeFarFromPacman,
    findRedOrangeAimPath = GhostMovement.findRedOrangeAimPath,
    findPinkAimPath = GhostMovement.findPinkAimPath,
    findCyanAimPath = GhostMovement.findCyanAimPath,
    findOrangeScatterPath = GhostMovement.findOrangeScatterPath
  ) {
    if (
      ghost.color === 'red' ||
      (ghost.color === 'orange' &&
        isOrangeFarFromPacman(ghost, assets['characters']['pacman'], variables))
    )
      return findRedOrangeAimPath(assets['characters']['pacman'], pathway)
    else if (ghost.color === 'pink')
      return findPinkAimPath(assets['characters']['pacman'], pathway, variables)
    else if (ghost.color === 'cyan')
      return findCyanAimPath(assets, variables, pathway)
    else if (ghost.color === 'orange') return findOrangeScatterPath(pathway)
  }

  /**
   * Проверяет, находится ли оранжевый призрак достаточно далеко от пакмана.
   * @param orangeGhost Объект оранжевого призрака.
   * @param pacman Объект пакмана.
   * @param variables Объект с переменными и состояниями игры.
   * @returns `true`, если оранжевый призрак находится достаточно далеко от пакмана, в противном случае `false`.
   */
  static isOrangeFarFromPacman(
    orangeGhost: IGhost,
    pacman: IPacman,
    variables: IVariables
  ) {
    const x = pacman.position.x - orangeGhost.position.x
    const y = pacman.position.y - orangeGhost.position.y
    const distance = Math.hypot(x, y)
    return distance > variables.tileLength * 8
  }

  /**
   * Вычисляет вектор направления преследования к пакману для красного и оранжевого призрака.
   * @param pacman Объект пакмана.
   * @param pathway Объект пути движения призрака.
   * @returns Объект с вектором направления преследования к пакману.
   */
  static findRedOrangeAimPath(
    pacman: IPacman,
    pathway: IPathway
  ): ICoordinates {
    return {
      x: pacman.position.x - pathway.position!.x,
      y: pacman.position.y - pathway.position!.y,
    }
  }

  /**
   * Вычисляет вектор направления преследования к пакману для розового призрака.
   * @param pacman Объект пакмана.
   * @param pathway Объект пути движения призрака.
   * @param variables Объект с переменными и состояниями игры.
   * @returns Объект с вектором направления преследования к пакману.
   */
  static findPinkAimPath(
    pacman: IPacman,
    pathway: IPathway,
    variables: IVariables
  ): ICoordinates {
    let x = pacman.position.x - pathway.position!.x
    let y = pacman.position.y - pathway.position!.y

    if (pacman.rotation === 0) {
      x += variables.tileLength * 4
    } else if (pacman.rotation === Math.PI / 2) {
      y += variables.tileLength * 4
    } else if (pacman.rotation === Math.PI) {
      x -= variables.tileLength * 4
    } else if (pacman.rotation === (Math.PI * 3) / 2) {
      y -= variables.tileLength * 4
    }

    return {
      x: x,
      y: y,
    }
  }

  /**
   * Вычисляет вектор направления преследования к пакману для голубого призрака.
   * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
   * @param variables Объект с переменными и состояниями игры.
   * @param pathway Объект пути движения призрака.
   * @returns Объект с вектором направления преследования к пакману.
   */
  static findCyanAimPath(
    assets: IGameAssets,
    variables: IVariables,
    pathway: IPathway
  ): ICoordinates {
    const pacman = assets['characters']['pacman']
    const redGhost = assets['characters']['ghosts']['red']

    let x = pacman.position.x * 2 - redGhost.position.x
    let y = pacman.position.y * 2 - redGhost.position.y

    if (pacman.rotation === 0) {
      x += variables.tileLength * 2
    } else if (pacman.rotation === Math.PI / 2) {
      y += variables.tileLength * 2
    } else if (pacman.rotation === Math.PI) {
      x -= variables.tileLength * 2
    } else if (pacman.rotation === (Math.PI * 3) / 2) {
      y -= variables.tileLength * 2
    }
    return {
      x: x - pathway.position!.x,
      y: y - pathway.position!.y,
    }
  }

  /**
   * Выполняет движение привидения в режиме рассеивания.
   * В зависимости от цвета привидения, метод выбирает наилучшее направление движения для рассеивания.
   * @param ghost Объект призрака.
   * @param pathway Объект пути движения призрака.
   * @param findRedScatterPath
   * @param findPinkScatterPath
   * @param findCyanScatterPath
   * @param findOrangeScatterPath
   */
  static scatter(
    ghost: IGhost,
    pathway: IPathway,
    findRedScatterPath = GhostMovement.findRedScatterPath,
    findPinkScatterPath = GhostMovement.findPinkScatterPath,
    findCyanScatterPath = GhostMovement.findCyanScatterPath,
    findOrangeScatterPath = GhostMovement.findOrangeScatterPath
  ) {
    if (ghost.color === 'red') return findRedScatterPath(pathway)
    else if (ghost.color === 'pink') return findPinkScatterPath(pathway)
    else if (ghost.color === 'cyan') return findCyanScatterPath(pathway)
    else if (ghost.color === 'orange') return findOrangeScatterPath(pathway)
  }

  /**
   * Вычисляет вектор направления разбегания для красного призрака.
   * @param pathway Объект пути движения призрака.
   * @returns Объект с вектором направления разбегания.
   */
  static findRedScatterPath(pathway: IPathway): ICoordinates {
    return {
      x: 896 - pathway.position!.x,
      y: -pathway.position!.y,
    }
  }

  /**
   * Вычисляет вектор направления разбегания для розового призрака.
   * @param pathway Объект пути движения призрака.
   * @returns Объект с вектором направления разбегания.
   */
  static findPinkScatterPath(pathway: IPathway): ICoordinates {
    return {
      x: -pathway.position!.x,
      y: -pathway.position!.y,
    }
  }
  /**
   * Вычисляет вектор направления разбегания для синего призрака.
   * @param pathway Объект пути движения призрака.
   * @returns Объект с вектором направления разбегания.
   */

  static findCyanScatterPath(pathway: IPathway): ICoordinates {
    return {
      x: 896 - pathway.position!.x,
      y: 992 - pathway.position!.y,
    }
  }

  /**
   * Вычисляет вектор направления разбегания для оранжевого призрака.
   * @param pathway Объект пути движения призрака.
   * @returns Объект с вектором направления разбегания.
   */
  static findOrangeScatterPath(pathway: IPathway): ICoordinates {
    return {
      x: -pathway.position!.x,
      y: 992 - pathway.position!.y,
    }
  }

  /**
   * Вычисляет гипотенузу треугольника по двум катетам.
   * @param vector Объект с координатами катетов.
   * @param pathway Объект пути движения призрака.
   */
  static calculateHypotenuse(vector: ICoordinates, pathway: IPathway) {
    pathway.distance = Math.hypot(vector.x, vector.y)
  }

  /**
   * Выбирает направление движения призрака в зависимости от его целевых направлений.
   * @param pathways Массив с возможными направлениями для движения призрака.
   * @param ghost Объект призрака.
   */
  static pickDirection(pathways: IPathway[], ghost: IGhost) {
    let shortest: undefined | IPathway
    for (let i = 0; i < pathways.length; i++) {
      if (
        shortest === undefined ||
        (pathways[i].distance as number) < (shortest.distance as number)
      )
        shortest = pathways[i]
    }
    if (shortest?.direction === 'up') {
      ghost.velocity.x = 0
      ghost.velocity.y = -ghost.speed
    } else if (shortest?.direction === 'left') {
      ghost.velocity.x = -ghost.speed
      ghost.velocity.y = 0
    } else if (shortest?.direction === 'right') {
      ghost.velocity.x = ghost.speed
      ghost.velocity.y = 0
    } else if (shortest?.direction === 'down') {
      ghost.velocity.x = 0
      ghost.velocity.y = ghost.speed
    }
  }

  /**
   * Очищает массив с предыдущими направлениями призрака.
   * @param ghost Объект призрака.
   */
  static emptyPrevCollisions(ghost: IGhost) {
    ghost.prevCollisions = []
  }

  /**
   * Двигает призрака случайным образом в пределах возможных направлений.
   * @param ghost Объект призрака.
   * @param collisions Массив со списком направлений, которые призрак не может выбрать из-за препятствий.
   * @param pickRandomDirection Функция для выбора случайного направления движения призрака (по умолчанию `GhostMovement.pickRandomDirection`).
   */
  static moveRandomly(
    ghost: IGhost,
    collisions: string[],
    pickRandomDirection = GhostMovement.pickRandomDirection
  ) {
    if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
    else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
    else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')
    else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')

    const pathways = ghost.prevCollisions.filter(collision => {
      return !collisions.includes(collision)
    })
    pickRandomDirection(ghost, pathways)
  }

  /**
   * Выбирает случайное направление движения призрака из возможных путей.
   * @param ghost Объект призрака.
   * @param pathways Массив с возможными направлениями для движения призрака.
   */
  static pickRandomDirection(ghost: IGhost, pathways: string[]) {
    const direction = pathways[Math.floor(Math.random() * pathways.length)]
    if (direction === 'up') {
      ghost.velocity.x = 0
      ghost.velocity.y = -ghost.speed
    } else if (direction === 'down') {
      ghost.velocity.x = 0
      ghost.velocity.y = ghost.speed
    } else if (direction === 'right') {
      ghost.velocity.x = ghost.speed
      ghost.velocity.y = 0
    } else if (direction === 'left') {
      ghost.velocity.x = -ghost.speed
      ghost.velocity.y = 0
    }
  }
}
