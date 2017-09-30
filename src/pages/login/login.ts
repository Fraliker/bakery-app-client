import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';

import { SignUp } from '../sign-up/sign-up';

import { Data } from '../../providers/data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Toast} from "../../providers/toast";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  login;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public data:Data,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    public events: Events,
    public toast: Toast
  ) {
    this.login = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
      password: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.required])],
    });
    this.authService.check = true;
  }

  
  loginForm() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present(); 
    let details = { 'email': this.login.value.email , 'password': this.login.value.password };
    this.authService.auth.login('basic', details).then(() => {
    //console.log('ok i guess?');
    this.toast.errorMessage('Login Successful');
    this.data.getOrders(this.authService.user.id);
    this.authService.currentUserName = this.authService.user.details.name;
    this.authService.currentUserUsername = this.authService.user.details.username; 
    this.events.publish('login:success', true );
    this.navCtrl.pop();
    }, (err) => {
        //console.log(err.message);
        let alert = this.alertCtrl.create({
          title: 'Login Error', 
          subTitle: 'Email or Password is incorrect',
          buttons:['OK']
        });
        alert.present();
       });
       
  }

  goToSignUp(){ 
    this.navCtrl.push(SignUp);
  }

}