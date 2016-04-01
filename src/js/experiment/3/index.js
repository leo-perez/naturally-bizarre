/* global requestAnimationFrame */

const TITLE = 'Noise'
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

import SimplexNoise from 'simplex-noise'
import Experiments from '../classes/Experiments'

export default class Experiment extends Experiments {
  constructor () {
    super(TITLE, DESCRIPTION)

    this.update()
  }

  update () {
    this.stats.begin()

    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  click () {
    super.click()
  }

  resize () {
    super.resize()
  }
}
