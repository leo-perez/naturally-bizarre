import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Field from './Field'
import Vehicle from './Vehicle'

export default class Flow extends Experiments {
  constructor () {
    super('Flow')

    this.field = null

    this.createField()

    this.context.strokeStyle = '#fff'
    this.context.fillStyle = '#000'

    this.update()
  }

  createField () {
    this.field = new Field()
    this.field.draw(this.context)
  }

  update () {
    super.update()

    this.stats.begin()

    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.field.update()
    this.field.draw(this.context)

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
