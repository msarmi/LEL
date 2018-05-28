import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LelProjectsService } from './services/lel-projects/lel-projects.service';
import { KeysPipe } from './pipes/KeysPipe';
import { SymbolsService } from './services/symbols/symbols.service';
import { AuthenticationService } from './services/authentication/authentication.service';

@NgModule({
    imports: [CommonModule],
    providers: [LelProjectsService, SymbolsService, AuthenticationService],
    declarations: [KeysPipe],
    exports: [KeysPipe]
})

export class SharedModule { }
