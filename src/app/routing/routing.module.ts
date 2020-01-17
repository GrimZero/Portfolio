import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ProjectsComponent } from '../pages/projects-controller/projects.component';
import { ProjectBaseComponent } from '../pages/projects/A-project-base/project-base.component';
const routes = [
  { path: 'DeputyDonut', component: ProjectBaseComponent, data: {id: 'DeputyDonut'} },
  { path: 'ColorCorrection', component: ProjectBaseComponent, data: {id: 'ColorCorrection'} },
  { path: 'threejs-city', component: ProjectBaseComponent, data: {id: 'threejs-city'} },
  { path: 'unity-metadata-hider', component: ProjectBaseComponent, data: {id: 'unity-metadata-hider'} },
  { path: 'plextool', component: ProjectBaseComponent, data: {id: 'plextool'} },
  { path: '', component: ProjectsComponent },
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
