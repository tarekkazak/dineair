import { Component } from '@angular/core';
import { ContentLoadedSignal, ContentUpdatedSignal, ToggleReviewModeSignal } from 'app/presentation/content/review/content-review.events';
import { EditorContentUpdatedSignal } from 'app/presentation/common/editor/editor.events';
import { toggleReview } from 'app/presentation/common/utils/content.utils';
import { parseContentOr } from 'app/core/content/content.utils';

@Component({
    selector : 'app-minimenu',
    templateUrl : './mini-menu.component.html',
    styleUrls : ['./mini-menu.component.scss'],
    providers : [
        EditorContentUpdatedSignal 
    ]
})
export class MiniMenuComponent {
    content:string = `<div class="single-menu">
						<h3>BREAKFAST COLD SELECTIONS</h3>
						<ul class="list">
							<li>
								<p class="menu-item">Breakfast Bread Basket</p>
								<p>Assortment of Croissant, Mini-Danish, Chocolatine
                                                                and Banana Bread</p>
							</li>
							<li>
								<p class="menu-item">Montreal Continental</p>
								<p>Fresh Bagel, Cream Cheese, Chocolatine, Croissant,
                                                                Mini-Danish, Fruit Yogurt, Fresh Fruit Cocktail, Butter
                                                                and Jam and Fresh Squeezed Orange Juice
                                                                </p>
							</li>
							<li>
								<p class="menu-item">...</p>
							</li>
						</ul>
					</div>
					<div class="single-menu">
						<h3>LUNCH PLATTERS</h3>
						<ul class="list">
							<li>
								<p class="menu-item">DINE-AIR CRUDITÉ PLATTER</p>
								<p>Seasonal Variety of Vegetables with Your Choice
                                                                of Dip</p>
							</li>
							<li>
								<p class="menu-item">OUR FAMOUS SEAFOOD PLATTER</p>
								<p>6 oz. Lobster Tail, Smoked Salmon, Lobster Salad,
                                                                Marinated Scallops, Jumbo Shrimp with Cocktail
                                                                Sauce on a Bed of Fresh Greens, Complimented
                                                                with Lemon & Garnish</p>
							</li>
							<li>
								<p class="menu-item">...</p>
							</li>
						</ul>
					</div>`;
    constructor(public contentLoadedSignal:ContentLoadedSignal, public editorContentUpdatedSignal:EditorContentUpdatedSignal, public contentUpdatedSignal:ContentUpdatedSignal, public toggleReviewModeSignal:ToggleReviewModeSignal) {}

    content$:any;

    ngOnInit() {
        this.content$ = toggleReview(
            this.toggleReviewModeSignal,
            this.contentLoadedSignal,
            (data:any) => parseContentOr(this.content, 'miniMenu', data)
        );

        this.editorContentUpdatedSignal.add( (payload:any) => {
            this.contentUpdatedSignal.dispatch( <any>({ [payload.dataKey] : { content : payload.content } } ))
        });
    }
}
