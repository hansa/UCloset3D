import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { AvatarViewComponent } from './components/avatar-view/avatar-view.component';
import { LoginComponent } from './components/login/login.component';
import { UploadOutfitsComponent } from './components/upload-outfits/upload-outfits.component';
import { VirtualClosetComponent } from './components/virtual-closet/virtual-closet.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MixMatchComponent } from './components/mix-match/mix-match.component';
import { OutfitGalleryComponent } from './components/outfit-gallery/outfit-gallery.component';
import { AvatarPreviewComponent } from './components/avatar-preview/avatar-preview.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'upload-photo', component: UploadPhotoComponent },
  { path: 'avatar', component: AvatarViewComponent },
  { path: 'avatar-preview', component: AvatarPreviewComponent },
  { path: 'upload-outfits', component: UploadOutfitsComponent },
  { path: 'virtual-closet', component: VirtualClosetComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'mix-match', component: MixMatchComponent },
  { path: 'outfit-gallery', component: OutfitGalleryComponent },
//   { path: '**', redirectTo: 'upload' }
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
