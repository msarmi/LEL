import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { MatGridListModule, MatListModule , MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatGridListModule,
        MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatListModule, MatProgressSpinnerModule,
        MatSelectModule],
    exports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatGridListModule,
        MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatListModule, MatProgressSpinnerModule,
        MatSelectModule]
})

export class MaterialModule { }
