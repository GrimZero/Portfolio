import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  @Input() text: string;
  @Input() percentage: number;
  @Input() color: string;
  stateChanged: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
