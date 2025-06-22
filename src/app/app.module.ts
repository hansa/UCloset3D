import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AvatarViewComponent } from './components/avatar-view/avatar-view.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { MixMatchComponent } from './components/mix-match/mix-match.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AvatarViewComponent,
    UploadPhotoComponent,
    MixMatchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
