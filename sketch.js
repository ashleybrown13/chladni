let center_x 
let center_y
let radius_min = 5
let radius_max = 200

function preload(){
  sound = loadSound('démarche.mp3');

}

function setup(){
  let cnv = createCanvas(600, 600);
  background(255);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(.8, 128);
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

	beginShape()
	for (let i=0; i<spectrum.length; i++) {

		let radius = map(spectrum[i], 0, 500, radius_min, radius_max)
		let degree = map(i, 0, spectrum.length, 0, 360)

		x = radius * cos(radians(degree));
		y = radius * sin(radians(degree));
		curveVertex(x + center_x, y + center_y)
		if (i==0) {
			curveVertex(x + center_x, y + center_y)
		}
	}

	let radius = map(spectrum[0], 0, 100, radius_min, radius_max)
	let degree = map(0, 0, spectrum.length, 0, 360)
	x = radius * cos(radians(degree));
	y = radius * sin(radians(degree));	
	curveVertex(x + center_x, y + center_y)
	curveVertex(x + center_x, y + center_y)

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