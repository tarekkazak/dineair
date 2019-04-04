import { fromSignal } from 'app/presentation/common/utils/obervable.utils';
import { map, switchMap } from 'rxjs/operators';
import * as R from 'ramda';
import { of, merge } from 'rxjs';

export const toggleReview = (toggleReviewModeSignal, contentLoadedSignal, mapPredicate) => {
    let reviewMode$ = fromSignal(toggleReviewModeSignal).pipe(
        map((reviewModePayload) => of(R.prop('diffedContent', reviewModePayload)))
    );
    return  merge(
        fromSignal(contentLoadedSignal),
        reviewMode$
    ).pipe(
        switchMap(R.identity),
        map( mapPredicate )
    );
};
