import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { AvatarViewComponent } from './components/avatar-view/avatar-view.component';
import { MixMatchComponent } from './components/mix-match/mix-match.component';
import { AvatarPreviewComponent } from './components/avatar-preview/avatar-preview.component';
import { UploadOutfitsComponent } from './components/upload-outfits/upload-outfits.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadPhotoComponent },
  { path: 'avatar-preview', component: AvatarPreviewComponent },
  { path: 'avatar', component: AvatarViewComponent },
  { path: 'upload-outfits', component: UploadOutfitsComponent },
  { path: 'mix-match', component: MixMatchComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
