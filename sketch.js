let center_x 
let center_y
let radius_min = 5
let radius_max = 200

function preload(){
  sound = loadSound('démarche.mp3');

}

function setup(){
  let cnv = createCanvas(1200, 1200);
  background(255);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(0, 128);
  sound.amp(0.2);
  strokeWeight(1)
  frameRate(1)

  center_x = width/2
  center_y = height/2
}

function draw(){

  if (sound.isPlaying()) {
	let spectrum = fft.analyze();
	print(spectrum)
	strokeWeight(1)
	stroke(0, 0, 0, 60)
	noFill()

	radius_min += 3
	radius_max += 3
	let radius
	let degree
	let x
	let y
	let min_spectrum = 30
	let max_spectrum = 70

	beginShape()
	radius = map(spectrum[max_spectrum], 0, 500, radius_min, radius_max)
	degree = map(max_spectrum, min_spectrum, max_spectrum + 1, 0, 360)
	x = radius * cos(radians(degree)) + center_x
	y = radius * sin(radians(degree)) + center_y
	curveVertex(x, y)

	for (let i=min_spectrum; i<=max_spectrum; i++) {

		radius = map(spectrum[i], 0, 500, radius_min, radius_max)
		degree = map(i, min_spectrum, max_spectrum + 1 , 0, 360)

		x = radius * cos(radians(degree)) + center_x
		y = radius * sin(radians(degree)) + center_y
		curveVertex(x, y)
		
	}

	radius = map(spectrum[min_spectrum], 0, 500, radius_min, radius_max)
	degree = map(min_spectrum, min_spectrum, max_spectrum + 1, 0, 360)
	x = radius * cos(radians(degree)) + center_x
	y = radius * sin(radians(degree)) + center_y
	curveVertex(x, y)

	radius = map(spectrum[min_spectrum + 1], 0, 500, radius_min, radius_max)
	degree = map(min_spectrum + 1, min_spectrum, max_spectrum + 1, 0, 360)
	x = radius * cos(radians(degree)) + center_x
	y = radius * sin(radians(degree)) + center_y
	curveVertex(x, y)

	endShape()
	

}

}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function mouseClicked() {
	print(int(mouseX), int(mouseY))

}