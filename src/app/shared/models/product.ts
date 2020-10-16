import { NgIf } from '@angular/common';

export interface Product {
  pid?: number;
  pname: string;
  costPrice: number;
  sellPrice: number;
  quantity: number;
}
