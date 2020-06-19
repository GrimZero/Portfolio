import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-threejs-wrapper',
  templateUrl: './threejs-wrapper.component.html',
  styleUrls: ['./threejs-wrapper.component.scss']
})
export class ThreejsWrapperComponent implements OnInit {
@Input() maxSize;

  constructor() { }

  ngOnInit() {
  }

}
