import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutData } from '../interfaces/about-data';
import { Observable } from 'rxjs';
import { ProjectsData } from '../interfaces/projects';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  getAbout(): Observable<AboutData> {
    return this.http.get('../../assets/about.json') as Observable<AboutData>;
  }

  getProjects(): Observable<ProjectsData> {
    return this.http.get('../../assets/projects.json') as Observable<ProjectsData>;
  }
}
