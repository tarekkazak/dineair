import { Observable } from 'rxjs';

export const fromSignal = (signal) => {
    return Observable.create( (observer) => {
        signal.add( (payload) => {
            observer.next(payload);
        } );
    });
};
