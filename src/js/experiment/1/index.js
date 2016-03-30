/* global requestAnimationFrame */

import randomInt from '../lib/randomInt'

import Walker from './walker'
import Experiments from '../experiments'

const COLORS = [
  ['rgba(10, 215, 215, .2)', 'rgba(35, 40, 50, .2)', 'rgba(255, 45, 100, .2)', 'rgba(230, 230, 230, .2)'],
  ['rgba(255, 220, 0, .2)', 'rgba(245, 80, 140, .2)', 'rgba(160, 25, 165, .2)', 'rgba(70, 45, 70, .2)'],
  ['rgba(250, 85, 85, .2)', 'rgba(245, 250, 120, .2)', 'rgba(140, 235, 140, .2)', 'rgba(45, 125, 145, .2)'],
  ['rgba(0, 65, 130, .2)', 'rgba(15, 140, 240, .2)', 'rgba(250, 255, 165, .2)', 'rgba(255, 75, 105, .2)'],
  ['rgba(60, 30, 105, .2)', 'rgba(90, 60, 135, .2)', 'rgba(230, 90, 135, .2)', 'rgba(255, 170, 170, .2)']
]

export default class Experiment extends Experiments {
  constructor () {
    super()

    this.walkers = null
    this.walkersLength = 2500

    this.createWalkers()
    this.update()

    window.addEventListener('click', () => this.click())
    window.addEventListener('resize', () => this.resize())
  }

  createWalkers () {
    this.walkers = []

    const colorSet = randomInt(0, 4)

    for (let i = 0, length = this.walkersLength; i <= length; i++) {
      const walker = new Walker(
        COLORS[colorSet][randomInt(0, 3)],
        randomInt(0, window.innerWidth),
        randomInt(0, window.innerHeight)
      )

      this.walkers.push(walker)
    }
  }

  update () {
    this.stats.begin()

    this.walkers.forEach(walker => walker.draw(this.context))

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  click () {
    super.clear()

    this.createWalkers()
  }

  resize () {
    super.resize()

    this.createWalkers()
  }
}
