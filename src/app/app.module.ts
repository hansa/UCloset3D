import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AvatarViewComponent } from './components/avatar-view/avatar-view.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { MixMatchComponent } from './components/mix-match/mix-match.component';

@NgModule({
  declarations: [
    AppComponent,
    AvatarViewComponent,
    UploadPhotoComponent,
    MixMatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
