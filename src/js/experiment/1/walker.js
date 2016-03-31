import { randomInt } from '../lib/random'

export default class Walker {
  constructor (color, x, y) {
    this.color = color
    this.x = x
    this.y = y
  }

  step () {
    const random = randomInt(0, 3)

    if (random === 0) {
      this.x++
    } else if (random === 1) {
      this.x--
    } else if (random === 2) {
      this.y++
    } else {
      this.y--
    }
  }

  draw (context) {
    context.beginPath()
    context.moveTo(this.x, this.y)

    context.strokeStyle = this.color
    context.lineWidth = 1

    this.step()

    context.lineTo(this.x, this.y)
    context.stroke()
  }
}
