import { Component } from '@angular/core';
import * as $ from 'jquery';
import 'owl.carousel';

@Component({
    selector : 'app-carousel',
    templateUrl : './carousel.component.html',
    styleUrls : ['./carousel.component.scss']
})
export class CarouselComponent {
    ngAfterViewInit() {
        let options:any = {
            loop: true,
            margin: 0,
            items: 1,
            nav: true,
            autoplay: 2500,
            smartSpeed: 1500,
            dots: false,
            navText: ['<img src="img/left-arrow.png">', '<img src="img/right-arrow.png">'],
            responsiveClass: true
        };
        (<any>window).$('.cta-owl').owlCarousel(options);
    }
}
