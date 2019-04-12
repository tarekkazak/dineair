import { Component } from '@angular/core';
import { TogglePreviewModeSignal,ToggleReviewModeSignal, ContentUpdatedSignal, ContentLoadedSignal } from './review/content-review.events';
import { ContentReviewService } from './content-review.service';
import { tap, map, mapTo } from 'rxjs/operators';
import { of, timer, merge, concat } from 'rxjs';
import * as R from 'ramda';
import HtmlDiff from 'htmldiff-js';
import { AuthService } from 'app/presentation/common/auth/auth.service';

@Component({
    selector : 'app-content-review',
    templateUrl : './content-review.component.html',
    styleUrls : ['./content-review.component.scss']
})
export class ContentReviewComponent {
    content:any = {};
    originalContent:any = {};
    allContent;
    isLoading = false;
    submitIcon$ = of('fa-save');
    isLoggedIn$:any;
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
    
    constructor(public authService:AuthService, public contentReviewService:ContentReviewService, public contentUpdatedSignal:ContentUpdatedSignal, public contentLoadedSignal:ContentLoadedSignal,public togglePreviewModeSignal:TogglePreviewModeSignal, public toggleReviewModeSignal:ToggleReviewModeSignal){}

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
        this.isLoggedIn$ = this.authService.me().pipe(
            map((user) => !!user)
        );

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

    toggleReviewMode() {
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
        this.hasContentChanged = false;
        this.submitIcon$ = concat(
            of('fa-spinner'),
            timer(2000).pipe(mapTo('fa-spinner')),
            this.contentReviewService.updateContent(this.content).pipe(
                tap( () => {
                    this.isLoading = true; 
                } ),
                map( () => 'fa-check-circle' )
            ),
            timer(1000).pipe(mapTo('fa-save')).pipe(
                tap( () => {
                    this.isLoading = false; 
                } ),
            )
        );
    }
}
