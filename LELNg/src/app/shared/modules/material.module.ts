import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatGridListModule,
        MatFormFieldModule,MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule],
    exports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatGridListModule,
        MatFormFieldModule,MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule]
})

export class MaterialModule { }
