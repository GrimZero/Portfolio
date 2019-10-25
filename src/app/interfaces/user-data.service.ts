import { Injectable } from '@angular/core';
import { ProgressbarData } from './progressbarData';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  name = 'Torben Van Assche';
  birthDate = new Date(1995, 10, 21);
  age: number;

  pictureURL: string;
  headline = 'Average coder.';

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
    const dif = Math.abs(Date.now() - this.birthDate.getTime());
    this.age = Math.floor((dif / (1000 * 3600 * 24)) / 365.25);
  }
}
