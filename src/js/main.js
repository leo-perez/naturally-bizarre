import 'babel-polyfill'

import First from './experiment/1/index'

/**
 * The following part of code is extremely poor.
 */
const experiments = [
  First,
  First
]

let experiment = new First()
const experimentToggle = document.querySelectorAll('.js-experiment-toggle')

Array.from(experimentToggle).forEach((link, index) => {
  link.addEventListener('click', () => {
    experiment.destroy()

    experiment = new experiments[index]()
  })
})
