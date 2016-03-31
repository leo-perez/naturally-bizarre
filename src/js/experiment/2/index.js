/* global requestAnimationFrame */

const TITLE = 'Normal Distribution'
const DESCRIPTION = 'Spray based in the mouse position and normal distribution.'

import { randomNormalized } from '../lib/random'

import Experiments from '../classes/Experiments'
import Circle from './Circle.js'

export default class Experiment extends Experiments {
  constructor () {
    super(TITLE, DESCRIPTION)

    this.circles = null
    this.circlesLength = 500

    this.clicked = false

    this.x = window.innerWidth / 2
    this.y = window.innerHeight / 2

    this.createCircles()
    this.update()

    this.wrapper.addEventListener('mousemove', (e) => this.mousemove(e))
  }

  createCircles () {
    this.circles = []

    for (let i = 0, length = this.circlesLength; i <= length; i++) {
      const circle = new Circle(
        5 + Math.abs(randomNormalized() * 5),
        '#FFF',
        '#FFF',
        this.x,
        this.y
      )

      this.circles.push(circle)
    }
  }

  update () {
    this.stats.begin()

    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.circles.forEach((circle) => {
      circle.move(this.x + circle.spreadX, this.y + circle.spreadY)
      circle.draw(this.context)
    })

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  mousemove (e) {
    this.x = e.pageX
    this.y = e.pageY
  }

  click () {
    super.click()

    this.clicked = !this.clicked
  }

  resize () {
    super.resize()
  }
}
