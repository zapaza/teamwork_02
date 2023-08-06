export interface IVariables {
  tileLength: number
  isWindowVisible: boolean
  isGamePaused: boolean
  score: number
  lastKeyPressed: string
  level: number
  player: undefined
  killCount: number
  start: boolean
  animationId: null | number
  directionEventListener: ((event: Event) => void) | null
  visibilityEventListener: ((event: Event) => void) | null
  pauseEventListener: ((event: Event) => void) | null
  levelUpCount: number
  frameLifetime: number
  startTime: number
}

export interface ICoordinates {
  x: number
  y: number
}

export interface IGameAssets {
  characters: {
    pacman: IPacman
    ghosts: { [color: string]: IGhost }
  }
  props: {
    boundaries: IBoundary[]
    pellets: IPellet[]
    powerUps: IPowerUp[]
  }
  // audioPlayer: IAudioPlayer;
  timers: IGameTimers
  pauseTextImage: any
}

export interface IGameTimers {
  scaredTimer: IGameTimer
  cycleTimer: IGameTimer
  retreatingTimers: IGameTimer[]
}

export interface IGameTimer {
  isRunning: boolean
  duration?: number
  start(cycleTimer?: IGameTimer): void
  pause(): void
  reset(): void
  resume(): void
}

export interface IPacman {
  position: ICoordinates
  rotation: number
  radius: number
  speed: number
  isEating: boolean
  isLevellingUp: boolean
  isShrinking: boolean
  velocity: ICoordinates
  lives: number
  radians: number
  update(ctx: CanvasRenderingContext2D): void
  reset(): void
  shrink(ctx: CanvasRenderingContext2D): void
}

export interface IBoundary {
  position: ICoordinates
  width: number
  height: number
  flash(): void
  draw(ctx: CanvasRenderingContext2D): void
}

export interface IPellet {
  position: ICoordinates
  radius: number
  hasBeenEaten: boolean
  draw(ctx: CanvasRenderingContext2D): void
  changeEatenState(): void
}

export interface IPowerUp {
  position: ICoordinates
  radius: number
  hasBeenEaten: boolean
  update(ctx: CanvasRenderingContext2D): void
  changeEatenState(): void
}

export interface IGhost {
  position: ICoordinates
  color: string
  radius: number
  isScared: boolean
  isRetreating: boolean
  speed: number
  prevCollisions: string[]
  velocity: ICoordinates
  retreatingTimer: IGameTimer | null
  isChasing: boolean
  update(ctx: CanvasRenderingContext2D): void
  reset(): void
  changeRetreatingState(): void
  changeScaredState(): void
  changeChasingState(): void
}

export interface IBoundaryParams {
  position: ICoordinates
  regularImage: HTMLImageElement
  whiteImage: HTMLImageElement
}

export interface IGhostParams {
  position: ICoordinates
  velocity: ICoordinates
  color: string
}

export interface IPacmanParams {
  position: ICoordinates
  velocity: ICoordinates
}

export interface IPathway {
  direction: string
  distance?: number
  position?: ICoordinates
}
