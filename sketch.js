let leaves = [];
let leafTypes = [];
let slider;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 100, 50); // Crea una barra deslizante con valores de 0 a 100
  for (let i = 0; i < 100; i++) {
    leaves.push(new Leaf());
    leafTypes.push(floor(random(3))); // Genera un tipo de hoja aleatorio (0, 1, o 2)
  }
}

function draw() {
  background(200);

  for (let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].fall();
    leaves[i].display(leafTypes[i]);
    
    // Elimina las hojas cuando salen de la pantalla
    if (leaves[i].y > height) {
      leaves.splice(i, 1);
      leafTypes.splice(i, 1);
    }
  }

  // Agrega nuevas hojas según el valor de la barra deslizante
  let numNewLeaves = slider.value() - leaves.length;
  for (let i = 0; i < numNewLeaves; i++) {
    leaves.push(new Leaf());
    leafTypes.push(floor(random(3)));
  }
}

class Leaf {
  constructor() {
    this.x = random(width);
    this.y = random(-200, -100);
    this.speed = random(2, 4);
    this.size = random(10, 20);
  }

  fall() {
    this.y += this.speed;
  }

  display(type) {
    noStroke();
    fill(0, 255, 0); // Todas las hojas son verdes
    
    // Crea una forma personalizada de hoja
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size / 4, this.y + this.size / 2, this.x, this.y + this.size * 1.5);
    bezierVertex(this.x + this.size / 4, this.y + this.size / 2, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
    endShape(CLOSE);
  }
}

