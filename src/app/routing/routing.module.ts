import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ProjectInfoComponent } from '../page-components/project-info/project-info.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
const routes = [
  { path: 'DeputyDonut', component: ProjectInfoComponent, data: {id: 'Deputy Donut'} },
  { path: 'ColorCorrection', component: ProjectInfoComponent, data: {id: 'Color correction'} },
  { path: '', component: HomepageComponent },
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
