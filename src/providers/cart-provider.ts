import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { Response, Headers } from "@angular/http";
import {Product} from '../app/models/product';

//providers
import {Data} from "./data";
import {Toast} from "./toast";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { EnvVariables } from '../app/environment-variables/environment-variables.token';

export class OrderDetails {
     product: Product;
     quantityRequired: number;

     constructor(product: Product, qr: number) {
        this.quantityRequired = qr;
        this.product = product;
     }
}

export class Order {
    status: string;
    userId: string;
    orderDetails: OrderDetails[];

    constructor(userId: string, status: string, order: OrderDetails[]) {
      this.userId = userId;
      this.status = status;
      this.orderDetails = order;
    }
}


@Injectable()
export class CartProvider {
  prodsInCart = [];
  products = [];
  flag: number = 1;
  order: Order;
  orderDetails: OrderDetails;
  orderDetailsArray = [];
  
  constructor(
      public http: Http,
      public storage: Storage,
      public data: Data,
      public toast: Toast,
      public authService: AuthServiceProvider, @Inject(EnvVariables) public envVariables
  ) {
    this.http = http;
  }

  addItem(id, qty){
    //console.log(id + " " + qty + " cart provider");
    this.flag = 1;
    for(let i=0;i<this.prodsInCart.length;i++) {
      if(this.prodsInCart[i].productId == id){
        this.flag = 0;
        break;
      }
    }
    if(this.flag) {
      this.prodsInCart.push({
      productId: id,
      quantityRequired: qty
      });
      this.toast.productAdded();
    }
    else
     {
      this.toast.productPresent();
     }
  }  

  // removeItem(id){
  //   let index = -1;
  //   for(let i=0; i<this.prodsInCart.length; i++){
  //     index = this.prodsInCart.indexOf(id);
  //   }
  // }

  saveOrder() {
//    if(this.prodsInCart.length > 0){
    for(let i=0; i<this.prodsInCart.length; i++){
      this.products.push(this.data.getProductById(this.prodsInCart[i].productId));
      this.products[i].productQuantity -= this.prodsInCart[i].quantityRequired;
      this.orderDetails = new OrderDetails(this.products[i], this.prodsInCart[i].quantityRequired);
      this.orderDetailsArray.push(this.orderDetails);
    }
  //  }
    this.order = new Order(this.authService.user.id, 'Pending', this.orderDetailsArray);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(this.order);
    return this.http.post(this.data.apiEndpoint + 'checkout', body, {headers: headers} )
    .map((res: Response) =>  
        res.json() 
     ).catch((err: Response) => { 
       return Observable.throw(err.json());
     });
  }

  emptyObject(){
    this.prodsInCart = [];
    this.products = [];
    this.orderDetailsArray = [];
    this.order = new Order(this.authService.user.id, 'Pending', this.orderDetailsArray);
    this.orderDetails = new OrderDetails(null,0);

  }
}