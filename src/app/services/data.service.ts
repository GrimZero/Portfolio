import { Injectable } from '@angular/core';
import { ContactInfo } from '../interfaces/contact-info';
import { HttpClient } from '@angular/common/http';
import { AboutData } from '../interfaces/about-data';
import { Observable } from 'rxjs';
import { ProjectsData } from '../interfaces/projects';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  contact: ContactInfo[] = [
    { link: 'https://github.com/GrimZero', img: 'assets/svg/contact/github.svg' },
    { link: 'https://www.facebook.com/torben.vanassche.3', img: 'assets/svg/contact/facebook.svg' },
    { link: 'https://www.linkedin.com/in/torben-van-assche-931982153/', img: 'assets/svg/contact/linkedin.svg' },
    { link: 'https://discordapp.com/channels/@me/Protagonist-kun#5509/', img: 'assets/svg/contact/discord.svg' }
  ];

  constructor(private http: HttpClient) {
  }

  getAbout(): Observable<AboutData> {
    return this.http.get('../../assets/about.json') as Observable<AboutData>;
  }

  getProjects(): Observable<ProjectsData> {
    return this.http.get('../../assets/projects.json') as Observable<ProjectsData>;
  }
}
