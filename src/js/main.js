/* global location */

import 'babel-polyfill'

import First from './experiment/1/index'
import Second from './experiment/2/index'

const experiments = [
  First,
  Second
]

const experimentsNumber = (location.hash) ? parseInt(location.hash.replace('#', ''), 10) - 1 : 0
const experimentsToggle = document.querySelectorAll('.js-experiment-toggle')

let experiment = new experiments[experimentsNumber]()

Array.from(experimentsToggle).forEach((link, index) => {
  link.addEventListener('click', () => {
    experiment.destroy()

    experiment = new experiments[index]()
  })
})
