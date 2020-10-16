import { Component } from '@angular/core';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product-listing-app';

  constructor(config: NgbTypeaheadConfig) {
    config.showHint = true;
  }
}
