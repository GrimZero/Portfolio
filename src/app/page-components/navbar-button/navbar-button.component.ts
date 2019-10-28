import { Component, OnInit, Input } from '@angular/core';
import { NavbarButtonData } from 'src/app/interfaces/navbar-button-data';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.scss']
})
export class NavbarButtonComponent implements OnInit {

  @Input() buttonData: NavbarButtonData;

  constructor() { }

  ngOnInit() {

  }

}
