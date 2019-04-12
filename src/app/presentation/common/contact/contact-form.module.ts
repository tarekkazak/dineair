import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';
import { ContactInfoModule } from './contact-info.module';
import { ContactFormService } from './contact-form.service';

@NgModule({
    declarations : [ ContactFormComponent ],
    exports : [ ContactFormComponent ],
    imports : [
        CommonModule,
        FormsModule,
        ContactInfoModule
        ],
        providers : [ ContactFormService ]
})
export class ContactFormModule {}
