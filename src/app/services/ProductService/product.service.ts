import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string;
  constructor(private http:HttpClient) {
    this.apiUrl = environment.ProductApi + "/Product"
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }
  getProductById(id : number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  addProduct(product : Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl,product);
  }
  updateProduct(id : number, product : Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`,product);
  }
  deleteProduct(id : number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
