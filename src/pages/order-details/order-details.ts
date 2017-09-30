import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  order;
  orderDetails;
  total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order = this.navParams.get('order');
    this.orderDetails = this.order.orderDetails;
    for(let i=0; i<this.orderDetails.length; i++) {
      this.total += ( this.orderDetails[i].product.productPrice * this.orderDetails[i].quantityRequired );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

}
