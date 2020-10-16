import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Product, ProductService } from '../shared';
import { AlertService } from '../shared/modules/alert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Array<Product> = [];
  model: Product;

  constructor(
    private productService: ProductService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.products = JSON.parse(JSON.stringify(res));
      },
      err => {
        console.log(err);
        this.alertService.show(err, { type: 'Error', autohide: false });
      }
    );
  }

  formatter = (product: Product) => product.pname;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => term.length < 2 ? [] : this.products.filter((product) => new RegExp(term, 'mi').test(product.pname)).slice(0, 10))
    )

  updateEventHandler($event: Product) {
    this.model = $event;
    this.getAllProducts();
  }
}
