import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutData } from '../interfaces/about-data';
import { Observable } from 'rxjs';
import { ProjectsData } from '../projects/projects';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  getAbout(): Observable<AboutData> {
      var data = this.http.get('assets/about.json') as Observable<AboutData>;
      data.subscribe(data => {
        const dif = Math.abs(Date.now() - new Date(data.birthDate).getTime());
        data.age = Math.floor((dif / (1000 * 3600 * 24)) / 365.25);
      })

      return data;
  }

  getProjects(): Observable<ProjectsData> {
      return this.http.get('assets/projects.json') as Observable<ProjectsData>;
  }
}
