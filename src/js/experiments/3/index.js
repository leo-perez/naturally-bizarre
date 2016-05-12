/* global requestAnimationFrame */

const TITLE = 'Atom'
const DESCRIPTION = 'Orbit of 1,000 circles using vectors of velocity and acceleration to define their position.'

import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Mover from './Mover'

export default class Experiment extends Experiments {
  constructor () {
    super(TITLE, DESCRIPTION)

    this.movers = null
    this.moversLength = 1000
    this.moversColor = null
    this.moversMultiply = 0.75

    this.createMovers()
    this.update()
  }

  createMover (index) {
    const radius = randomInt(1, 5)
    const color = this.colors[this.moversColor][randomInt(0, this.colors.length - 1)]

    this.movers.push(new Mover(radius, color))
  }

  createMovers () {
    this.movers = []
    this.moversColor = randomInt(0, this.colors.length - 1)

    for (let i = 0, length = this.moversLength; i <= length; i++) {
      this.createMover(i)
    }
  }

  update () {
    this.stats.begin()

    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.globalAlpha = 0.75

    this.movers.forEach((mover, index) => {
      mover.update(this.mouse, this.moversMultiply)
      mover.draw(this.context)
    })

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  dblclick () {
    super.dblclick()

    this.createMovers()
  }

  mousedown () {
    super.mousedown()

    this.moversMultiply *= -1
  }

  mouseup () {
    super.mouseup()

    this.moversMultiply *= -1
  }

  resize () {
    super.resize()

    this.createMovers()
  }
}
