import 'babel-polyfill'

import Root from './experiments/1/index'
import Neon from './experiments/2/index'
import Atom from './experiments/3/index'
import Flow from './experiments/4/index'

const experiments = {
  'root': Root,
  'neon': Neon,
  'atom': Atom,
  'flow': Flow
}

const experimentsNames = Object.getOwnPropertyNames(experiments)
const experimentsSelected = (location.hash) ? location.hash.replace('#', '') : experimentsNames[0]
const experimentsLinks = document.querySelectorAll('.js-experiment-toggle')

let experimentsActive

if (experiments[experimentsSelected]) {
  experimentsActive = new experiments[experimentsSelected]()
} else {
  experimentsActive = new experiments['root']()
}

Array.from(experimentsLinks).forEach((link, index) => {
  link.addEventListener('click', () => {
    experimentsActive.destroy()
    experimentsActive = null
    experimentsActive = new experiments[experimentsNames[index]]()
  })
})
