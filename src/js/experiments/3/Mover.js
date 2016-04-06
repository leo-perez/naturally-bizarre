import { randomInt } from '../../lib/random'

import Vector from '../../classes/Vector'

export default class Mover {
  constructor (radius, stroke, location) {
    this.radius = radius
    this.stroke = stroke

    this.location = new Vector(randomInt(0, window.innerWidth), randomInt(0, window.innerHeight))
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
    this.direction = new Vector(0, 0)
  }

  check () {
    if (this.location.x > window.innerWidth) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = window.innerWidth
    }

    if (this.location.y > window.innerHeight) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = window.innerHeight
    }
  }

  update (mouse, multiplier) {
    this.direction = Vector.sub(mouse, this.location)
    this.direction.normalize()
    this.direction.mult(multiplier)

    this.acceleration = this.direction

    this.velocity.add(this.acceleration)
    this.velocity.limit(15)

    this.location.add(this.velocity)
  }

  draw (context) {
    this.check()

    context.globalAlpha = 0.75
    context.globalCompositeOperation = 'lighter'

    context.lineWidth = 3
    context.strokeStyle = this.stroke

    context.beginPath()
    context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI)
    context.closePath()

    context.stroke()

    context.globalAlpha = 0.1
    context.globalCompositeOperation = 'source-over'
  }
}
