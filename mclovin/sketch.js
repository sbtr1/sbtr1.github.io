let w = 800;
let h = 500;
let people = [];
var started = false;
var numPeople, button, pmatch, pmale;
var peopleslider, matchslider, genderslider;

function setup() {
  createCanvas(w, h);
  noStroke();
  background(50, 90, 100);
  textSize(20);
  textAlign(CENTER);
  text("Dating pool simulation. Adjust the inputs, then click button to simulate.", width/2, 100);
  textSize(16);
  text("Number of people (1 to 50):", width/2 - 10, 160);
  text("Probability of a match (0 to 100%):", width/2 - 10, 240);
  text("Proportion of males (0 to 100%):", width/2 - 10, 310);
  peopleslider = createSlider(1, 50, 25);
  peopleslider.position(width/2 - 70,170);
  matchslider = createSlider(0, 100, 50);
  matchslider.position(width/2 - 70, 250);
  genderslider = createSlider(0, 100, 50);
  genderslider.position(width/2 - 70, 320);
  button = createButton("Start");
  button.position(width/2 - 20, 400);
  button.mousePressed(startSketch);
}

function draw() {
  if(started) {
    background(50, 90, 100);
    for (let i = 0; i < people.length; i++) {
      detectMatch(i);
      people[i].move();
      people[i].display();
    }
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
  started = true; 
  numPeople = peopleslider.value();
  pmatch = matchslider.value()/100;
  pmale = genderslider.value()/100;
  button.hide();
  peopleslider.hide();
  matchslider.hide();
  genderslider.hide();
 
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


