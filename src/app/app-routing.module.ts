import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { AvatarViewComponent } from './components/avatar-view/avatar-view.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadOutfitsComponent } from './components/upload-outfits/upload-outfits.component';
import { VirtualClosetComponent } from './components/virtual-closet/virtual-closet.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MixMatchComponent } from './components/mix-match/mix-match.component';
import { OutfitGalleryComponent } from './components/outfit-gallery/outfit-gallery.component';
import { AvatarPreviewComponent } from './components/avatar-preview/avatar-preview.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FashionChallengeComponent } from './components/fashion-challenge/fashion-challenge.component';
import { MotionGeneratorComponent } from './components/motion-generator/motion-generator.component';
import { AnimateVideoComponent } from './components/animate-video/animate-video.component';
import { MetahumanVideoComponent } from './components/metahuman-video/metahuman-video.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'upload-photo', component: UploadPhotoComponent },
  { path: 'avatar', component: AvatarViewComponent },
  { path: 'avatar-preview', component: AvatarPreviewComponent },
  { path: 'upload-outfits', component: UploadOutfitsComponent },
  { path: 'virtual-closet', component: VirtualClosetComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'mix-match', component: MixMatchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'outfit-gallery', component: OutfitGalleryComponent },
  { path: 'animate', component: AnimateVideoComponent },
  { path: 'metahuman-video', component: MetahumanVideoComponent },
  { path: 'challenge', component: FashionChallengeComponent },
  { path: 'motion-generator', component: MotionGeneratorComponent },
//   { path: '**', redirectTo: 'upload' }
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
