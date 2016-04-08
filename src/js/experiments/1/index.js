/* global requestAnimationFrame */

const TITLE = 'Root'
const DESCRIPTION = 'Traditional random walk made by 2,500 walkers spread in the screen.'
const COLORS = [
  ['rgba(10, 215, 215, 0.2)', 'rgba(35, 40, 50, 0.2)', 'rgba(255, 45, 100, 0.2)', 'rgba(230, 230, 230, 0.2)'],
  ['rgba(255, 220, 0, 0.2)', 'rgba(245, 80, 140, 0.2)', 'rgba(160, 25, 165, 0.2)', 'rgba(70, 45, 70, 0.2)'],
  ['rgba(250, 85, 85, 0.2)', 'rgba(245, 250, 120, 0.2)', 'rgba(140, 235, 140, 0.2)', 'rgba(45, 125, 145, 0.2)'],
  ['rgba(0, 65, 130, 0.2)', 'rgba(15, 140, 240, 0.2)', 'rgba(250, 255, 165, 0.2)', 'rgba(255, 75, 105, 0.2)'],
  ['rgba(60, 30, 105, 0.2)', 'rgba(90, 60, 135, 0.2)', 'rgba(230, 90, 135, 0.2)', 'rgba(255, 170, 170, 0.2)']
]

import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Walker from './Walker'

export default class Experiment extends Experiments {
  constructor () {
    super(TITLE, DESCRIPTION)

    this.walkers = null
    this.walkersLength = 2500
    this.walkersColor = null

    this.createWalkers()
    this.update()
  }

  createWalker () {
    const color = COLORS[this.walkersColor][randomInt(0, 3)]
    const x = randomInt(0, window.innerWidth)
    const y = randomInt(0, window.innerHeight)

    this.walkers.push(new Walker(color, x, y))
  }

  createWalkers () {
    this.walkers = []
    this.walkersColor = randomInt(0, COLORS.length - 1)

    for (let i = 0, length = this.walkersLength; i <= length; i++) {
      this.createWalker()
    }
  }

  update () {
    this.stats.begin()

    this.walkers.forEach(walker => walker.draw(this.context))

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  dblclick () {
    super.dblclick()

    this.createWalkers()
  }

  resize () {
    super.resize()

    this.createWalkers()
  }
}
