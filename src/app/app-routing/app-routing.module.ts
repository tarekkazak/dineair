import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/presentation/common/auth/auth-guard.service';
import { HomeComponent } from 'app/presentation/content/home/home.component';
import { GalleryComponent } from 'app/presentation/content/gallery/gallery.component';
import { AboutComponent } from 'app/presentation/content/about/about.component';
import { MenuComponent } from 'app/presentation/content/menu/menu.component';
import { ContactInfoComponent } from 'app/presentation/common/contact/contact-info.component';

const routes: Routes = [
 {
  path: 'auth',
  loadChildren: 'app/presentation/common/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/presentation/common/admin/admin.module#AdminModule'
},
{
    path : '',
    component : HomeComponent
},
{
    path : 'gallery',
    component : GalleryComponent
},
{
    path : 'about',
    component : AboutComponent
},
{
    path : 'menu',
    component : MenuComponent
},
{
    path : 'contact',
    component : ContactInfoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
