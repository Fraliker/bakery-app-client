import { Injectable, Inject } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import { Transfer } from '@ionic-native/transfer';
import { LoadingController, Loading } from "ionic-angular";
import { File } from '@ionic-native/file';
import {Observable} from "rxjs";
import { EnvVariables } from '../app/environment-variables/environment-variables.token';

@Injectable()
export class Data {
  apiEndpoint: string;
  products;
  orders;
  loggedIn:boolean = false;
  date: Date;
  private loading: Loading;
  private error: string;
  
  constructor(
    public http: Http, private transfer: Transfer,
    private file: File, private loadingCtrl: LoadingController, @Inject(EnvVariables) public envVariables
    ) {
    this.http = http;
    this.apiEndpoint = envVariables.apiEndpoint;
  }
  
  getProducts(){
    //const fileTransfer: TransferObject = this.transfer.create();
    // if (this.products) {
    //   return Promise.resolve(this.products);
    // }
    this.createLoadingController();
    this.loading.present();
    return new Promise(resolve => {
      this.http.get(this.apiEndpoint + "products")
        .map(res => res.json())
        .finally(() => this.loading.dismiss())
        .catch((e) => this.handleError(e))
        .subscribe(data => {
          if(data == null) {
            this.products = [];
          }else{
            this.products = data;
            console.log("PRODUCTS --- "+this.products);
          }
          resolve(this.products);
        });
    });
  }

  getProductById(id){
    //console.log("by id from data provider " + id);
    for(let p of this.products){
      if(p.id == id)
        return p;
    }
    return null;
  }

  getOrders(userId) {
    // if (this.orders) {
    //   return Promise.resolve(this.orders);
    // }
    return new Promise(resolve => {
      this.http.get(this.apiEndpoint + "orders/" + userId)
        .map(res => res.json())
        .subscribe(data => {
          if(data == null) {
            this.orders = [];
          }
          else {
            this.orders = data;
          }
          resolve(this.orders);
        });
    });
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.error = errMsg;
    return Observable.throw(errMsg);
  }

  private createLoadingController(){
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true,
        spinner: 'crescent'
    });
  }
}
