/* global location */

import First from './experiments/1/index'
import Second from './experiments/2/index'
import Third from './experiments/3/index'

const experiments = [First, Second, Third]
const experimentsNumber = (location.hash) ? parseInt(location.hash.replace('#', ''), 10) - 1 : 0
const experimentsToggle = document.querySelectorAll('.js-experiment-toggle')

let experiment = new experiments[experimentsNumber]()

Array.from(experimentsToggle).forEach((link, index) => {
  link.addEventListener('click', () => {
    experiment.destroy()

    experiment = new experiments[index]()
  })
})
