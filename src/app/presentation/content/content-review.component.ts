import { Component } from '@angular/core';
import { TogglePreviewModeSignal,ToggleReviewModeSignal, ContentUpdatedSignal, ContentLoadedSignal } from './review/content-review.events';
import { ContentReviewService } from './content-review.service';
import { tap, map, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import * as R from 'ramda';
import HtmlDiff from 'htmldiff-js';

@Component({
    selector : 'app-content-review',
    templateUrl : './content-review.component.html',
    styleUrls : ['./content-review.component.scss']
})
export class ContentReviewComponent {
    content:any = {};
    originalContent:any = {};
    allContent;
    submitBtnText$ = of('Submit Changes');
    previewMode:boolean = false;
    reviewMode:boolean = false;
    hasContentChanged:boolean = false;
    defaultContent : any = {
        sections : {
            about : { },
            menu : { },
            menuHeading : { },
            miniMenu : { },
            contact : { },
            quotes : { }
        }
    }
    
    constructor(public contentReviewService:ContentReviewService, public contentUpdatedSignal:ContentUpdatedSignal, public contentLoadedSignal:ContentLoadedSignal,public togglePreviewModeSignal:TogglePreviewModeSignal, public toggleReviewModeSignal:ToggleReviewModeSignal){}

    diffContent(previousContent, newContent) {
        let diff = R.pipe(
            R.prop('sections'),
            R.keys,
            R.reduce( (agg, key) => { 
                let getSection = R.path(['sections', key]);
                let notEqProps = R.complement(R.eqProps);
                return agg || notEqProps('content', getSection(previousContent), getSection(newContent));
            }, false )
        );
        return diff(previousContent);
    }

    ngOnInit() {
        this.contentUpdatedSignal.add((content:any) => {
            this.content.sections = {
                ...this.content.sections,
                ...content
            };
            this.hasContentChanged = this.diffContent(this.originalContent, this.content);
            console.log(this.content);
        });

        this.contentLoadedSignal.dispatch((<any>this.contentReviewService.getContent().pipe(
                tap( (data) => this.allContent = data),
                map( (data) => data.slice(-1).shift() ),
                map( R.defaultTo(this.defaultContent) ), //if there are no records
                map( (data) => {
                    return R.pipe(
                        R.prop('sections'),
                        R.dissoc('updatedAt'),
                        (sections) => ({ sections })
                    )(data)
                } ),
                tap( (data) => {
                    this.originalContent = data; 
                    this.content = R.clone(data); 
                    this.togglePreviewModeSignal.dispatch(<any>(this.previewMode));
                } )
            ))
        );
    }

    review() {
        this.reviewMode = !this.reviewMode;
        let diffedContent = R.pipe(
            R.clone,
            R.prop('sections'),
            R.mapObjIndexed( (section, key, obj) => {
                return {
                    content : HtmlDiff.execute(this.originalContent.sections[key].content, section.content)
                };
            } ),
            (sections) => ({ sections }),
            (diffedContent) => this.reviewMode ? diffedContent : this.content
        )(this.content);
        this.toggleReviewModeSignal.dispatch(<any>({ reviewMode : this.reviewMode, diffedContent }));
    }

    togglePreviewMode() {
        this.previewMode = !this.previewMode;
        this.togglePreviewModeSignal.dispatch(<any>(this.previewMode));
    }

    submit() {
        this.submitBtnText$ = this.contentReviewService.updateContent(this.content).pipe(
            delay(1000),
            map(() => 'Submit Changes')
        );
    }
}
