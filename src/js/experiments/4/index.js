import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Field from './Field'
import Vehicle from './Vehicle'

export default class Flow extends Experiments {
  constructor () {
    super('Flow')

    this.field = null

    this.createField()

    this.update()
  }

  createField () {
    this.field = new Field(this.context, 50)
    this.field.draw()
  }

  createMover () {

  }

  createMovers () {

  }

  update () {
    super.update()

    this.stats.begin()

    // this.context.fillStyle = '#000'
    // this.context.globalAlpha = 0.5
    // this.context.globalCompositeOperation = 'source-over'
    // this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    // this.field.update()
    // this.field.draw()

    this.stats.end()
  }

  dblclick () {
    super.dblclick()
  }

  mousedown () {
    super.mousedown()
  }

  mouseup () {
    super.mouseup()
  }

  resize () {
    super.resize()
  }
}
