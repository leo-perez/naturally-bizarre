import Stats from 'stats-js'

export default class Experiments {
  constructor () {
    this.stats = null

    this.wrapper = null

    this.canvas = null
    this.context = null

    this.createWrapper()
    this.createStats()
    this.createCanvas()
    this.createContext()

    document.body.appendChild(this.wrapper)
  }

  createWrapper () {
    this.wrapper = document.createElement('div')
  }

  createStats () {
    this.stats = new Stats()

    this.stats.domElement.style.display = 'none'
    this.stats.domElement.style.left = 0
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = 0
    this.stats.domElement.style.zIndex = 50

    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 68:
          this.stats.domElement.style.display = (this.stats.domElement.style.display === 'block') ? 'none' : 'block'
          break
      }
    })

    this.wrapper.appendChild(this.stats.domElement)
  }

  createCanvas () {
    this.canvas = document.createElement('canvas')

    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth

    this.wrapper.appendChild(this.canvas)
  }

  createContext () {
    this.context = this.canvas.getContext('2d')
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
  }

  clear () {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }

  resize () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  destroy () {
    this.wrapper.innerHTML = ''
    this.wrapper.parentNode.removeChild(this.wrapper)
  }
}
