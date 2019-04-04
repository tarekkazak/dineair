import { Component } from '@angular/core';
import { ContentLoadedSignal, ContentUpdatedSignal, ToggleReviewModeSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';
import { parseContentOr } from 'app/core/content/content.utils';
import { toggleReview } from 'app/presentation/common/utils/content.utils';

@Component({
    selector : 'app-quotes',
    templateUrl : './quotes.component.html',
    styleUrls : ['./quotes.component.scss'],
    providers : [
        EditorContentUpdatedSignal 
    ]
})
export class QuotesComponent {
    content:String = `<h1>
						Chef’s <br>
						Quotes
					</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Quotes
					</p>`;

    constructor(public contentLoadedSignal:ContentLoadedSignal, public editorContentUpdatedSignal:EditorContentUpdatedSignal, public contentUpdatedSignal:ContentUpdatedSignal, public toggleReviewModeSignal:ToggleReviewModeSignal) {}

    content$:any;

    ngOnInit() {
        
        this.content$ = toggleReview(
            this.toggleReviewModeSignal,
            this.contentLoadedSignal,
            (data:any) => parseContentOr(this.content, 'quotes', data)
        );

        this.editorContentUpdatedSignal.add( (payload:any) => {
            this.contentUpdatedSignal.dispatch( <any>({ [payload.dataKey] : { content : payload.content } } ))
        });
    }
}
