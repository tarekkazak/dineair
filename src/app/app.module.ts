import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './presentation/common/auth/auth.module';

import { AppComponent } from './app.component';
import { AdminModule } from './presentation/common/admin/admin.module';
import { AuthHeaderInterceptor } from './presentation/common/interceptors/header.interceptor';
import { CatchErrorInterceptor } from './presentation/common/interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeModule } from './presentation/content/home/home.module';
import { HeaderModule } from './presentation/common/header/header.module';
import { FooterModule } from './presentation/common/footer/footer.module';
import { ContactInfoModule } from 'app/presentation/common/contact/contact-info.module';
import { ContactFormModule } from './presentation/common/contact/contact-form.module';
import { BannerModule } from './presentation/common/banner/banner.module';
import { AboutModule } from './presentation/content/about/about.module';
import { MenuModule } from './presentation/content/menu/menu.module';
import { ContentReviewModule } from './presentation/content/content-review.module';
import { TogglePreviewModeSignal, ToggleReviewModeSignal } from './presentation/content/review/content-review.events';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    HomeModule,
    HeaderModule,
    FooterModule,
    ContactFormModule,
    ContactInfoModule,
    BannerModule,
    AboutModule,
    MenuModule,
    ContentReviewModule
  ],
  providers: [
    ToggleReviewModeSignal,
    TogglePreviewModeSignal,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
