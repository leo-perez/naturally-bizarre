/* global requestAnimationFrame */

const TITLE = 'Atom'
const DESCRIPTION = 'Orbit of 500 circles using vectors of velocity and acceleration to define their position.'
const COLORS = [
  ['#0AD7D7', '#232832', '#FF2D64', '#E6E6E6'],
  ['#FFDC00', '#F5508C', '#9F19A4', '#462D46'],
  ['#FA5555', '#F5FA78', '#8CEB8C', '#2D7D91'],
  ['#004182', '#0E8CF0', '#FAFFA4', '#FF4B69'],
  ['#3C1E69', '#5A3C87', '#E65A87', '#FAA']
]

import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Mover from './Mover'

export default class Experiment extends Experiments {
  constructor () {
    super(TITLE, DESCRIPTION)

    this.movers = null
    this.moversLength = 500
    this.moversColor = null
    this.moversMultiply = 0.5

    this.createMovers()
    this.update()
  }

  createMover (index) {
    const radius = randomInt(1, 5)
    const color = COLORS[this.moversColor][randomInt(0, COLORS.length - 1)]

    this.movers.push(new Mover(radius, color))
  }

  createMovers () {
    this.movers = []
    this.moversColor = randomInt(0, COLORS.length - 1)

    for (let i = 0, length = this.moversLength; i <= length; i++) {
      this.createMover(i)
    }
  }

  update () {
    this.stats.begin()

    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

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
