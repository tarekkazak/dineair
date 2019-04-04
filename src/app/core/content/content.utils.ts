import * as R from 'ramda';
export const parseContentOr = (defaultContent, contentKey, content) => R.pathOr(defaultContent, ['sections', contentKey, 'content'], content);
