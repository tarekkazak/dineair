import { Component } from '@angular/core';
import { ContentLoadedSignal, ContentUpdatedSignal, ToggleReviewModeSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';
import { toggleReview } from 'app/presentation/common/utils/content.utils';
import { parseContentOr } from 'app/core/content/content.utils';

@Component({
    selector : 'app-contactinfo',
    templateUrl : './contact-info.component.html',
    styleUrls : ['./contact-info.component.scss'],
    providers : [
        EditorContentUpdatedSignal 
    ]
})
export class ContactInfoComponent {
    content:string = `<h1>
						Dine Air Catering Co. <br>
						Catering<br>
						West Island <br>
					</h1>
					<div class="mb-40">
						<p>11692 De Salaberry Blvd.</p>
						<p>Dollard-Des-Ormeaux, Montreal, Quebec</p>
					</div>
					<div class="mb-40">
						<p><a href="tel:+15145548793">+1 (514) 554 8793</a></p>
						<p><a href="tel:+15149724863">+1 (514) 972 4863</a></p>
						<p>FAX: +15146836839</p>
					</div>
					<div class="mail">
						<p><a href="mailto:info@dine-air.com">info@dine-air.com</a></p>
					</div>`;
    constructor(public contentLoadedSignal:ContentLoadedSignal, public editorContentUpdatedSignal:EditorContentUpdatedSignal, public contentUpdatedSignal:ContentUpdatedSignal, public toggleReviewModeSignal:ToggleReviewModeSignal ) {}

    content$:any;

    ngOnInit() {
        this.content$ = toggleReview(
            this.toggleReviewModeSignal,
            this.contentLoadedSignal,
            (data:any) => parseContentOr(this.content, 'contact', data)
        );

        this.editorContentUpdatedSignal.add( (payload:any) => {
            this.contentUpdatedSignal.dispatch( <any>({ [payload.dataKey] : { content : payload.content } } ))
        });
    }
}
