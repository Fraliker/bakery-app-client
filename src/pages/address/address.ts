import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Login } from '../login/login';
import { CartProvider } from '../../providers/cart-provider';
import {Toast} from "../../providers/toast";
import { ChangeAddressPage } from '../change-address/change-address';
import {Data} from "../../providers/data";


@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
addr1: string;
addr2: string;
city: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService: AuthServiceProvider,
              public cartProvider: CartProvider,
              public data: Data,
              public toast: Toast,
              public loadingCtrl: LoadingController,
              public viewctrl: ViewController
              ) {
                this.addr1 = this.authService.user.get('addr1','');
                this.addr2 = this.authService.user.get('addr2','');
                this.city = this.authService.user.get('city','');
                if(!this.authService.auth.isAuthenticated()) {
                  this.toast.presentLoading();
                  this.navCtrl.push(Login);
                }
                this.authService.check = false;
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

  ionViewWillEnter() {
    this.addr1 = this.authService.user.get('addr1','');
    this.addr2 = this.authService.user.get('addr2','');
    this.city = this.authService.user.get('city','');

    if(!this.authService.auth.isAuthenticated() && this.authService.check) {
      let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
      this.authService.check = false;
      this.navCtrl.pop();
    }
  } 

  changeAddress() {
    this.navCtrl.push(ChangeAddressPage);
  }

  onCartClick() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1500);
    if(this.authService.auth.isAuthenticated()) {
      this.cartProvider.saveOrder().subscribe( data => {
        this.orderSuccess(data);
      },
      error => {
        this.orderError(error);
      });
    }else {
    this.toast.errorMessage('Please login to confirm');
    }
    
  }

  orderSuccess(data: any) {
    console.log(data);
    if(!this.data.orders) {
      this.data.orders = [];
    }
    this.data.orders.push(data);
    this.toast.orderConfirmed();
    this.cartProvider.emptyObject();
    this.navCtrl.popAll();
  }

  orderError(err: any) {
    this.toast.errorMessage('Some of the products in your cart went out of stock. Please try again!');
    this.data.products = err;
    this.navCtrl.popAll();
  }

  goToSignUp() {
    console.log('SignUp Page..');
  }

}
