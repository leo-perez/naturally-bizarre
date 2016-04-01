import { lerp } from '../lib/lerp'
import { randomArbitrary } from '../lib/random'

export default class Circle {
  constructor (radius, fill, stroke, x, y) {
    this.radius = radius

    this.fill = fill
    this.stroke = stroke

    this.x = x
    this.y = y

    this.opacity = 0

    this.lerp = randomArbitrary(0.01, 0.1)
  }

  move (x, y) {
    if (this.opacity < 1) {
      this.opacity = this.opacity + 0.05
    }

    this.radius = lerp(this.radius, 0, this.lerp)

    this.x = lerp(this.x, x, this.lerp)
    this.y = lerp(this.y, y, this.lerp)

    this.alive = this.radius > 0.01
  }

  draw (context) {
    context.lineWidth = 2
    context.globalAlpha = this.opacity
    context.fillStyle = this.fill
    context.strokeStyle = this.stroke

    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.closePath()

    context.fill()
    context.stroke()

    context.globalAlpha = 1
  }
}
