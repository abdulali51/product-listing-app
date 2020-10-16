import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUri = 'http://localhost:4000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create product
  createProduct(data: object): Observable<any> {
    const url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Get all products
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUri}/products`);
  }

  // Update product
  updateProduct(id, data): Observable<any> {
    const url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    );
  }

  // Transforming product response
  transformRes(obj) {
    const res = JSON.parse(JSON.stringify(obj));
    const transformedObj = res.map((object) => {
      const {_id, pname, costPrice, sellPrice, quantity, pid} = object;
      return {_id, pname, costPrice, sellPrice, quantity, pid};
    });
    return transformedObj;
  }

  // Error handling
  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
