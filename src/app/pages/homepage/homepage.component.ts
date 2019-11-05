import { Component, OnInit, Input } from '@angular/core';
import { CarrouselElementItem } from 'src/app/interfaces/carrousel-element-item';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  width: number;
  height: number;

  @Input() ocuppiedSpace: number;

  iconList: CarrouselElementItem[] = [
    { icon: 'angular', text: 'Angular' }
  ];

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 170;
  }

  ngOnInit() {
  }

}
