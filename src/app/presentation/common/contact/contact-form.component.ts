import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { timer, of } from 'rxjs';
import { Component } from '@angular/core';
import { ContactFormService } from './contact-form.service';

@Component({
    selector : 'app-contact-form',
    templateUrl : './contact-form.component.html',
    styleUrls : ['./contact-form.component.scss']
})
export class ContactFormComponent {
    formModel:any = {};
    formSubmitted = false;
    formSubmittedResultClass;
    formSubmittedMessage$;

    constructor(public contactFormService:ContactFormService) {}

    submit(formData) {
        this.formSubmitted = true;
        this.formSubmittedMessage$ = this.contactFormService.sendEmail(formData.value).pipe(
            map(() => {
                this.formSubmittedResultClass ='alert-success';
                formData.reset();
                return 'Message Sent!' 
            }),
            catchError(() => {
                this.formSubmittedResultClass ='alert-danger';
                return of('Message Failure!');
            }),
            tap(() => setTimeout(() => { 
                this.formSubmitted = false; 
            }, 3000))
        );
    }
}
