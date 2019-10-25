import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-typewrite',
  templateUrl: './typewrite.component.html',
  styleUrls: ['./typewrite.component.scss']
})
export class TypewriteComponent implements OnInit {

  @Input() text: string;
  @Input() delay: number;
  printedText = '';

  index = 0;

  constructor() { }

  ngOnInit() {
    if (this.text !== undefined) {
      this.printText();
    }
  }

  printText = () => {
    if (this.index < this.text.length) {
      this.printedText += this.text.charAt(this.index++);
      setTimeout(this.printText, this.delay);
    }
  }

}
