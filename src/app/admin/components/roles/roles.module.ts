import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive.module';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';

@NgModule({
  declarations: [RolesComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RolesComponent,
      },
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    FileUploadModule,
    MatSortModule,
    DeleteDirectiveModule,
    MatToolbarModule,
  ],
})
export class RolesModule {}
