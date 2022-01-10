import * as dat from 'dat.gui'

const gui = new dat.GUI()
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})


const wave = {
  y: canvas.height /2,
  length: 0.004,
  amplitude: 285,
  frequency: 0.046,
}

const strokeColor = {
  h:94,
  s:114,
  l:35
}

const background = {
  r:0,
  g:0,
  b:0,
  a:0.15
}


const waveFolder = gui.addFolder('wave')
waveFolder.add(wave, 'y', 0, canvas.height)
waveFolder.add(wave, 'length', -0.01, 0.01)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -1, 1)
waveFolder.open()

const strokeFolder = gui.addFolder('Stroke')
strokeFolder.add(strokeColor, 'h', 0, 255)
strokeFolder.add(strokeColor, 's', 0, 255)
strokeFolder.add(strokeColor, 'l', 0, 255)
strokeFolder.open()

const backgroundFolder = gui.addFolder('background')
backgroundFolder.add(background, 'r', 0, 255)
backgroundFolder.add(background, 'g', 0, 255)
backgroundFolder.add(background, 'b', 0, 255)
backgroundFolder.add(background, 'a', 0.01, 1)
backgroundFolder.open()

let increment = wave.frequency

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(${background.r}, ${background.g}, ${background.b}, ${background.a})`
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  c.beginPath()
  c.moveTo(0, canvas.height / 2)

  for (let i = 0; i < canvas.width; i++){
    c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment))
  }

c.strokeStyle = `hsl(${strokeColor.h * Math.sin(increment)}, ${strokeColor.s}%, ${strokeColor.l}%)`
c.stroke()
increment += wave.frequency 
}

animate()