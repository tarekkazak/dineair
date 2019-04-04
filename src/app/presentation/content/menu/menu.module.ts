import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { EditorModule } from 'app/presentation/common/editor/editor.module';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';

@NgModule({
    declarations : [ MenuComponent ],
    exports : [ MenuComponent ],
    imports : [
        EditorModule,
        CommonModule
    ],
    providers : [
        EditorContentUpdatedSignal 
    ]
})
export class MenuModule {}
