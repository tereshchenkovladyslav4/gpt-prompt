import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SharedModule } from '@shared';
import { TemplateDialogComponent } from './components/template-dialog/template-dialog.component';

@NgModule({
  declarations: [TemplateComponent, ListComponent, DetailComponent, TemplateDialogComponent],
  imports: [CommonModule, TemplateRoutingModule, SharedModule],
})
export class TemplateModule {}
