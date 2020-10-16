import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { PriceValidator } from '../../validators/price-validator';
import { PatternValidator } from '../../validators/pattern-validator';
import { ProductService } from '../../services/product.service';
import { AlertService } from '../../modules/alert';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() type: string;
  @Input() product: Product;
  @Output() update = new EventEmitter<Product>();
  isNewProduct: boolean;
  productForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.isNewProduct = this.type === 'create';
    this.productForm = this.formBuilder.group({
      pid: [{ value: this.product?.pid, disabled: true }, Validators.required],
      pname: [this.product?.pname, [Validators.required, PatternValidator]],
      costPrice: [{ value: this.product?.costPrice, disabled: !this.isNewProduct }, Validators.required],
      sellPrice: [this.product?.sellPrice, [Validators.required]],
      quantity: [{ value: this.product?.quantity, disabled: !this.isNewProduct }, [Validators.required]],
    }, {
      validator: PriceValidator('sellPrice', 'costPrice')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }

    if (this.isNewProduct) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  private updateProduct() {
    const updatedProduct = Object.assign({}, this.product, this.productForm.value);
    this.productService.updateProduct(updatedProduct._id, updatedProduct).subscribe(
      res => {
        this.alertService.show('Product updated succesfully.', { type: 'Success', autohide: true });
      },
      err => {
        console.log(err);
        this.alertService.show(err, { type: 'Error', autohide: false });
      },
      () => {
        this.submitted = false;
        this.update.emit(null);
      }
    );
  }

  private createProduct() {
    this.productService.createProduct(this.productForm.value).subscribe(
      res => {
        this.alertService.show('Product created succesfully.', { type: 'Success', autohide: true });
      },
      err => {
        console.log(err);
        this.alertService.show(err, { type: 'Error', autohide: false });
      },
      () => {
        this.onReset();
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

  getButtonText() {
    return this.isNewProduct ? 'Add Product' : 'Update';
  }
}
