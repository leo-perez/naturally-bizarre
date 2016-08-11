import { constrain, map } from '../../lib/math'
import { noise, noiseSeed } from '../../lib/perlin'

import Vector from '../../classes/Vector'

export default class Field {
  constructor (context, resolution) {
    this.context = context

    this.resolution = resolution

    this.columns = Math.ceil(window.innerWidth / resolution)
    this.rows = Math.ceil(window.innerHeight / resolution)

    noiseSeed(Math.floor(Math.random() * 100))

    this.field = Array(this.columns).fill().map(() => [])

    this.update()
  }

  update () {
    for (let i = 0, x = 0; i < this.columns; i++) {
      for (let j = 0, y = 0; j < this.rows; j++) {
        const theta = map(noise(x, y), 0, 1, 0, Math.PI * 2)

        this.field[i][j] = new Vector(Math.sin(theta), Math.cos(theta))

        y += 0.1
      }

      x += 0.1
    }
  }

  vector (theta, x, y, scayl) {
    const length = theta.mag() * scayl

    this.context.strokeStyle = '#f0f'

    this.context.save()

    this.context.translate(x, y)

    this.context.rotate(theta.heading())
    this.context.moveTo(0, 0)
    this.context.lineTo(length, 0)
    this.context.stroke()

    this.context.restore()
  }

  draw () {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.vector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2)
      }
    }
  }

  lookup (position) {
    const column = Math.floor(constrain(position.x / this.resolution, 0, this.columns - 1))
    const row = Math.floor(constrain(position.y / this.resolution, 0, this.rows - 1))

    return this.field[column][row].copy()
  }
}
