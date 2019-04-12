import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ContentReviewService {
    constructor(private http : HttpClient) {}

    updateContent(content) {
        return this.http.post('/api/content', content).pipe(
            catchError(() => of('Error')),
            map(() => 'Changes saved')
        );
    }

    getContent():Observable<any> {
        return this.http.get('/api/content');
    }
}
