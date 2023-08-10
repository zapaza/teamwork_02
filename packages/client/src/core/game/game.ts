import { IVariables } from './types'
import GameHooks from './gameHooks'
import { GameFactory } from './gameFactory'
import store from '../../store'
import { gameSlice } from '../../store/game/gameSlice'

const map = [
  '1------------21------------2',
  '|............||............|',
  '|.1--2.1---2.||.1---2.1--2.|',
  '|o|  |.|   |.||.|   |.|  |o|',
  '|.4--3.4---3.43.4---3.4--3.|',
  '|..........................|',
  '|.1--2.12.1------2.12.1--2.|',
  '|.4--3.||.4--21--3.||.4--3.|',
  '|......||....||....||......|',
  '4----2.|4--2 || 1--3|.1----3',
  '     |.|1--3 43 4--2|.|     ',
  '     |.||          ||.|     ',
  '     |.|| 1------2 ||.|     ',
  '-----3.43 |      | 43.4-----',
  '      .   |      |   .      ',
  '-----2.12 |      | 12.1-----',
  '     |.|| 4------3 ||.|     ',
  '     |.||          ||.|     ',
  '     |.|| 1------2 ||.|     ',
  '1----3.43 4--21--3 43.4----2',
  '|............||............|',
  '|.1--2.1---2.||.1---2.1--2.|',
  '|.4-2|.4---3.43.4---3.|1-3.|',
  '|o..||.......  .......||..o|',
  '4-2.||.12.1------2.12.||.1-3',
  '1-3.43.||.4--21--3.||.43.4-2',
  '|......||....||....||......|',
  '|.1----34--2.||.1--34----2.|',
  '|.4--------3.43.4--------3.|',
  '|..........................|',
  '4--------------------------3',
]

export const variables: IVariables = {
  tileLength: 32,
  isWindowVisible: true,
  isGamePaused: false,
  score: 0,
  lastKeyPressed: '',
  level: 1,
  player: undefined, // todo:продумать что будем тут хранить всего юзера или только часть данных
  killCount: 0,
  start: true,
  animationId: null,
  directionEventListener: null,
  visibilityEventListener: null,
  pauseEventListener: null,
  levelUpCount: 0,
  frameLifetime: 10,
  startTime: 0,
}

export const assets = GameFactory.makeAssets(map, variables)
export default function playGame(player: any) {

  variables.animationId = requestAnimationFrame(playGame)
  const board = document.querySelector<HTMLCanvasElement>('#board')
  if (board) {
    const ctx = board!.getContext('2d')
    if (ctx) {
      if (variables.start) {
        GameHooks.finishSetup(variables, player, assets, ctx)
        store.dispatch(gameSlice.actions.changeState({play:true}))

      }
      if (performance.now() - variables.startTime >= variables.frameLifetime) {
        ctx.clearRect(0, 0, board!.width, board!.height)
        GameHooks.implementPhysics(assets, ctx, variables)
        GameHooks.implementGraphics(variables, assets.characters.pacman)
        variables.startTime = performance.now()
      }
    }
  }
}
