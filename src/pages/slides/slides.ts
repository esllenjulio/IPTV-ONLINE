import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Slides } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';



@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class SlidesPage {

  @ViewChild(Nav) nav: Nav;
  @ViewChild('slides') slides: Slides;

  x: number = 0;
  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public app: App, private http:HttpClient) {
    this.storage.get('slides').then((val) => {
      if (val || val != null) {
        this.sairSlides();
      }
    });
   }

  ionViewDidLoad() {
    
  }

  sairSlides() {
    this.app.getRootNav().setRoot(PrincipalPage);
    this.storage.set('slides', true);
  }

  next() {
    this.slides.slideNext();
    this.slides.roundLengths = true
  }

  prev() {
    this.slides.slidePrev();
    this.slides.roundLengths = false
  }

  sliders = [
    {
      title: "Seja bem-vindo!",
      description: "O <b>Mais HDtv </b> é um aplicativo de <b>TV</b> e <b>Filmes</b> que utiliza recursos como <b>IPTV</b> compartilhado na internet, Antes de mais nada, da uma olhada nas instruções a seguir de como usar seu aplicativo de forma correta!",
      image: "assets/imgs/slider1.png",
    },
    {
      title: "Dica 1",
      description: "Para ter uma ótima qualidade nos videos, sugerimos que utilize uma conexão de pelos menos <b>5 MB</b> ",
      image: "assets/imgs/speed.png",
    },
    {
      title: "Dica 2",
      description: "Evite usar o <b>3G</b> ou <b>4G</b> do seu celular, isso pode consumir seus <b>dados móveis</b>.",
      image: "assets/imgs/dadosMoveis.png",
    },
    {
      title: "Dica 3",
      description: "Use sempre conectado pelo <b>WIFI</b> ",
      image: "assets/imgs/wifi.png",
    }
  ];

}
