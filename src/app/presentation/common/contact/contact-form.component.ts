import { map, tap, catchError, delay } from 'rxjs/operators';
import { timer, concat, of } from 'rxjs';
import { Component } from '@angular/core';
import { ContactFormService } from './contact-form.service';

@Component({
    selector : 'app-contact-form',
    templateUrl : './contact-form.component.html',
    styleUrls : ['./contact-form.component.scss']
})
export class ContactFormComponent {
    formModel:any = {};
    formSubmitted;
    formSubmittedResultClass;
    formSubmittedMessage$;

    constructor(public contactFormService:ContactFormService) {}

    submit(formData) {
        console.log(formData);
        this.formSubmittedMessage$ = concat(
            this.contactFormService.sendEmail(formData.value).pipe(
                tap(() =>this.formSubmitted = true),
                delay(1000),
                map(() => {
                    this.formSubmittedResultClass ='alert-success';
                    return 'Message Sent!' 
                }),
                catchError(() => {
                    this.formSubmittedResultClass ='alert-danger';
                    return of('Message Failure!');
                })
            ),
            timer(1000).pipe(
                tap(() =>this.formSubmitted = false),
            )
        );
    }
}
