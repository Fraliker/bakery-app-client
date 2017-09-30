import { ToastController, LoadingController } from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class Toast {
  loading;
  constructor(public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
  }

  productAdded() {
    let toast = this.toastCtrl.create({
      message: 'Product added to Cart',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  productPresent() {
    let toast = this.toastCtrl.create({
      message: 'Product already in Cart',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  orderConfirmed() {
    let toast = this.toastCtrl.create({
      message: 'Order Confirmed',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  errorMessage(err: string) {
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }


}
