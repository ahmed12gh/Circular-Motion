
var Rslider = document.getElementById("R-slider")
var velSlider = document.getElementById("vel-slider")

var irr_check = document.getElementById("irregular")
var At_s = document.getElementById("at-slider")

let r = 150
let safe_r = r + 80
let A_c ;
let A_t ; 
let tri = 15 ; 
let irregular_acc  = false; 

class car { 
  constructor(x,y){
    this.loc = createVector(x,y);
    this.vel = createVector(0,4);
    this.acc = createVector(0,1);


    this.maxspeed = 4; 
    this.maxforce = 0.1; 
    A_c = this.vel.magSq() / r
  
  }

  update( ){
    if (irregular_acc == false){
      this.acc.setHeading(this.vel.heading() + HALF_PI );
      this.acc.setMag(this.vel.magSq() / r);  
    }
    else{ 
      let mag  = Math.sqrt(Math.pow(A_c , 2)  + Math.pow(A_t,2))  ;
      let theta = Math.atan2(A_c , A_t)
      
      this.acc.setMag(mag)
      this.acc.setHeading(this.vel.heading()  + theta);
    }
    
    
    this.edge()
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.loc.add(this.vel);
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
    line(0,0,this.acc.x * 300 , this.acc.y * 300);
    stroke(10,30,160,160) 
    line(0,0,this.vel.x * 30 , this.vel.y * 30);
    
    rotate(theta);
    fill(10,80,140,200);
    noStroke()
    triangle(0,-tri*2,-tri,tri*2,tri,tri*2);
    resetMatrix();
  
    
  }

  edge(){ 
    if(dist(this.loc.x , this.loc.y , 0 ,0 ) > safe_r){
      var desired  = p5.Vector.sub(createVector(0,0) , this.loc)
      desired.normalize().mult(0.2)
      this.acc.add(desired)
    }
  }

}

var CAR ;
let n  ; 
function setup() {
  // put setup code here
  createCanvas(600,600);
  r= int(r);
  n = 0
  A_t = float(At_s.value) / 20
  CAR = new car(r,0);
}


function draw() {
  // put drawing code here

  background(250);
  translate(width/2 , height/2);
  strokeWeight(5);
  for( let i = 0.0 ; i <= TWO_PI ; i+=20/r){
    stroke(125);
    var y = sin(i) * safe_r ; 
    var x = cos(i) * safe_r; 
    point(x,y );

    stroke(80,120,240,100)
    var y = sin(i) * r ; 
    var x = cos(i) * r; 
    point(x,y );
  }


  CAR.update();

  strokeWeight(1)
  stroke(125);
  line(0,0,CAR.loc.x , CAR.loc.y)
  CAR.draw();
  
}

Rslider.onchange = ()=>{
    r= int(Rslider.value);
    safe_r = r + 80 
    CAR.loc = createVector(r,0);
    CAR.vel = createVector(0,4);
}

velSlider.onchange = ()=>{
  let vel = int(velSlider.value); 
  CAR.loc = createVector(r,0);
  CAR.vel = createVector(0,vel);
  CAR.maxspeed = vel ;
}



At_s.onchange = ()=>{
  A_t = float(At_s.value) /20
}

irr_check.onchange = ()=>{
  irregular_acc = !irregular_acc
  CAR.loc = createVector(r,0);
  CAR.vel = createVector(0,4);
}