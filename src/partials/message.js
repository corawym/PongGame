import {SVG_NS} from '../settings';

export default class Message {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  render(svg, message) {
    let textbg = document.createElementNS(SVG_NS,'text');
    textbg.setAttributeNS(null, 'x', this.x);
    textbg.setAttributeNS(null, 'y', this.y);
    textbg.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype'); 
    textbg.setAttributeNS(null, 'font-size', this.size);
    textbg.setAttributeNS(null, 'text-anchor', 'middle');
    textbg.setAttributeNS(null, 'stroke', 'white');
    textbg.setAttributeNS(null, 'stroke-width', '100');
    textbg.textContent = message;
    svg.appendChild(textbg);

    let text = document.createElementNS(SVG_NS,'text');
    text.setAttributeNS(null, 'x', this.x);
    text.setAttributeNS(null, 'y', this.y);
    text.setAttributeNS(null, 'fill', 'black'); 
    text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype'); 
    text.setAttributeNS(null, 'font-size', this.size);
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.textContent = message;
    svg.appendChild(text);
  }
} // end class Message
