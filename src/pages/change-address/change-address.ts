import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Validators, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-change-address',
  templateUrl: 'change-address.html',
})
export class ChangeAddressPage {
  newAddress;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public formBuilder: FormBuilder

             ) {
                this.newAddress = this.formBuilder.group({
                addr1: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
                addr2: [''],
                });
  }

  newAddressForm() {
    this.authService.changeDetails(this.newAddress.value);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeAddressPage');
  }

}