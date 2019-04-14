import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContactFormService {
    constructor(public http:HttpClient) {}
    sendEmail(formData) {
        return this.http.post('/contact.php', JSON.stringify(formData));
    }
}
