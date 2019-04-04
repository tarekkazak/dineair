import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { NavModule } from '../nav/nav.module';

@NgModule({
    declarations : [ HeaderComponent ],
    exports : [ HeaderComponent ],
    imports : [ NavModule ]
})
export class HeaderModule {}
