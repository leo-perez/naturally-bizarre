/* global requestAnimationFrame */

const TITLE = 'Gravity'
const DESCRIPTION = 'It\'s still under construction.'
const COLORS = [
  ['#0AD7D7', '#232832', '#FF2D64', '#E6E6E6'],
  ['#FFDC00', '#F5508C', '#9F19A4', '#462D46'],
  ['#FA5555', '#F5FA78', '#8CEB8C', '#2D7D91'],
  ['#004182', '#0E8CF0', '#FAFFA4', '#FF4B69']
]

import { randomInt, randomArbitrary } from '../lib/random'

import Experiments from '../classes/Experiments'
import Vector from '../classes/Vector'
import Mover from './Mover'

export default class Experiment extends Experiments {
  constructor () {
    super(TITLE, DESCRIPTION)

    this.movers = null
    this.moversLength = 500
    this.moversColor = null

    this.createMovers()
    this.update()
  }

  createMover (index) {
    const radius = randomInt(4, 22)
    const color = COLORS[this.moversColor][randomInt(0, COLORS.length - 1)]
    const location = new Vector(randomInt(0, window.innerWidth), randomInt(0, window.innerHeight))
    const velocity = new Vector(randomArbitrary(-0.25, 0.25), randomArbitrary(-0.25, 0.25))

    this.movers.push(new Mover(radius, color, location, velocity))
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
      mover.draw(this.context)
    })

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  click () {
    super.click()

    this.createMovers()
  }

  resize () {
    super.resize()

    this.createMovers()
  }
}
