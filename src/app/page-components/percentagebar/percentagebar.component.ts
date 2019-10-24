import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-percentagebar',
  templateUrl: './percentagebar.component.html',
  styleUrls: ['./percentagebar.component.scss']
})
export class PercentagebarComponent implements OnInit {

  @Input() percentage: number;
  @Input() color: string;
  stateChanged: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
