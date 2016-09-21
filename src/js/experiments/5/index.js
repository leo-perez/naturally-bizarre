import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Circle from './Circle'

export default class Flow extends Experiments {
  constructor () {
    super()

    this.circles = null
    this.circlesLength = null
    this.circlesColor = null

    this.createCircles()

    this.update()
  }

  createCircle () {
    const x = randomInt(0, window.innerWidth)
    const y = randomInt(0, window.innerHeight)
    const color = this.colors[this.circlesColor][randomInt(0, this.colors.length - 1)]

    const circle = new Circle(x, y, 1, color)

    this.circles.push(circle)
  }

  createCircles () {
    this.circles = []
    this.circlesLength = 500
    this.circlesColor = randomInt(0, this.colors.length - 1)

    for (let i = 0; i <= this.circlesLength; i++) {
      this.createCircle()
    }
  }

  update () {
    super.update()

    this.stats.begin()

    this.circles.forEach((circle, index) => {
      circle.separate(this.circles)
      circle.update()
      circle.draw(this.context)
    })

    this.context.globalAlpha = 1
    this.context.globalCompositeOperation = 'source-over'

    this.context.fillStyle = 'rgba(0, 0, 0, 0.1)'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.stats.end()
  }

  dblclick () {
    super.dblclick()

    this.createCircles()
  }

  resize () {
    super.resize()

    this.createCircles()
  }
}
