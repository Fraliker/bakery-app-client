import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { Data } from '../../providers/data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Toast } from "../../providers/toast";




@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {
  signUpError;
  signUp;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public data: Data,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public toast: Toast,
    public events: Events
    ) {
      this.signUp = this.formBuilder.group({
        fullName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
        phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('[7-9]{1}[0-9]{9}')])],
        addr1: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
        addr2: [''],
        city: ['', Validators.compose([Validators.required])],
        postalCode: [''],
        username: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.required])]
      });
  }

  signUpForm() {
    this.signUpError = '';
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
   let details: UserDetails = { 'name': this.signUp.value.fullName, 
                                'email': this.signUp.value.email, 
                                'username': this.signUp.value.username, 
                                'password': this.signUp.value.password
                              };
    this.authService.auth.signup(details).then(() => {
    //console.log('ok signup.. ');    
    this.authService.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
    //console.log('ok login.. ');    
    this.authService.setDetails(this.signUp.value);
    this.data.orders = [];
    this.toast.errorMessage('SignUp Successful');
    this.authService.currentUserName = this.authService.user.details.name;
    this.authService.currentUserUsername = this.authService.user.details.username; 
    this.events.publish('login:success', true );
    this.navCtrl.pop();
    this.navCtrl.pop();
    loading.dismiss();
        });
    }, (err:IDetailedError<string[]>) => {
         //console.log('Error in signup..');
         for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') this.signUpError += 'Email is required.';
          if(e === 'required_password') this.signUpError += 'Password is required.';
          if(e === 'conflict_email') this.signUpError += 'A user with this email already exists.';
          if(e === 'conflict_username') this.signUpError += 'Username already exists.';
          if(e === 'invalid_email') this.signUpError += 'Your email address isn\'t valid.';
         }
        loading.dismiss();
        this.toast.errorMessage(this.signUpError);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUp');
  }

}
