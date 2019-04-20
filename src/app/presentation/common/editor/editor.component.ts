import { Component, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, combineLatest, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'app/presentation/common/auth/auth.service';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';
import { TogglePreviewModeSignal } from 'app/presentation/content/review/content-review.events';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { environment } from 'environments/environment';

@Component({
    selector : 'app-editor',
    templateUrl : './editor.component.html',
    styleUrls : ['./editor.component.scss']
})
export class EditorComponent {
    Editor = ClassicEditor;
    canEdit$:Observable<boolean>;
    editMode:boolean = false;
    previewMode$$:Subject<boolean> = new Subject<boolean>();

    @Input()
    content:string;

    @Input()
    dataKey:string;

    editorConfig = {
        heading: {
            options: [
                { model: 'heading1', view: 'h1', title: 'Heading 1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5' }
            ]
        }
    };

    constructor(public authService:AuthService, public editorContentUpdatedSignal:EditorContentUpdatedSignal, public togglePreviewModeSignal:TogglePreviewModeSignal) {}

    ngOnInit() {
        let canEdit$ = this.authService.me().pipe(
        //map((user) => user.isAdmin)
            map((user) => !!user)
        );

        let previewMode$ = this.previewMode$$.asObservable();

        this.canEdit$ = combineLatest(
            canEdit$, 
            previewMode$,
            (canEdit, previewMode) => canEdit && !previewMode
        );
    
        this.togglePreviewModeSignal.add( (previewMode:any) => {
            this.previewMode$$.next(previewMode);
        } );
    }

    onReady(editor) {
       if(!environment.production) {
            console.log('init inspector');
           CKEditorInspector.attach(this.dataKey, editor);
       }
    }

    ngOnDestroy() {
       if(!environment.production) {
            CKEditorInspector.detach(this.dataKey);
       }
    }

    toggleEdit() {
        this.editMode = !this.editMode;
        if(!this.editMode) {
            this.editorContentUpdatedSignal.dispatch(<any>({ dataKey : this.dataKey, content :  this.content }));
        }
    }
}
