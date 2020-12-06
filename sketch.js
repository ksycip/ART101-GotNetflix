'use strict';



let state = 'title';
let cnv;
let points = 0;
let w = 900;
let h = 600;
let player;
let coins = [];
let playerImg;
let coinImg;
let timer = 5;


function preload() {
  playerImg = loadImage('assets/remote.png');
  coinImg = loadImage('assets/tv.png');

}

function setup() {
  cnv = createCanvas(w, h);

  // var cnv = createCanvas(windowWidth, windowHeight);
  //  var x = (windowWidth - width) / 2;
  //  var y = (windowHeight - height) / 2;
  //  cnv.position(x, y);

  textFont('impact');

  player = new Player();

  //coins[0] = new Coin();
  coins.push(new Coin());

}

function draw() {

  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
  case 'game over':
      gameOver();
      cnv.mouseClicked(gameOverMouseClicked);
      break;
  default:
      break;
  }
  // if (state === 'title'){
  //   title();
  //   cnv.mouseClicked(titleMouseClicked);
  // } else if (state === 'level 1' && points > 50){
  //   level1();
  //   cnv.mouseClicked(level1MouseClicked);
  // } else {
  //
  // }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  } else if (key = ' ') {
    //player.direction = 'still';
    player.direction = 'level1';
  }
}

function title() {
  background(0, 0, 0);
  textSize(150);
  fill(99, 6, 11);
  textAlign(CENTER);
  text('NETFLIX?', w / 2, h / 2);

  textSize(60);
  text('GOT', w / 2, h / 4);


  textSize(35);
  text('click anywhere to start', w / 2, h / 1.5);

  textSize(20);
  text('use arrow keys to navigate through netflix and binge!', w / 2, h / 1.25);

}


function titleMouseClicked() {
  console.log('canvas is clicked on title page');
  state = 'level1'
}


function level1() {
  background(204, 204, 204);
  //text('click for points', w/2, h - 30);

  if (timer >= 0) {
  textAlign(CENTER, CENTER);
  textSize(60);
  text(timer, width / 2, height / 2);
} else{
  textSize(50);
  text('GAME OVER', width / 2, height / 2);
}


  if (frameCount % 60 == 0 && timer >= 0){  // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer--;
  }
  if (timer == 0) {
    //text("BEGIN", width/2, height*0.7);
  }

  if (random(1) <= 0.01) {
    coins.push(new Coin());
  }

  player.display();
  player.move();


  // iterating through colors array to display and move them

  // using for loop
  for (let i = 0; i < coins.length; i++) {
    coins[i].display();
    coins[i].move();
  }

  //check for collision, if collision them point increase by 1 and splice that coin out of array
  //need to iterate backwards through array
  for (let i = coins.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      console.log(points);
      coins.splice(i, 1);
    } else if (coins[i].y > h) {
      coins.splice(i, 1);
      console.log('coin is out of canvas')
    }
  }

  text(`points: ${points}`, w / 4, h - 30);
}

function level1MouseClicked() {
  points++;
  console.log('points = ' + points);

  if (points >= 10) {
    state = 'GAME OVER';
  }


}

function youWin() {
  background(0, 0, 0);
  textSize(80);
  stroke(255);
  text('YOU WIN', w / 2, h / 2);

  text('YOUR HIGH SCORE: ', w / 2, h / 5);

  textSize(30);
  text('click anywhere to restart', w / 2, h * 3 / 4);
}

function youWinMouseClicked() {
  state = 'level1';
  points = 0;
}
