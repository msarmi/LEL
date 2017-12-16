import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LelProjectsService } from './services/lel-projects/lel-projects.service';

@NgModule({
    imports: [CommonModule],
    providers: [LelProjectsService]
})

export class SharedModule { }
