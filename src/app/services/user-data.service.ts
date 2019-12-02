import { Injectable } from '@angular/core';
import { ProgressbarData } from '../interfaces/progressbarData';
import { IProject } from '../interfaces/iproject';
import { ContactInfo } from '../interfaces/contact-info';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  name = 'Torben Van Assche';
  birthDate = new Date(1995, 10, 21);
  age: number;

  pictureURL = 'assets/sprites/photo.jpg';
  headline = 'Programmer and 3D enthusiast.';

  competences: ProgressbarData[] = [
    { name: 'C++', amount: 40, color: '#111111' },
    { name: 'C#', amount: 75, color: '#111111' },
    { name: 'HTML', amount: 60, color: '#111111' },
    { name: 'Unity', amount: 80, color: '#111111' },
    { name: '3D', amount: 50, color: '#111111' },
    { name: 'Rigging', amount: 65, color: '#111111' },
  ];

  synopsis: string[] = ['Hello, my name is Torben and welcome to my portfolio! I am a developer with a passion for games and the knowledge to back it up. When I work on projects, I look for the best and most efficient way to get something done.',
    'As a programmer I found that solving problems is my main task. Fixing an issue that someone hasin an easy to use way. Creating the tools for a company to get their product finished in an efficient way.',
    'I like spending my free time playing games and watching anime. But more often than not I find myself trying out new things that I can do with code and doing some research.'];

  projects: IProject[] = [
    {
      title: 'Color correction', preview: 'assets/Projects/TextureEditor.jpg',
      header: 'Project to make color adjustments in WPF using OpenCV C# (EmguCV).'
    },
    {
      title: 'Deputy Donut', preview: 'assets/Projects/DeputyDonut.jpg', alternatePreview: 'assets/Projects/DD-car.jpg',
      header: 'Cop-and-robbers chasing game where you try and take out the other player in a power-up based battle!',
      route: 'DeputyDonut', softwareUsed: ['Unity', '3DsMax', 'Photoshop']
    },
    {
      title: '"VR" Kinect Shooter', preview: 'assets/Projects/VR-Dome.jpg',
      header: 'Game using the kinect to create a VR experience without the need for a headset.'
    },
    {
      title: '3D-Printing', preview: 'assets/Projects/VertexDelta.jpg',
      header: 'After acquiring a 3D-Printer I started doing some prints for concepts!'
    },
    {
      title: 'PBR', preview: 'assets/Projects/Gun.png',
      header: 'Modelling and PBR'
    },
  ];

  contact: ContactInfo[] = [
    { link: 'https://github.com/GrimZero', img: 'assets/svg/contact/github.svg' },
    { link: 'https://www.facebook.com/torben.vanassche.3', img: 'assets/svg/contact/facebook.svg' },
    { link: 'https://www.linkedin.com/in/torben-van-assche-931982153/', img: 'assets/svg/contact/linkedin.svg' },
    { link: 'https://discordapp.com/channels/@me/Protagonist-kun#5509/', img: 'assets/svg/contact/discord.svg' }
  ]

  constructor() {
    const dif = Math.abs(Date.now() - this.birthDate.getTime());
    this.age = Math.floor((dif / (1000 * 3600 * 24)) / 365.25);

    this.competences = this.competences.sort((x, x2) => x2.amount - x.amount);

    for (let index = 0; index < 0; index++) {
      this.projects.push({
        title: 'Placeholder', preview: 'https://via.placeholder.com/300'
      })
    }
  }
}
