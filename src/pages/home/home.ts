import { Component } from '@angular/core';
import { ViewController,PopoverController, NavController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

//pages
import { ProductDetails } from '../product-details/product-details';
import { Cart } from '../../popovers/cart';


//providers
import {Data} from "../../providers/data";
import {Helpers} from "../../providers/helpers";
import {NoInternet} from "../no-internet/no-internet";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import {CartProvider} from "../../providers/cart-provider";

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  nothing:boolean = false;
  searchTerm:string = '';
  filtredProducts = [];
  //products = [];
  
  constructor(
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public data: Data,
    public helpers: Helpers,
    public network: Network,
    public authServcie: AuthServiceProvider,
    public cartProvider: CartProvider,
    public loadingCtrl: LoadingController
    ) {
    //   let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    //   });
    //   loading.present();
    //   this.data.getProducts()
    //   .then(prods => {
    //   this.products = prods;
    // });
    // if(this.authServcie.auth.isAuthenticated()) {
    //   this.data.getOrders(this.authServcie.user.id)
    //   .then(orders => {
    //     //console.log(orders);
    //   });
    //}
      //loading.dismiss();
  }

  ionViewDidEnter(){
    this.network.onDisconnect().subscribe(() => {
      this.navCtrl.push(NoInternet);
      },
      error => {
        console.log("No Internet");
    });
    this.data.getProducts();
  //  let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //     });
  //     loading.present();
  //     this.data.getProducts()
  //     .then(prods => {
  //     this.products = prods;
  //   });
  //   loading.dismiss();
  }

  cartPopover(cartEvent){
    let popover = this.popoverCtrl.create(Cart);
    popover.present({
      ev: cartEvent
    });
    // if(!this.cartProvider.prodsInCart.length) {
    //     setTimeout(function () {
    //     popover.dismiss();
    //   }, 1500);
    // }
  }

  goToProductDetails(product){
    if(!(product.productQuantity == 0)) {
      this.navCtrl.push(
      ProductDetails,{
        product : product
      });
    }
  }

  setFiltredProducts() {
      this.filtredProducts = this.searchTerm ? this.helpers.filterProducts(this.searchTerm, this.data.products) : [];
      this.nothing = this.helpers.filterProducts(this.searchTerm, this.data.products).length ? false : true;
  }

  clearFiltredProducts(){
    this.filtredProducts = [];
  }

}
