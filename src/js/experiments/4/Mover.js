import { randomArbitrary, randomInt } from '../../lib/random'

import Vector from '../../classes/Vector'

export default class Mover {
  constructor (stroke) {
    this.mass = randomArbitrary(1, 10)

    this.radius = randomArbitrary(1, 5)
    this.stroke = stroke

    this.location = new Vector(randomInt(0, window.innerWidth), randomInt(0, window.innerHeight))
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
    } else if (this.location.y < 0) {
      this.location.y = 0
      this.velocity.y *= -1
    }
  }

  draw (context) {
    this.check()

    context.lineWidth = 3
    context.strokeStyle = this.stroke

    context.globalAlpha = 0.75
    context.globalCompositeOperation = 'lighter'

    context.beginPath()
    context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI)
    context.closePath()

    context.stroke()

    context.globalAlpha = 1
    context.globalCompositeOperation = 'source-over'
  }
}
