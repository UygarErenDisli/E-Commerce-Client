import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './layout/components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, LayoutModule, ComponentsModule, RouterModule],
  exports: [LayoutComponent],
})
export class AdminModule {}
