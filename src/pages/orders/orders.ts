import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Data} from "../../providers/data";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { OrderDetailsPage } from "../order-details/order-details"


/**
 * Generated class for the OrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders = [];
  loggedIn: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public data: Data,
              public authService: AuthServiceProvider
              ) {
                this.orders = this.data.orders;
                this.loggedIn = this.authService.auth.isAuthenticated();
  }

  goToDetails(order) {
    this.navCtrl.push(OrderDetailsPage, {
      order: order
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    if(this.loggedIn){
      this.data.getOrders(this.authService.user.id);
    }
  }

  ionViewDidEnter(){
    this.loggedIn = this.authService.auth.isAuthenticated();
  }

}
