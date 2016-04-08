/* global Audio, XMLHttpRequest */

const request = new XMLHttpRequest()

request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200) {
    const response = JSON.parse(request.responseText)

    const music = new Audio()
    music.crossOrigin = 'anonymous'
    music.src = `${response.stream_url}?client_id=78c6552c14b382e23be3bce2fc411a82`
    music.play()

    music.addEventListener('ended', () => {
      music.play()
    })

    const div = document.createElement('a')
    const divImg = '<img src="https://developers.soundcloud.com/assets/logo_white.png" class="soundcloud-img">'

    div.className = 'soundcloud'
    div.setAttribute('href', response.permalink_url)
    div.innerHTML = `${response.title} by ${response.user.username} loaded via ${divImg}.`

    document.body.appendChild(div)
  }
}

request.open('GET', `//api.soundcloud.com/resolve.json?url=https://soundcloud.com/sizzlebird/enchanted-2&client_id=78c6552c14b382e23be3bce2fc411a82`, true)
request.send()
