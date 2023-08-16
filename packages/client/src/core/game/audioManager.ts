import { IGameAssets } from './types'
import AudioPlayer from './models/audioPlayer'

export class AudioManager {
  static playGhostAudio(assets: IGameAssets) {
    let count = 0
    const timers = assets.timers
    const audioPlayer = assets.audioPlayer
    timers.retreatingTimers.forEach(timer => {
      if (timer.isRunning) count++
    })
    if (count > 0) {
      if (!audioPlayer.ghostRetreating.onplaying) {
        audioPlayer.playGhostRetreating()
      }
    } else if (
      timers.scaredTimer.isRunning &&
      !audioPlayer.ghostScared.onplaying
    ) {
      audioPlayer.playGhostScared()
    } else if (
      !timers.scaredTimer.isRunning &&
      !audioPlayer.ghostSiren.onplaying
    ) {
      audioPlayer.playGhostSiren()
    }
  }

  static pauseAudio(audioPlayer: AudioPlayer) {
    audioPlayer.pauseAll()
  }

  static resumeAudio(audioPlayer: AudioPlayer) {
    audioPlayer.playPacmanDeathAndLevelUpIfWantTo()
  }
}
