import Vector from '../../classes/Vector'

export default class Circle {
  constructor (x, y, radius, color) {
    this.radius = radius

    this.color = color

    this.position = new Vector(x, y)
    this.acceleration = new Vector(0, 0)
    this.velocity = new Vector(0, 0)
  }

  check () {
    if (this.position.x > window.innerWidth) {
      this.position.x = 0
    } else if (this.position.x < 0) {
      this.position.x = window.innerWidth
    }

    if (this.position.y > window.innerHeight) {
      this.position.y = 0
    } else if (this.position.y < 0) {
      this.position.y = window.innerHeight
    }
  }

  separate (circles) {
    const sum = new Vector()

    let counter = 0

    circles.forEach((circle, index) => {
      const distance = Vector.dist(this.position, circle.position)

      if (distance < 50) {
        const difference = Vector.sub(this.position, circle.position)

        difference.normalize()
        difference.div(distance)

        sum.add(difference)

        counter++
      }
    })

    if (counter > 0) {
      sum.div(counter)
      sum.normalize()

      const steer = Vector.sub(sum, this.velocity)

      steer.limit()

      this.apply(steer)
    }
  }

  apply (force) {
    this.acceleration.add(force)
  }

  update () {
    this.velocity.add(this.acceleration)
    this.velocity.limit(10)

    this.position.add(this.velocity)

    this.acceleration.mult(0)
  }

  draw (context) {
    this.check()

    context.globalCompositeOperation = 'lighter'

    context.beginPath()
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
    context.closePath()

    context.fillStyle = this.color
    context.fill()
  }
}
