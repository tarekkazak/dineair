import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from "@angular/platform-browser";
import * as $ from 'jquery';


import { AuthService } from 'app/presentation/common/auth/auth.service';
import * as schema from './schema/equipment.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private userSubscription: Subscription;
  public user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private domSanitizer: DomSanitizer,
  ) {
  }

  public ngOnInit() {

    // init this.user on startup
    this.authService.me().subscribe(data => {
      this.user = data.user;
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= 80) {
            $('.header-area').addClass('header-fixed');
        }
        else {
            $('.header-area').removeClass('header-fixed');
        }
        if ($(window).scrollTop() >= 1030) {
            $('.menu-container').addClass('menu-fixed');
        }
        else {
            $('.menu-container').removeClass('menu-fixed');
        }
        if ($(window).scrollTop() >= 5741) {
            $('.menu-container').addClass('menu-fixed--at-bottom');
        }
        else {
            $('.menu-container').removeClass('menu-fixed--at-bottom');
        }
    });
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  ngOnDestroy() { 
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
