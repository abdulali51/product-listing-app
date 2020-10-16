import { Component, OnInit } from '@angular/core';
import { Product } from '../shared';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  model: Product;

  constructor() {}

  ngOnInit(): void {}
}
