import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { CKEditorModule  } from '@ckeditor/ckeditor5-angular';
import { FormsModule  } from '@angular/forms';
import { AuthService } from 'app/presentation/common/auth/auth.service';

@NgModule({
    declarations : [ EditorComponent ],
    exports : [ EditorComponent ],
    imports : [
        CKEditorModule,
        CommonModule,
        FormsModule
    ],
    providers : [ AuthService ]

})
export class EditorModule {}
