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
    userdata.competences = userdata.competences.sort((x, x2) => x2.amount - x.amount);
    userdata.languages =  userdata.languages.sort((x, x2) => x2.amount - x.amount);

    this.hostData = userdata;
  }

  ngOnInit() {
  }
}
