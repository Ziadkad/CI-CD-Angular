import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/ProductService/product.service";
import {Product} from "../../interfaces/product";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  add : boolean = true;
  productForm! : FormGroup;
  product! : Product ;
  submitted: boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.add = false;
        this.getProductById(params['id'])
      }
    });
    this.productForm = this.formBuilder.group(
      {
        id: 0,
        productName: [null, {
          validators: [
            Validators.required,
            Validators.minLength(5)
          ],
        }],
        price : [null,{
          validators: [
            Validators.required
          ]
        }]
      },
      {
        updateOn: 'blur',
      }
    );
  }

  getProductById(id: number): void{
    this.productService.getProductById(id).subscribe(data=>{
      this.product = data;
      this.patchFormBeforeUserRealize();
    })
  }
  patchFormBeforeUserRealize(){
    this.productForm.patchValue({
      id: this.product.id,
      productName: this.product.productName,
      price: this.product.price,
    });
  }


  onSubmit(){
    this.submitted = true;
    if(this.productForm.valid){
      if(!this.add){
        this.updateProduct(this.product.id,this.productForm.value);
      }
      else {
        this.addProduct(this.productForm.value);
      }
    }
  }

  updateProduct(id:number , product:Product):void{
    this.productService.updateProduct(id, product).subscribe(()=>this.router.navigate(['']))
  }
  addProduct(product : Product): void {
    this.productService.addProduct(product).subscribe(()=>this.router.navigate(['']));
  }
}
