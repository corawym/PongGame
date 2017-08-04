import {SVG_NS} from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, spaceBar) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch(event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
        case spaceBar:
          this.pause = !this.pause;
          break;
      }
    });
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  up(){
    if (this.pause){
			return;
		} 
    // get the max number
    this.y = Math.max(this.y - this.speed, 0);
  }
  down(){
    if (this.pause){
			return;
		} 
    // get the min number
    this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
  }


  render(svg){

    if (this.pause){
			return;
		}

    let rect = document.createElementNS(SVG_NS,'rect');
    rect.setAttributeNS(null, 'x', this.x); //
    rect.setAttributeNS(null, 'y', this.y); //
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(rect);
  }
} // end class Paddle
