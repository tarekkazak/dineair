import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentReviewComponent } from './content-review.component';
import { ContentReviewService } from './content-review.service';
import { AuthService } from 'app/presentation/common/auth/auth.service';
import { ContentUpdatedSignal, ContentLoadedSignal } from './review/content-review.events';

let contentLoadedSignal = new ContentLoadedSignal();
contentLoadedSignal.memorize = true;

@NgModule({
    declarations : [ ContentReviewComponent ],
    exports : [ ContentReviewComponent ],
    providers : [ 
        AuthService,
        ContentReviewService,
        ContentUpdatedSignal,
        { provide:ContentLoadedSignal, useValue:contentLoadedSignal }
    ],
    imports : [ CommonModule ]
})
export class ContentReviewModule {}
