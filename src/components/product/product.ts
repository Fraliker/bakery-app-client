import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductDetails } from '../../pages/product-details/product-details';
import {Data} from "../../providers/data";

@Component({
  selector: 'product',
  templateUrl: 'product.html'
})
export class Product {
  @Input() product;
  constructor(public navCtrl:NavController, public data: Data,) {
    console.log('Hello Product Component');
  }

  goToProductDetails(p){
      this.navCtrl.push(ProductDetails, {
          'product' : p
      });
  }

}
