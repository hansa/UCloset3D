import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { AvatarViewComponent } from './components/avatar-view/avatar-view.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { MixMatchComponent } from './components/mix-match/mix-match.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadOutfitsComponent } from './components/upload-outfits/upload-outfits.component';
import { VirtualClosetComponent } from './components/virtual-closet/virtual-closet.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OutfitGalleryComponent } from './components/outfit-gallery/outfit-gallery.component';
import { AvatarPreviewComponent } from './components/avatar-preview/avatar-preview.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { FashionChallengeComponent } from './components/fashion-challenge/fashion-challenge.component';
import { AnimateVideoComponent } from './components/animate-video/animate-video.component';


@NgModule({
  declarations: [
    AppComponent,
    AvatarViewComponent,
    UploadPhotoComponent,
    MixMatchComponent,
    LoginComponent,
    SignupComponent,
    UploadOutfitsComponent,
    VirtualClosetComponent,
    GalleryComponent,
    CartComponent,
    ProfileComponent,
    OutfitGalleryComponent,
    AvatarPreviewComponent,
    AdBannerComponent,
    FashionChallengeComponent,
    AnimateVideoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
