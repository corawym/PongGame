import {SVG_NS, KEYS} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Message from './Message';

export default class Game {

	constructor(element, width, height) {

		this.width = width;
		this.height = height;
	
		this.gameElement = document.getElementById(element);

		// paddle = player
		this.paddleWidth = 8;
		this.paddleHeight = 52;
		this.boardGap = 10,

		this.board = new Board(this.width, this.height);
		this.player1 = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight)/2,
			KEYS.a,
			KEYS.z,
			KEYS.spaceBar
		);
		this.player2 = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight,
			this.width - this.paddleWidth - this.boardGap,
			(this.height - this.paddleHeight)/2,
			KEYS.up,
			KEYS.down,
			KEYS.spaceBar
		);

		// ball
		this.ballRadius = 8;

		this.ball = new Ball(
			this.ballRadius,
			this.width,
			this.height
		);

		// score
		this.y = 40;
		this.size = 30;

		this.score1 = new Score(
			this.width /2 - 70,
			this.y,
			this.size
		);
		
		this.score2 = new Score(
			this.width /2 + 70,
			this.y,
			this.size
		);

		// message
		this.messageStart = new Message(
			this.width /2,
			this.y /2,
			this.size
		)

		this.messageWinner = new Message(
			this.width /2,
			this.y /2,
			this.size
		)

		document.addEventListener('keydown', event => {
      switch(event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });
	}

	render() {
		if (this.pause){
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS,'svg');
		svg.setAttributeNS(null, 'version', '1.1');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);
	}

}