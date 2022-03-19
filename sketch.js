
let r = 250; 
let tri = 15 ; 
class car { 
  constructor(x,y){
    this.loc = createVector();
    this.vel = createVector(0,4);
    this.acc = createVector(0,1);
    this.maxspeed = 4; 
    this.maxforce = 0.1; 
    
    this.loc.x = x ; 
    this.loc.y = y ; 
  }

  update( ){
    this.acc.setHeading(this.vel.heading() +HALF_PI );
    this.acc.setMag(this.vel.magSq() / r);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.loc.add(this.vel);
  }

  seek(){
  }
  applyforce(force){
    this.acc.add(force);
  }

  draw(){
    let theta = this.vel.heading() +(HALF_PI)
 
    applyMatrix();
    translate(this.loc.x , this.loc.y);
   
    strokeWeight(2)
    stroke(140,30,10,160) 
    line(0,0,this.acc.x * 1000, this.acc.y * 1000);
    stroke(10,30,160,160) 
    line(0,0,this.vel.x * 100 , this.vel.y * 100);
    
    rotate(theta);
    fill(10,80,140,160);
    noStroke()
    triangle(0,-tri*2,-tri,tri*2,tri,tri*2);
    resetMatrix();
  
    
  }

}

var CAR ;

function setup() {
  // put setup code here
  createCanvas(600,600);
  CAR = new car(r,0);
}


function draw() {
  // put drawing code here
  background(255);
  translate(width/2 , height/2);
  for( let i = 0.0 ; i <= TWO_PI ; i+=0.1 ){
    var x = sin(i) * r ; 
    var y = cos(i) * r ; 
    strokeWeight(5);
    stroke(125);
    point(x,y );

  }
  CAR.update();
  CAR.draw();

  
}