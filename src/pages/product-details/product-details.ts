import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams } from 'ionic-angular';

//pages
import { Cart } from '../../popovers/cart';

//providers
import { CartProvider } from '../../providers/cart-provider';
import {Data} from "../../providers/data";
import {Toast} from "../../providers/toast";


@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {
  product;
  qty:number = 1;
  currentProductPrice: number;
 
  upQty(){
    if(this.product.productQuantity > this.qty) {
    this.qty += 1;
    this.currentProductPrice += this.product.productPrice;
  }
    else {
    let err = 'Only ' + this.product.productQuantity + ' left in Stock';
    this.toast.errorMessage(err);
    }
  }
  
  downQty(){
    if(this.qty > 1) {
      this.currentProductPrice -= this.product.productPrice;
      this.qty -= 1;
    }
  }

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public popoverCtrl: PopoverController,
      public cartProvider: CartProvider,
      public data: Data,
      public toast: Toast
  ) {
    this.product = this.navParams.get('product');
    this.currentProductPrice = (this.product.productPrice)*(this.qty);
  }

  addToCart(id, qty){
    this.navCtrl.pop();
    this.cartProvider.addItem(id, qty);
    //console.log(this.cartProvider.prodsInCart);
  }

  cartPopover(cartEvent){
    let popover = this.popoverCtrl.create(Cart);
    popover.present({
      ev: cartEvent
    });
    if(!this.cartProvider.prodsInCart.length) {
      setTimeout(function () {
        popover.dismiss();
      }, 1500);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails');
  }

}
