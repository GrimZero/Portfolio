import { Component, OnInit } from '@angular/core';
import { ProgressbarData } from 'src/app/progressbarData';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  competences: ProgressbarData[] = [
    { name: 'C++', amount: 40, color: 'gray' },
    { name: 'C#', amount: 75, color: 'gray' },
    { name: 'Angular', amount: 50, color: 'gray' }
  ];

  languages: ProgressbarData[] = [
    { name: 'Dutch', amount: 100, color: 'gray' },
    { name: 'English', amount: 95, color: 'gray' },
    { name: 'German', amount: 70, color: 'gray' },
    { name: 'French', amount: 40, color: 'gray' },
    { name: '日本語', amount: 30, color: 'gray' },
  ];

  constructor() {
    this.competences = this.competences.sort((x, x2) => x2.amount - x.amount);
    this.languages =  this.languages.sort((x, x2) => x2.amount - x.amount);
  }

  ngOnInit() {
  }
}
