import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { AboutComponent } from '../pages/about/about.component';
const routes = [
  { path: 'Home', component: HomepageComponent },
  { path: 'Projects', component: ProjectsComponent },
  { path: 'About', component: AboutComponent },
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
export class RoutingModule { }
