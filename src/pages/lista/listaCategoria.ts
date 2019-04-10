import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetalheFilmePage } from '../detalhesFilme/detalhesFilme';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { MenssagemProvider } from '../../providers/mensagem/mensagem';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'lista-categoria-page',
  templateUrl: 'listaCategoria.html'
})
export class listaCategoriaPage {
  private item: any;
  private generoLista: any;
  private showMedia: boolean = false;
  public list_filmes: any = [];
  public list_filmes2: any = [];
  public subGrupos: any = [];
  public nomeSubgrupo: any;

  public listaFilmes: any = [];
  public contador: number = 0;
  public cont: number = 1;
  public fimLista: boolean = true;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public filmesProvider:FilmesProvider
  ) {

    console.log(navParams.data.lista);
    this.nomeSubgrupo = navParams.data.lista;
    this.storageProvider.buscarLista(navParams.data.lista).then(
      data => {
        console.log(data)
        this.list_filmes = data;
        this.list_filmes2 = data;
        this.iniciarLista();
      },
      error => {
        console.log(error)
      }
    );

  }


  iniciarLista() {
    // if (this.list_filmes.length <= 20) {
    //   for (let i = 0; i < this.list_filmes.length; i++) {
    //     this.listaFilmes.push(this.list_filmes[i]);
    //     this.contador++;
    //   }
    //   this.fimLista = false;
    // } else {
    //   for (let i = 0; i < 20; i++) {
    //     this.listaFilmes.push(this.list_filmes[i]);
    //     this.contador++;
    //   }
    //   this.fimLista = true;
    //   // console.log(this.list_filmes.length / 7)
    // }
    for (let i = 0; i < this.list_filmes.length; i++) {
      this.listaFilmes.push(this.list_filmes[i]);
      this.contador++;
    }
    console.log( this.listaFilmes)
  }

  myHeaderFn(record, recordIndex, records) {
    console.log(record)
    if (recordIndex % 20 === 0) {
      return records[0].subgroup;
    }
    return null;
  }


  doInfinite(infiniteScroll) {

    if (this.listaFilmes.length != this.list_filmes.length) {
      for (let i = 0; i < 20; i++) {
        if (this.listaFilmes.length != this.list_filmes.length) {
        this.listaFilmes.push(this.list_filmes[this.contador]);
        this.contador++;
        this.fimLista = true;
        }
      }
    } else {
      this.fimLista = false;
      console.log("lista cheia");
    }

    infiniteScroll.complete();


  }


  // buscarListaCategoria(subGrupo){
  //   this.storageProvider.buscarLista(this.nomeSubgrupo, subGrupo).then(
  //     data => {
  //        this.list_filmes = data;
  //     }
  //   );

  // }

  openNavDetailsPage(item) {
    console.log(item)
   
    this.navCtrl.push(DetalheFilmePage, { item: item });
    // if (item.tipo == "m3u8") {
    //   this.navCtrl.push(DetalhesTvPage, { item: item });
    // }
    // else if (item.tipo == "mp4") {
    //   this.navCtrl.push(DetalheFilmePage, { item: item });
    // }
    // this.filmesProvider.setHistory(item).then(data => { console.log(data) });
  }


  getItems(ev: any) {

    const val = ev.target.value;

    if (val && val.trim() != '') {
      let listaAux = this.list_filmes2;
      this.list_filmes = listaAux.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.list_filmes = this.list_filmes2;
    }
  }

  selecSubCat(i) {
    console.log(i)
  }
  // getSubgropos() {

  //   // let acao = [];
  //   // let comedia = [];
  //   // let infantil = [];
  //   // let dramaRomace = [];
  //   // let terrorSuspense = [];
  //   // let diversos = [];

  //   // let resto = [];

  //   // acao = this.list_filmes.filter(data => data.subgroup === 'ACAO');


  //   // var original = this.list_filmes;
  //   // var reduced = [];
  //   // var duplicado = [];
  //   // var grupos = [];

  //   // original.forEach((item) => {
  //   //   var duplicated = reduced.findIndex(redItem => {
  //   //     return item.subgroup == redItem.subgroup;
  //   //   }) > -1;

  //   //   if (!duplicated) {
  //   //     duplicado.push(item);
  //   //   }else{
  //   //     duplicado.push(item)
  //   //   }
  //   // });

  //   // console.log(JSON.stringify(reduced));
  //   // console.log(duplicado[0].subgroup);

  //   let atual;
  //   for (let i in this.list_filmes) {
  //     if (this.list_filmes[i].subgroup != atual) {
  //       this.grupos.push(this.list_filmes[i].subgroup);
  //       atual = this.list_filmes[i].subgroup;
  //     }
  //   }
  //   console.log(this.grupos)
  // }
}
