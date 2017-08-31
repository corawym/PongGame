import {SVG_NS} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight, player1, player2) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('../public/sounds/pong-03.wav');
    this.player1 = player1;
    this.player2 = player2;
    this.reset();
  }

  reset(){
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;

    while(this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5); 
    }
    
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if(hitLeft || hitRight) {  
      if(hitLeft){
        this.goal(this.player2);
        this.vx = -this.vx;
        this.player2.height += 4;
        this.player1.height -= 4;
        this.player1.resetPaddlePosition();
        this.player2.resetPaddlePosition();
      }else{
        this.goal(this.player1);
        this.player1.height += 4;
        this.player2.height -= 4;
        this.player1.resetPaddlePosition();
        this.player2.resetPaddlePosition();
      }

    }else if( hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision() {
    if (this.vx > 0) {
      //detect player 2 paddle collision
      let paddle = this.player2.coordinates (this.player2.x, this.player2.y, this.player2.width, this.player2.height);
      let [ leftX, rightX, topY, bottomY ] = paddle;
      if(
        this.x + this.radius >= leftX 
        && this.y >= topY 
        && this.y <= bottomY
        ){
        this.vx = -this.vx;
        this.ping.play();
      }
    }else{
      //detect player 1 paddle collision
      let paddle = this.player1.coordinates (this.player1.x, this.player1.y, this.player1.width, this.player1.height);
      let [ leftX, rightX, topY, bottomY ] = paddle;
      if(
        this.x - this.radius <= rightX 
        && this.y >= topY 
        && this.y <= bottomY
        ){
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  } 

  goal(player) {
    player.score++;
    this.reset();
  }

  render(svg) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision();

    let circle = document.createElementNS(SVG_NS,'circle');
    circle.setAttributeNS(null, 'cx', this.x); 
    circle.setAttributeNS(null, 'cy', this.y); 
    circle.setAttributeNS(null, 'r', this.radius); 
    circle.setAttributeNS(null, 'fill', 'black'); 
    svg.appendChild(circle);
  }
} // end class Ball