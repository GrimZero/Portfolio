import { Component, OnInit } from '@angular/core';
import { CarrouselElementItem } from 'src/app/interfaces/carrousel-element-item';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  iconList: CarrouselElementItem[] = [
    { icon: 'angular', text: 'Angular'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
