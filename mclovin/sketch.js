let w = 900;
let h = 500;
let people = [];
var numPeople, pmatch, pmale;
var peopleslider, matchslider, genderslider;

$("#simulate-button")
    .on("click", function(){
        startSketch();
        loop();
    })


function setup() {
  var canvas = createCanvas(w, h);
  canvas.parent('simulation-chart');
  noStroke();
  background(50, 90, 100);
  frameRate(80);
  textAlign(CENTER);
  textSize(16);
  peopleslider = createSlider(1, 50, 25).parent('simulation-chart');
  peopleslider.position(20, height + 70);
  peopleslider.style('width', '200px');
  matchslider = createSlider(0, 100, 50).parent('simulation-chart');
  matchslider.position(width/2 - 120, height + 70);
  matchslider.style('width', '200px');
  genderslider = createSlider(0, 100, 50).parent('simulation-chart');
  genderslider.position(width - 280, height + 70);
  genderslider.style('width', '200px');
  noLoop();
}

function draw() {
    background(50, 90, 100); 
    for (let i = 0; i < people.length; i++) {
      detectMatch(i);
      people[i].move();
      people[i].display();
  }
}

class Person {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(w/30, w/20);
    this.xspeed = random(-w/250,w/250);
    this.yspeed = random(-w/250,w/250);
    this.single = true;
    let rnd = random(0,1);
    if (rnd < pmale){
      this.c = 'skyblue';
    } else {
      this.c = 'pink';
    }
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  display() {
    if (this.single){ 
      if (this.x > width - this.diameter/2 || this.x < this.diameter/2) {
        this.xspeed = -this.xspeed;
      }
      if (this.y > height - this.diameter/2 || this.y < this.diameter/2) {
        this.yspeed = -this.yspeed;
      }
      fill(this.c);
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  }
}

function detectMatch(count) {
  let j = count;
  for (let i = 0; i < numPeople; i++) {
    if (i != j && dist(people[i].x, people[i].y, people[j].x, people[j].y) < people[i].diameter/2 + people[j].diameter/2 && people[i].single && people[j].single){
      people[i].xspeed = -people[i].xspeed;
      people[i].yspeed = -people[i].yspeed;
      if (people[i].c != people[j].c){
        let rnd = random(0,1);
        if (rnd < pmatch){
          people[i].single = false;
          people[j].single = false;
        }
      }
    }
  }  
}

function startSketch() {
  background(50, 90, 100); 
  numPeople = peopleslider.value();
  pmatch = matchslider.value()/100;
  pmale = genderslider.value()/100;
  people = [];
 
  people.push(new Person());
  
  while (people.length < numPeople) {
    let overlapping = false;
    let newguy = new Person();
    for (let k = 0; k < people.length; k++) {
      let other = people[k];
      let d = dist(other.x, other.y, newguy.x, newguy.y);
      if (d < other.diameter/2 + newguy.diameter/2 || 
          newguy.x > width - newguy.diameter/2 || 
          newguy.x < newguy.diameter/2  ||
          newguy.y > height - newguy.diameter/2 || 
          newguy.y < newguy.diameter/2) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      people.push(newguy);
    }
  }  
}

