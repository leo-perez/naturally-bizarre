/* global requestAnimationFrame */

import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'

export default class Experiment extends Experiments {
  constructor () {
    super('Attraction', '')

    this.update()
  }

  update () {
    this.stats.begin()

    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.globalAlpha = 0.75

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  dblclick () {
    super.dblclick()
  }

  mousedown () {
    super.mousedown()
  }

  mouseup () {
    super.mouseup()
  }

  resize () {
    super.resize()
  }
}
