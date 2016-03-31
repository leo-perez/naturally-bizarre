import { lerp } from '../lib/lerp'
import { randomNormalized } from '../lib/random'

export default class Circle {
  constructor (radius, fill, stroke, x, y) {
    this.radius = radius

    this.fill = fill
    this.stroke = stroke

    this.spreadX = (randomNormalized() * 100)
    this.spreadY = (randomNormalized() * 100)

    this.x = x + this.spreadX
    this.y = y + this.spreadY
  }

  move (x, y) {
    this.x = lerp(this.x, x, 0.1)
    this.y = lerp(this.y, y, 0.1)
  }

  draw (context) {
    context.lineWidth = 0
    context.globalAlpha = 0.1
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
