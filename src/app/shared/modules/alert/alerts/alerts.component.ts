import { Component, OnInit, TemplateRef } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(public alertService: AlertService) { }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  ngOnInit() {
  }

  cssClass(alertType: string) {
    if (!alertType) {
      return;
    }

    // return css class based on alert type
    switch (alertType) {
      case 'Success':
        return 'bg-success text-light';
      case 'Error':
        return 'bg-danger text-light';
      case 'Info':
        return 'alert alert-info';
      case 'Warning':
        return 'alert alert-warning';
    }
  }

}
