import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/interfaces/user-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  hostData: UserDataService;
  age: number;

  constructor(private userdata: UserDataService) {
    this.hostData = userdata;
  }

  ngOnInit() {
  }
}
