import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AboutData } from '../interfaces/about-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  data: AboutData;

  constructor(private about: DataService) { }

  ngOnInit() {
    this.about.getAbout().subscribe(observer => this.data = observer);
  }

  onNavigate(path: string) {
    window.open(path, '_blank');
  }
}
