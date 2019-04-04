import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniMenuComponent } from './mini-menu.component';
import { EditorModule } from 'app/presentation/common/editor/editor.module';
import { ContentLoadedSignal, ContentUpdatedSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';

@NgModule({
    declarations : [ MiniMenuComponent ],
    exports : [ MiniMenuComponent ],
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
export class MiniMenuModule {}
