import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery.component';
import { MiniMenuModule } from 'app/presentation/common/minimenu/mini-menu.module';

@NgModule({
    declarations : [ GalleryComponent ],
    exports : [ GalleryComponent ],
    imports : [
        MiniMenuModule,
    ]
})
export class GalleryModule {}
