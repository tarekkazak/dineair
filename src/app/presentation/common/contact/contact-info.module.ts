import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from './contact-info.component';
import { EditorModule } from 'app/presentation/common/editor/editor.module';
import { ContentLoadedSignal, ContentUpdatedSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';

@NgModule({
    declarations : [ ContactInfoComponent ],
    exports : [ ContactInfoComponent ],
    imports : [
        EditorModule,
        CommonModule
    ],
    providers : [
        ContentLoadedSignal,
        ContentUpdatedSignal,
        EditorContentUpdatedSignal
    ]
})
export class ContactInfoModule {}
