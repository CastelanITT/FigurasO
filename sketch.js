class GameObject {
  constructor(x, y) {
    this.position = createVector(x, y);
  }

  draw() {
    // APLICO HERENCIA AQUI
  }
}

class FallingObject extends GameObject {
  constructor(x, y, speed) {
    super(x, y);
    this.speed = speed;
  }

  update() {
    this.position.y += this.speed;
  }

  draw() {
    fill(200, 0, 0);
    circle(this.position.x, this.position.y, 50);
  }
}

class PlayerObject extends GameObject {
  move(x, y) {
    this.position.x += x;
    this.position.y += y;
  }

  draw() {
    fill(0, 125, 0);
    rect(this.position.x - 25, this.position.y - 25, 50, 50);
  }
}

//mis variables
let player;
let fallingObjects = [];
let score = 0; 


function setup() {
  createCanvas(800, 700);
  player = new PlayerObject(width / 2, height - 50);
  for (let i = 0; i < 10; i++) {
    fallingObjects.push(new FallingObject(random(width), 0, random(3, 8)));
  }
}

function draw() {
  background(50);
  

  // objetos que caen
  
fallingObjects.forEach((obj, index) => {
  obj.update();
  obj.draw();

  // reinicia el objeto si sale del marco
  if (obj.position.y > height + 50) {
    fallingObjects.splice(index, 1);
    fallingObjects.push(new FallingObject(random(width), 0, random(3, 8)));
  }

  // si el jugador se come un objeto que cae, eliminar el objeto y sumar 10 puntos
  
  if (dist(obj.position.x, obj.position.y, player.position.x, player.position.y) < 50) {
    fallingObjects.splice(index, 1);
    score += 10;
  }
});

// si se llega a la puntuacion maxima, mostrar un mensaje de subes de nivel y sean mas rapidos
  
if (score >= 50) {
  textSize(32);
  fill(255);
  textAlign(CENTER);
  text("¡Subes de nivel!", width/2, height/2);
  fallingObjects.forEach(obj => {
    obj.size = 30;
    obj.speed = random(5, 10);
  });
}

  //El cuadrito verde
  player.move(keyIsDown(LEFT_ARROW) ? -5 : keyIsDown(RIGHT_ARROW) ? 5 : 0, 0);
  player.draw();
  
  // mostrar la puntuacion
  textSize(32);
  fill(0);
  text("Score: " + score, 10, 50);
}