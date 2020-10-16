import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsComponent } from './alerts/alerts.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AlertsComponent],
  imports: [CommonModule, NgbToastModule],
  exports: [AlertsComponent]
})
export class AlertModule { }
