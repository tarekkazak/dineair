import { Component } from '@angular/core';
import * as $ from 'jquery';
import 'magnific-popup';

@Component({
    selector : 'app-gallery',
    templateUrl : './gallery.component.html',
    styleUrls : ['./gallery.component.scss']
})
export class GalleryComponent {
    ngAfterViewInit() {
    (<any>$)('.photo-gallery-pop-up').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
}
