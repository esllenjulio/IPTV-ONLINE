import { LoadingController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';




@Injectable()
export class MenssagemProvider {

  public loader: any;

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde por favor...",
      duration: 100000
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }


  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Falha ao baixar',
      subTitle: 'Desculpe, servidor pode está fora do ar no momento! Tente novamente mais tarde...',
      buttons: ['OK']
    });
    alert.present();
  }


}