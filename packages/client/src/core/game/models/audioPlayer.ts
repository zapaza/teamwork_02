export default class AudioPlayer {
  public ghostSiren: HTMLAudioElement
  public ghostScared: HTMLAudioElement
  public ghostRetreating: HTMLAudioElement
  public pacmanDeath: HTMLAudioElement
  public levelUp: HTMLAudioElement
  public eating: HTMLAudioElement

  constructor() {
    this.ghostSiren = new Audio('./audio/pacman_chomp.wav')
    this.ghostSiren.loop = true
    this.ghostSiren.volume = 0.1

    this.ghostScared = new Audio('./audio/pacman_extrapac.wav')
    this.ghostScared.loop = true
    this.ghostScared.volume = 0.08

    this.ghostRetreating = new Audio('./audio/pacman_eatghost.wav')
    this.ghostRetreating.loop = true
    this.ghostRetreating.volume = 0.1

    this.pacmanDeath = new Audio('./audio/pacman_death.wav')
    this.pacmanDeath.volume = 0.3

    this.levelUp = new Audio('./audio/pacman_intermission.wav')
    this.levelUp.volume = 0.2

    this.eating = new Audio('./audio/pacman_eatfruit.wav')
    this.eating.volume = 0.1
  }

  async playEating() {
    await this.eating.play()
  }

  async playGhostSiren() {
    this.stopAllGhostAudio()
    await this.ghostSiren.play()
  }

  async playGhostScared() {
    this.stopAllGhostAudio()
    await this.ghostScared.play()
  }

  async playGhostRetreating() {
    this.stopAllGhostAudio()
    await this.ghostRetreating.play()
  }

  stopAllGhostAudio() {
    this.ghostSiren.pause()
    this.ghostScared.pause()
    this.ghostRetreating.pause()
  }

  async playPacmanDeath() {
    this.stopAll()
    await this.pacmanDeath.play()
  }

  async playLevelUp() {
    this.stopAll()
    await this.levelUp.play()
  }

  playPacmanDeathAndLevelUpIfWantTo() {
    this.playPacmanDeath()
    this.playLevelUp()
  }

  pauseAll() {
    this.stopAllGhostAudio()
    this.stopAll()
  }

  private stopAll() {
    this.pacmanDeath.pause()
    this.levelUp.pause()
    this.ghostSiren.pause()
    this.ghostScared.pause()
    this.ghostRetreating.pause()
    this.pacmanDeath.pause()
  }
}
