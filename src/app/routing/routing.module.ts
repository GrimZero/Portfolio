import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { DeputyDonutComponent } from '../pages/projects/deputy-donut/deputy-donut.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { ColorCorrectionComponent } from '../pages/projects/color-correction/color-correction.component';
import { ThreejsCityComponent } from '../pages/projects/threejs-city/threejs-city.component';
import { UnityMetadataHiderComponent } from '../pages/projects/unity-metadata-hider/unity-metadata-hider.component';
import { PlexDownloadManagerComponent } from '../pages/projects/plex-download-manager/plex-download-manager.component';
import { ProjectsComponent } from '../pages/projects-controller/projects.component';
const routes = [
  { path: 'DeputyDonut', component: DeputyDonutComponent, data: {id: 'DeputyDonut'} },
  { path: 'ColorCorrection', component: ColorCorrectionComponent, data: {id: 'ColorCorrection'} },
  { path: 'threejs-city', component: ThreejsCityComponent, data: {id: 'threejs-city'} },
  { path: 'unity-metadata-hider', component: UnityMetadataHiderComponent, data: {id: 'unity-metadata-hider'} },
  { path: 'plextool', component: PlexDownloadManagerComponent, data: {id: 'plextool'} },
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
