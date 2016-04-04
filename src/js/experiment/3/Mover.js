export default class Mover {
  constructor (radius, stroke, location, velocity) {
    this.radius = radius

    this.stroke = stroke

    this.location = location

    this.velocity = velocity
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

  update () {
    this.location.add(this.velocity)
  }

  draw (context) {
    this.check()
    this.update()

    context.globalCompositeOperation = 'lighter'

    context.lineWidth = 3
    context.strokeStyle = this.stroke

    context.beginPath()
    context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI)
    context.closePath()

    context.stroke()

    context.globalCompositeOperation = 'source-over'
  }
}
