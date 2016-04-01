/* global requestAnimationFrame */

const TITLE = 'Distribution'
const DESCRIPTION = 'Normal distribution of 250 circles with linear interpolation in position and radius.'
const COLORS = ['#F38181', '#FCE38A', '#EAFFD0', '#95E1D3']

import { randomInt, randomNormalized } from '../lib/random'

import Experiments from '../classes/Experiments'
import Circle from './Circle.js'

export default class Experiment extends Experiments {
  constructor () {
    super(TITLE, DESCRIPTION)

    this.circles = null
    this.circlesLength = 250

    this.createCircles()
    this.update()
  }

  createCircle () {
    const radius = 5 + Math.abs(randomNormalized() * 5)
    const color = COLORS[randomInt(0, COLORS.length)]
    const x = this.x + (randomNormalized() * 100)
    const y = this.y + (randomNormalized() * 100)

    this.circles.push(new Circle(radius, '#000', color, x, y))
  }

  destroyCircle (index) {
    this.circles.splice(index, 1)
  }

  createCircles () {
    this.circles = []

    for (let i = 0, length = this.circlesLength; i <= length; i++) {
      this.createCircle()
    }
  }

  update () {
    this.stats.begin()

    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.circles.forEach((circle, index) => {
      circle.move(this.x, this.y)
      circle.draw(this.context)

      if (!circle.alive) {
        this.destroyCircle(index)
        this.createCircle()
      }
    })

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  click () {
    super.click()

    this.createCircles()
  }

  resize () {
    super.resize()

    this.createCircles()
  }
}
