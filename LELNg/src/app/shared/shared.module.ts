import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LelProjectsService } from './services/lel-projects/lel-projects.service';
import { KeysPipe } from './pipes/keys-pipe';
import { DerpPipe } from './pipes/derp-pipe';
import { SymbolsService } from './services/symbols/symbols.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ThemingService } from './services/theming/theming.service';

@NgModule({
    imports: [CommonModule],
    providers: [LelProjectsService, SymbolsService, AuthenticationService, ThemingService],
    declarations: [KeysPipe, DerpPipe],
    exports: [KeysPipe, DerpPipe]
})

export class SharedModule { }
