import {Component, OnInit} from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductService} from "../../services/ProductService/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products : Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts(): void {
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data
    })
  }
  deleteProduct(id: number): void {
    const confirmDelete :boolean = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      this.productService.deleteProduct(id).subscribe(()=>this.getproducts());
    }
  }
}
