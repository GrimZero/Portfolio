import { Injectable } from '@angular/core';
import { ProgressbarData } from '../interfaces/progressbarData';
import { IProject } from '../interfaces/iproject';
import { ContactInfo } from '../interfaces/contact-info';
import { HttpClient } from '@angular/common/http';
import { Hostdata } from '../interfaces/hostdata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  json: Hostdata;

  // calculated data
  age: number;

  competences: ProgressbarData[] = [
    { name: 'C++', amount: 40, color: '#111111' },
    { name: 'C#', amount: 75, color: '#111111' },
    { name: 'HTML', amount: 60, color: '#111111' },
    { name: 'Unity', amount: 80, color: '#111111' },
    { name: '3D', amount: 50, color: '#111111' },
    { name: 'Rigging', amount: 65, color: '#111111' },
  ];

  projects: IProject[] = [
    {
      title: 'Color correction', preview: 'assets/Projects/TextureEditor.jpg', thumbnailSize: 200,
      header: 'Project to make color adjustments in WPF using OpenCV C# (EmguCV).'
    },
    {
      title: 'Deputy Donut', preview: 'assets/Projects/DeputyDonut.jpg', alternatePreview: 'assets/Projects/DD-car.jpg',
      header: 'Cop-and-robbers chasing game where you try and take out the other player in a power-up based battle!',
      route: 'DeputyDonut', softwareUsed: ['Unity', '3DsMax', 'Photoshop'], thumbnailSize: 200
    },
    {
      title: '"VR" Kinect Shooter', preview: 'assets/Projects/VR-Dome.jpg', thumbnailSize: 200,
      header: 'Game using the kinect to create a VR experience without the need for a headset.'
    },
    {
      title: '3D-Printing', preview: 'assets/Projects/VertexDelta.jpg', thumbnailSize: 200,
      header: 'After acquiring a 3D-Printer I started doing some prints for concepts!'
    },
    {
      title: 'PBR', preview: 'assets/Projects/Gun.png',
      header: 'Modelling and PBR', thumbnailSize: 200
    },
  ];

  contact: ContactInfo[] = [
    { link: 'https://github.com/GrimZero', img: 'assets/svg/contact/github.svg' },
    { link: 'https://www.facebook.com/torben.vanassche.3', img: 'assets/svg/contact/facebook.svg' },
    { link: 'https://www.linkedin.com/in/torben-van-assche-931982153/', img: 'assets/svg/contact/linkedin.svg' },
    { link: 'https://discordapp.com/channels/@me/Protagonist-kun#5509/', img: 'assets/svg/contact/discord.svg' }
  ];

  constructor(private http: HttpClient) {
    this.get().subscribe(result => {
      this.json = result;

      const dif = Math.abs(Date.now() - new Date(this.json.birthDate).getTime());
      this.age = Math.floor((dif / (1000 * 3600 * 24)) / 365.25);

      this.competences = this.competences.sort((x, x2) => x2.amount - x.amount);

      for (let index = 0; index < 0; index++) {
        this.projects.push({
          title: 'Placeholder', preview: 'https://via.placeholder.com/300', thumbnailSize: 200
        });
      }
    });
  }

  get(): Observable<Hostdata> {
    return this.http.get('../../assets/hostinfo.json') as Observable<Hostdata>;
  }
}
