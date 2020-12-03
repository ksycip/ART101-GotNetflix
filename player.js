class Player {
  constructor() {
    this.r = 60;
    this.x = w / 2;
    this.y = h - this.r;
    this.speed = 2;
    this.direction = 'still';
  }

  display() {
    // rect(this.x, this.y, this.r, this.r);
    image(playerImg, this.x, this.y, this.r, this.r);
  }

  move() {

    switch (this.direction) {
      case 'still':
      //don't move anything
      break;
    case 'up':
      //decrease y position
    if (this.y > 0){
      this.y -= this.speed;
    }
      break;
    case 'down':
      //increase y position
    if (this.y < h - this.r){
      this.y+= this.speed;
    }
      break;
    case 'right':
      //increasing x position
      if (this.x < w - this.r){
        this.x += this.speed;
      }
      break;
    case 'left':
      //decreasing y position
      if (this.x > this.r){
        this.x -= this.speed;
      }
      break;
    default:
    break;
    }
  }


}
