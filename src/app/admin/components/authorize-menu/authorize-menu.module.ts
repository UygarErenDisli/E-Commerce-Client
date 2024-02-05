import { AuthorizeMenuComponent } from './authorize-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogModule } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive.module';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [AuthorizeMenuComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthorizeMenuComponent,
      },
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    MatSortModule,
    DeleteDirectiveModule,
    MatToolbarModule,
  ],
})
export class AuthorizeMenuModule {}
