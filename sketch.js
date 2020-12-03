'use strict';



let state = 'title';
let cnv;
let points = 0;
let w = 600;
let h = 600;
let player;
let coins = [];
let playerImg;
let coinImg;

function preload(){
  playerImg = loadImage('assets/bunny2.png');
  coinImg = loadImage('assets/carrot3.png');
}

function setup() {
  cnv = createCanvas(w, h);

  textFont('courier');

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
    player.direction = 'still';
  }
}

function title() {
  background(179, 187, 182);
  textSize(80);
  fill(255);
  textAlign(CENTER);
  text('HUNGRY BUNNY', w / 2, h / 5);

  textSize(30);
  text('click anywhere to start', w / 2, h / 2);

  textSize(20);
  text('use arrow keys to help bunny eat some carrots', w / 2, h / 1.5);

}


function titleMouseClicked() {
  console.log('canvas is clicked on title page');
  state = 'level1'
}


function level1() {
  background(174, 124, 108);
  //text('click for points', w/2, h - 30);

  if (random(1) <= 0.01){
    coins.push(new Coin());
  }

  player.display();
  player.move();


// iterating through colors array to display and move them

// using for loop
  for (let i = 0; i  < coins.length; i ++){
    coins[i].display();
    coins[i].move();
  }

//using forEach loop

// coins.forEach(function(coin){
//   coin.display();
//   coin.move();
// })


//using for of loop
// for (let coin of coins){
//   coin.display();
//   coin.move();
// }


  //check for collision, if collision them point increase by 1 and splice that coin out of array
  //need to iterate backwards through array
  for (let i = coins.length - 1; i >= 0; i--) {
  if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
    points++;
    console.log(points);
    coins.splice(i, 1);
  } else if (coins[i].y > h){
    coins.splice(i, 1);
    console.log('coin is out of canvas')
  }
  }

  text(`points: ${points}`, w / 4, h - 30);
}

function level1MouseClicked() {
  // points++;
  // console.log('points = ' + points);
  //
  // if (points >= 10) {
  //   state = 'you win';
  // }


}

function youWin() {
  background(91, 91, 74);
  textSize(80);
  stroke(255);
  text('YOU WIN', w / 2, h / 2);

  textSize(30);
  text('click anywhere to restart', w / 2, h * 3 / 4);
}

function youWinMouseClicked() {
  state = 'level1';
  points = 0;
}
