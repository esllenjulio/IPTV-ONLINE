import { LoginPage } from './../pages/login/login';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { VgStreamingModule } from 'videogular2/streaming';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PrincipalPage } from '../pages/principal/principal';
import { FilmesProvider } from '../providers/filmes/filmes';
import { SlidesPage } from '../pages/slides/slides';
import { listaCategoriaPage } from '../pages/lista/listaCategoria';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { MenssagemProvider } from '../providers/mensagem/mensagem';
import { DetalheFilmePage } from '../pages/detalhesFilme/detalhesFilme';
import { StorageProvider } from '../providers/storage/storage';
import { StreamingMedia } from '@ionic-native/streaming-media';



@NgModule({
  declarations: [
    MyApp,
    listaCategoriaPage,
    ListPage,
    DetalheFilmePage,
    PrincipalPage,
    SlidesPage,
    LoginPage,
    CadastroPage
  ],
  imports: [
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    HttpClientJsonpModule ,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    listaCategoriaPage,
    ListPage,
    DetalheFilmePage,
    PrincipalPage,
    SlidesPage,
    LoginPage,
    CadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FilmesProvider,
    StreamingMedia,
    MenssagemProvider,
    StorageProvider,
    PrincipalPage
  ]
})
export class AppModule {}
