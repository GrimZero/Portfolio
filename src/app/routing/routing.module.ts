import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { DeputyDonutComponent } from '../pages/deputy-donut/deputy-donut.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { ColorCorrectionComponent } from '../pages/color-correction/color-correction.component';
import { ThreejsCityComponent } from '../pages/threejs-city/threejs-city.component';
const routes = [
  { path: 'DeputyDonut', component: DeputyDonutComponent, data: {id: 'DeputyDonut'} },
  { path: 'ColorCorrection', component: ColorCorrectionComponent, data: {id: 'ColorCorrection'} },
  { path: 'threejs-city', component: ThreejsCityComponent, data: {id: 'threejs-city'} },
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
