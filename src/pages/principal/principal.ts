
import { Component, OnChanges, HostListener, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { listaCategoriaPage } from '../lista/listaCategoria';
import { MenssagemProvider } from '../../providers/mensagem/mensagem';
import { DetalheFilmePage } from '../detalhesFilme/detalhesFilme';
import { Content} from 'ionic-angular';


/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage implements OnChanges {

  @ViewChild(Content) content: Content;
  valorScroll:any = 0;
  inicio:any = 0;
  fim:any = 5;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, public filmesProvider: FilmesProvider
  ) { }


  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ionViewDidLoad() {
    this.filmesProvider.verificarListaAtivasStorage();
  }


  logScrollStart() {
    console.debug("Scroll Event1");
  }

  onPageScroll(event) {
    console.debug(event);
  }

  logScrollEnd() {
    console.debug("Scroll Event end");
  }

  
  ngAfterViewInit() {
    this.content.ionScroll.subscribe((event)=>{
      // console.log('scrolling ', event);
      // this.valorScroll = event.scrollTop;

      // if(this.valorScroll < event.scrollTop){
      //   this.inicio++;
      //   this.fim++;
      //   this.valorScroll = event.scrollTop;
      //   console.log(this.valorScroll)
      // }
      // else{
      //   this.inicio--;
      //   this.fim--;
      //   this.valorScroll = event.scrollTop;
      //   console.log(this.valorScroll)
      // }
    });
  }

  // doInfinite(infiniteScroll) {
  //   console.log(infiniteScroll)
   
  //   if (this.filmesProvider.listaFilmes.length != this.filmesProvider.list_filmes.length) {

  //     this.filmesProvider.listaFilmes.push(this.filmesProvider.list_filmes[this.filmesProvider.contador]);
  //     this.filmesProvider.contador++;
  //     this.filmesProvider.fimLista = true;
  //   } else {
  //     this.filmesProvider.fimLista = false;
  //     console.log("lista cheia");
  //   }

  //   infiniteScroll.complete();


  // }


  
  myHeaderFn(record, recordIndex, records) {
    console.log(record)
    if (recordIndex % 20 === 0) {
      return records[0].subgroup;
    }
    return null;
  }

  // metodos pertecentes ao componete

  abrirListaCompleta(group) {
    console.log(group)
    this.navCtrl.push(listaCategoriaPage, { lista: group });
  }


  abrirFilme(filme) {
    console.log(filme)
    this.navCtrl.push(DetalheFilmePage, { item: filme });
  }






}
