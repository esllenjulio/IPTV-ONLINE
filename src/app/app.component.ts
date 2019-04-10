import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { ListPage } from '../pages/list/list';
import { PrincipalPage } from '../pages/principal/principal';
import { SlidesPage } from '../pages/slides/slides';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}>;
  
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public storage: Storage) {

    this.initializeApp();
    // this.platform = platform;
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Principal', component: PrincipalPage },
      { title: 'Login', component: LoginPage },
      { title: 'Minhas Listas', component: ListPage }
    ];
    
    this.storage.get('usuario').then((val) => {
      if (val || val != null) {
        this.rootPage = PrincipalPage;
      }else{
        this.rootPage = LoginPage;
      }
    });

  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page.title);
    if(page.title=='Histórico'){
      this.nav.setRoot(page.component,{ item: 'history' });
    }
    else  if(page.title=='Favoritos'){
      this.nav.setRoot(page.component,{ item: 'favorito' });
    }
    else{
      this.nav.setRoot(page.component);
    }
      
  }


  
  sair(){
    // this.storage.remove('slides');
    this.platform.exitApp();
    // navigator['app'].exitApp();
    // window.navigator.exitApp();
  }
}
