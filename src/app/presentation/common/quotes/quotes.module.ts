import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { EditorModule } from 'app/presentation/common/editor/editor.module';
import { ContentLoadedSignal, ContentUpdatedSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';

@NgModule({
    declarations : [ QuotesComponent ],
    exports : [ QuotesComponent ],
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
export class QuotesModule {}
