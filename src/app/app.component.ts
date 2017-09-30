import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, NavController, Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { About } from '../pages/about/about';
import { OrdersPage } from '../pages/orders/orders';
import { Login } from '../pages/login/login'

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {Data} from "../providers/data";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
  rootPage:any = HomePage;

  loggedIn: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public authService: AuthServiceProvider,
              public events: Events,
              public data: Data
               ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if(this.authService.auth.isAuthenticated()) {
      this.loggedIn = this.authService.auth.isAuthenticated();
    } 
    this.events.subscribe('login:success', ( loggedIn ) => {
      this.loggedIn = loggedIn;      
    });
  }

  openHomePage() {
    this.nav.setRoot(HomePage);
  }

  openAboutPage() {
    this.nav.setRoot(About);
  }

  openOrderPage() {
    this.nav.setRoot(OrdersPage);
  }

  openLoginPage() {
    this.nav.push(Login);
  }

  logout() {
    this.authService.auth.logout();
    this.authService.currentUserName = '';
    this.authService.currentUserUsername = '';
    this.data.orders = null;
    this.loggedIn = false;
    this.nav.setRoot(HomePage);
  }
}

