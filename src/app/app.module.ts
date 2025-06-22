import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AvatarViewComponent } from './components/avatar-view/avatar-view.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { MixMatchComponent } from './components/mix-match/mix-match.component';
import { AvatarPreviewComponent } from './components/avatar-preview/avatar-preview.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AvatarViewComponent,
    UploadPhotoComponent,
    MixMatchComponent,
    AvatarPreviewComponent
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
