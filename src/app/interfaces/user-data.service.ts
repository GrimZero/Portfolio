import { Injectable } from '@angular/core';
import { ProgressbarData } from './progressbarData';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  name = 'Torben Van Assche';
  birthDate = new Date(1995, 10, 21);
  age: number;

  pictureURL: string = "https://via.placeholder.com/300x300";
  headline = 'Average coder.';

  competences: ProgressbarData[] = [
    { name: 'C++', amount: 40, color: '#FFDC51' },
    { name: 'C#', amount: 75, color: '#FFDC51' },
    { name: 'Angular', amount: 50, color: '#FFDC51' }
  ];

  languages: ProgressbarData[] = [
    { name: 'Dutch', amount: 100, color: '#4955FF' },
    { name: 'English', amount: 95, color: '#4955FF' },
    { name: 'German', amount: 70, color: '#4955FF' },
    { name: 'French', amount: 40, color: '#4955FF' },
    { name: '日本語', amount: 30, color: '#4955FF' },
  ];

  hobbies: ProgressbarData[] = [
  ]

  constructor() {
    const dif = Math.abs(Date.now() - this.birthDate.getTime());
    this.age = Math.floor((dif / (1000 * 3600 * 24)) / 365.25);

    this.competences = this.competences.sort((x, x2) => x2.amount - x.amount);
    this.languages =  this.languages.sort((x, x2) => x2.amount - x.amount);
  }
}
