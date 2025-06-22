import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { AvatarViewComponent } from './components/avatar-view/avatar-view.component';
import { MixMatchComponent } from './components/mix-match/mix-match.component';
import { UploadOutfitsComponent } from './components/upload-outfits/upload-outfits.component';

const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: UploadPhotoComponent },
  { path: 'avatar', component: AvatarViewComponent },
  { path: 'upload-outfits', component: UploadOutfitsComponent },
  { path: 'mix-match', component: MixMatchComponent },
  { path: '**', redirectTo: 'upload' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
