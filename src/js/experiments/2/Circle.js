'use strict'

import { lerp } from '../../lib/lerp'
import { randomArbitrary } from '../../lib/random'

export default class Circle {
  constructor (radius, stroke, x, y) {
    this.radius = radius

    this.fill = '#000'
    this.stroke = stroke

    this.x = x
    this.y = y

    this.opacity = 0

    this.lerp = randomArbitrary(0.05, 0.1)
  }

  move (x, y) {
    if (this.opacity < 1) {
      this.opacity = this.opacity + 0.1
    }

    this.radius = lerp(this.radius, 0, this.lerp)

    this.x = lerp(this.x, x, this.lerp)
    this.y = lerp(this.y, y, this.lerp)

    this.alive = this.radius > 0.01
  }

  draw (context) {
    context.lineWidth = 2
    context.fillStyle = this.fill
    context.strokeStyle = this.stroke

    context.globalAlpha = this.opacity
    context.globalCompositeOperation = 'lighter'

    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.closePath()

    context.fill()
    context.stroke()

    context.globalAlpha = 1
    context.globalCompositeOperation = 'source-over'
  }
}
