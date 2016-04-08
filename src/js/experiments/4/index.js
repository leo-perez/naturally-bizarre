/* global requestAnimationFrame */

const TITLE = 'Untitled'
const DESCRIPTION = 'Lorem ipsum dolot sit amet.'
const COLORS = [
  ['#0AD7D7', '#232832', '#FF2D64', '#E6E6E6'],
  ['#FFDC00', '#F5508C', '#9F19A4', '#462D46'],
  ['#FA5555', '#F5FA78', '#8CEB8C', '#2D7D91'],
  ['#004182', '#0E8CF0', '#FAFFA4', '#FF4B69'],
  ['#3C1E69', '#5A3C87', '#E65A87', '#FAA']
]

import Experiments from '../../classes/Experiments'

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

  resize () {
    super.resize()

    this.createMovers()
  }
}
