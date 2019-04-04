import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { ContactInfoModule } from 'app/presentation/common/contact/contact-info.module';
import { EditorModule } from 'app/presentation/common/editor/editor.module';
import { ContentLoadedSignal, ContentUpdatedSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';

@NgModule({
    declarations : [ AboutComponent ],
    exports : [ AboutComponent ],
    imports : [
        ContactInfoModule,
        EditorModule,
        CommonModule
        ],
        providers : [
            ContentLoadedSignal,
            ContentUpdatedSignal,
            EditorContentUpdatedSignal
        ]
})
export class AboutModule {}
