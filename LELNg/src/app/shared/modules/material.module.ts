import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { MatGridListModule, MatListModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
    imports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatGridListModule,
        MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatListModule, MatProgressSpinnerModule,
        MatSelectModule, MatDialogModule, MatChipsModule, MatExpansionModule, MatAutocompleteModule, MatTooltipModule, MatBadgeModule,
        MatButtonToggleModule, MatTreeModule],
    exports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatGridListModule,
        MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatListModule, MatProgressSpinnerModule,
        MatSelectModule, MatDialogModule, MatChipsModule, MatExpansionModule, MatAutocompleteModule, MatTooltipModule, MatBadgeModule,
        MatButtonToggleModule, MatTreeModule]
})

export class MaterialModule { }
