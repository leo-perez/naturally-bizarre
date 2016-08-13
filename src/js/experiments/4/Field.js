import { constrain, map } from '../../lib/math'
import { noise, noiseSeed } from '../../lib/perlin'

import Cell from './Cell'
import Vector from '../../classes/Vector'

noiseSeed(Math.floor(Math.random() * 100))

export default class Field {
  constructor () {
    this.columns = Math.ceil(window.innerWidth / 25)
    this.rows = Math.ceil(window.innerHeight / 25)

    console.log(`Columns: ${this.columns} - Rows: ${this.rows}`)

    this.field = Array(this.columns).fill().map(() => [])
    this.fieldValue = Array(this.columns).fill().map(() => [])

    this.noise = 0

    this.create()
  }

  create () {
    for (let i = 0, x = 0; i < this.columns; i++) {
      for (let j = 0, y = 0; j < this.rows; j++) {
        const angle = map(noise(x, y, this.noise), 0, 1, 0, Math.PI * 2)

        this.field[i][j] = new Cell(i, j, angle)
        this.fieldValue[i][j] = new Vector(Math.cos(angle), Math.sin(angle))

        y += 0.02
      }

      x += 0.02
    }
  }

  update () {
    for (let i = 0, x = 0; i < this.columns; i++) {
      for (let j = 0, y = 0; j < this.rows; j++) {
        const angle = map(noise(x, y, this.noise), 0, 1, 0, Math.PI * 2)

        this.field[i][j].update(angle)
        this.fieldValue[i][j].set(Math.cos(angle), Math.sin(angle))

        y += 0.02
      }

      x += 0.02
    }

    this.noise += 0.01
  }

  draw (context) {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.field[i][j].draw(context)
      }
    }
  }

  lookup (position) {
    const column = Math.floor(constrain(position.x / this.resolution, 0, this.columns - 1))
    const row = Math.floor(constrain(position.y / this.resolution, 0, this.rows - 1))

    return this.fieldValue[column][row].copy()
  }
}
