import {Injectable} from '@angular/core';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class Loading {
    loading;
  constructor(public loadingCtrl: LoadingController) {
  }

  loadingPresent() {
      this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  loadingDismiss() {
      this.loading.dismiss();
  }
  
}