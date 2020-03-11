import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../page-components/not-found/not-found.component';
import { ProjectBaseComponent } from '../projects/project-info/project-base.component';
import { AboutComponent } from '../page-components/about/about.component';
import { HeroComponent } from '../page-components/hero/hero.component';
import { ProjectsComponent } from '../projects/projects-controller/projects.component';

const routes = [
  { path: 'Projects/DeputyDonut', component: ProjectBaseComponent, data: {id: 'DeputyDonut'} },
  { path: 'Projects/ColorCorrection', component: ProjectBaseComponent, data: {id: 'ColorCorrection'} },
  { path: 'Projects/unity-metadata-hider', component: ProjectBaseComponent, data: {id: 'unity-metadata-hider'} },
  { path: 'Projects/plextool', component: ProjectBaseComponent, data: {id: 'plextool'} },
  { path: 'Projects/portfolio', component: ProjectBaseComponent, data: {id: 'portfolio'} },
  { path: 'About', component: AboutComponent },
  { path: 'Projects', component: ProjectsComponent },
  { path: 'Home', component: HeroComponent },
  { path: '', component: HeroComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class RoutingModule {
 }
