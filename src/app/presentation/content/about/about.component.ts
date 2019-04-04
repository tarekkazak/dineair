import { Component } from '@angular/core';
import { ContentLoadedSignal, ContentUpdatedSignal, ToggleReviewModeSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';
import { parseContentOr } from 'app/core/content/content.utils';
import { toggleReview } from 'app/presentation/common/utils/content.utils';

@Component({
    selector : 'app-about',
    templateUrl : './about.component.html',
    styleUrls : ['./about.component.scss'],
    providers : [
        EditorContentUpdatedSignal 
    ]
})
export class AboutComponent {
    content:String = ` <h1>
						About <br>
						Dine-Air Catering Co. <br>
					</h1>
					<p>
                                        Dine-Air Catering Co., an executive V.I.P. catering service specializing in in-flight food hospitality, has serviced a variety of high profile clients ranging from royalty and celebrities to sports franchises and CEOs.
					</p>
                                        <p>
                                        We provide the highest quality and service for discerning palates!
                                        </p>
					<h1>
						Services <br>
						Dine-Air Catering Co. <br>
					</h1>
                                        <hr />
                                        <h3>PRESENTATION</h3>
					<p>
                                        All dishes are presented in an elegant manner. We also cater to any customized presentation.
					</p>
                                        <hr />
                                        <h3>CUSTOMIZED MENUS</h3>
					<p>
                                        Whether you have specific dietary requirements or simply wish to have something tailored to your taste, we pride ourselves on making all things possible for our clients.
					</p>
                                        <hr />
                                        <h3>PERSONALIZED SERVICE</h3>
					<p>
                                        Our head chef is available 24/7, 365 days a year to guarantee that your experience with Dine-Air meets all expectations.
					</p>
    `;

    constructor(public contentLoadedSignal:ContentLoadedSignal, public editorContentUpdatedSignal:EditorContentUpdatedSignal, public contentUpdatedSignal:ContentUpdatedSignal, public toggleReviewModeSignal:ToggleReviewModeSignal) {}

    content$:any;

    ngOnInit() {
        this.content$ = toggleReview(
            this.toggleReviewModeSignal,
            this.contentLoadedSignal,
            (data:any) => parseContentOr(this.content, 'about', data)
        );

        this.editorContentUpdatedSignal.add( (payload:any) => {
            this.contentUpdatedSignal.dispatch( <any>({ [payload.dataKey] : { content : payload.content } } ))
        });
    }
}
