import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { RouterModule, Router } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProjectsComponent } from './pages/projects-controller/projects.component';
import { AboutComponent } from './page-components/about/about.component';
import { ProjectComponent } from './page-components/project/project.component';
import { ProgressbarComponent } from './page-components/progressbar/progressbar.component';
import { ProgressbarListComponent } from './page-components/progressbar-list/progressbar-list.component';
import { SearchComponent } from './page-components/search/search.component';
import { SearchService } from './services/search.service';
import { TypewriteComponent } from './page-components/typewrite/typewrite.component';
import { TooltipComponent } from './page-components/tooltip/tooltip.component';
import { SkillsComponent } from './page-components/skills/skills.component';
import { DeputyDonutComponent } from './pages/projects/deputy-donut/deputy-donut.component';
import { ThreejsComponent } from './page-components/threejs/threejs.component';
import { ComponentNavigationService } from './services/component-navigation.service';
import { HttpClientModule } from '@angular/common/http';
import { ThreejsWrapperComponent } from './page-components/threejs-wrapper/threejs-wrapper.component';
import { DataService } from './services/data.service';
import { ProjectBaseComponent } from './pages/projects/A-project-base/project-base.component';
import { ColorCorrectionComponent } from './pages/projects/color-correction/color-correction.component';
import { ThreejsCityComponent } from './pages/projects/threejs-city/threejs-city.component';
import { UnityMetadataHiderComponent } from './pages/projects/unity-metadata-hider/unity-metadata-hider.component';
import { PlexDownloadManagerComponent } from './pages/projects/plex-download-manager/plex-download-manager.component';
import { BackButtonComponent } from './page-components/back-button/back-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotFoundComponent,
    ProjectsComponent,
    AboutComponent,
    ProjectComponent,
    ProgressbarComponent,
    ProgressbarListComponent,
    SearchComponent,
    TypewriteComponent,
    TooltipComponent,
    SkillsComponent,
    DeputyDonutComponent,
    ThreejsComponent,
    ThreejsWrapperComponent,
    ProjectBaseComponent,
    ColorCorrectionComponent,
    ThreejsCityComponent,
    UnityMetadataHiderComponent,
    PlexDownloadManagerComponent,
    BackButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [SearchService, ComponentNavigationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
}
