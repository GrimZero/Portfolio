import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AboutData } from 'src/app/interfaces/about-data';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  about: AboutData;
  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.getAbout().subscribe(observer => this.about = observer);
  }

}
