/* global requestAnimationFrame */

const TITLE = 'Untitled'
const DESCRIPTION = 'Lorem ipsum dolot sit amet.'
const COLORS = [
  ['#0AD7D7', '#232832', '#FF2D64', '#E6E6E6'],
  ['#FFDC00', '#F5508C', '#9F19A4', '#462D46'],
  ['#FA5555', '#F5FA78', '#8CEB8C', '#2D7D91'],
  ['#004182', '#0E8CF0', '#FAFFA4', '#FF4B69'],
  ['#3C1E69', '#5A3C87', '#E65A87', '#FAA']
]

import { randomArbitrary, randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
// import Mover from './Mover'
import Vector from '../../classes/Vector'

export default class Experiment extends Experiments {
  constructor () {
    super(TITLE, DESCRIPTION)

    this.movers = null
    this.moversLength = 100
    this.moversColor = null

    this.wind = new Vector(0.1, 0)
    this.gravity = new Vector(0, 0.1)

    this.createMovers()
    this.update()
  }

  createMover (index) {
    const radius = randomArbitrary(1, 5)
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

    this.context.fillStyle = 'rgba(0, 0, 0, 0.25)'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.movers.forEach((mover, index) => {
      mover.apply(this.wind)
      mover.apply(this.gravity)
      mover.update()
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
  }

  mousemove (e) {
    super.mousemove(e)

    this.wind.x = (((window.innerWidth / 2) - this.mouse.x) / window.innerWidth) / 10
    this.gravity.y = (((window.innerHeight / 2) - this.mouse.y) / window.innerHeight) / 10
  }

  mouseup () {
    super.mouseup()
  }

  resize () {
    super.resize()

    this.createMovers()
  }
}
