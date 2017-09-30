import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { Product } from '../components/product/product';

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {NoInternet} from "../pages/no-internet/no-internet";
import { Cart } from '../popovers/cart';
import { ProductDetails } from '../pages/product-details/product-details';
import { SignUp } from '../pages/sign-up/sign-up';
import { Login } from '../pages/login/login';
import { AddressPage } from '../pages/address/address';
import { ChangeAddressPage } from '../pages/change-address/change-address';
import { OrdersPage } from '../pages/orders/orders';
import { About } from '../pages/about/about';
import { OrderDetailsPage } from '../pages/order-details/order-details';

//Providers
import { Data } from '../providers/data';
import { Helpers } from '../providers/helpers';
import { CartProvider } from '../providers/cart-provider';
import { Toast } from '../providers/toast';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { EnvironmentsModule } from '../app/environment-variables/environment-variables.module';

//Cordova plugins
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';

export function provideStorage() {
  return new Storage({
    name: 'cartStorage',
    storeName: 'items',
    driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
  });// optional config);
}

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': ''
  }
}; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NoInternet,
    Cart,
    SignUp,
    Login,
    ProductDetails,
    AddressPage,
    ChangeAddressPage,
    OrdersPage,
    Product,
    About,
    OrderDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    EnvironmentsModule,
    CloudModule.forRoot(cloudSettings),
    HttpModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NoInternet,
    SignUp,
    Login,
    AddressPage,
    ChangeAddressPage,
    OrdersPage,
    Cart,
    ProductDetails,
    About,
    OrderDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Data,
    Helpers,
    File,
    Transfer,
    CartProvider,
    Toast,
    AuthServiceProvider,
    SQLite,
    { provide: Storage, useFactory: provideStorage },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ]
})
export class AppModule {}
