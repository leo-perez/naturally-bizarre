import { randomInt } from '../../lib/random'

import Vector from '../../classes/Vector'

export default class Mover {
  constructor (mass, fill) {
    this.mass = mass

    this.radius = mass * 2
    this.fill = fill

    this.location = new Vector(randomInt(0, window.innerWidth), 0)
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
  }

  apply (force) {
    const v = Vector.div(force, this.mass)

    this.acceleration.add(v)
  }

  update () {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  check () {
    if (this.location.x > window.innerWidth) {
      this.location.x = window.innerWidth
      this.velocity.x *= -1
    } else if (this.location.x < 0) {
      this.location.x = 0
      this.velocity.x *= -1
    }

    if (this.location.y > window.innerHeight) {
      this.location.y = window.innerHeight
      this.velocity.y *= -1
    }
  }

  draw (context) {
    this.check()

    context.lineWidth = 3
    context.fillStyle = this.fill

    context.globalAlpha = 0.75
    context.globalCompositeOperation = 'lighter'

    context.beginPath()
    context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI)
    context.closePath()

    context.fill()

    context.globalAlpha = 1
    context.globalCompositeOperation = 'source-over'
  }
}
