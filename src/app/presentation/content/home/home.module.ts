import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { GalleryModule } from 'app/presentation/content/gallery/gallery.module';
import { MiniMenuModule } from 'app/presentation/common/minimenu/mini-menu.module';
import { ContactInfoModule } from 'app/presentation/common/contact/contact-info.module';
import { CarouselModule } from 'app/presentation/common/carousel/carousel.module';
import { QuotesModule } from 'app/presentation/common/quotes/quotes.module'

@NgModule({
    declarations : [ HomeComponent ],
    exports : [ HomeComponent ],
    imports : [
        MiniMenuModule,
        ContactInfoModule,
        GalleryModule,
        CarouselModule,
        QuotesModule,
    ]
})
export class HomeModule {}
