import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Data} from "../../providers/data";

/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public data: Data) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad About');
  }

}
