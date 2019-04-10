import { LoadingController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../storage/storage';



// import { Jsonp } from '@angular/http';
/*
  Generated class for the FilmesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilmesProvider {


  // Variaveis publicas usadas em todos os componentes

  public listaFilmes?: any = [];
  public list_filmes?: any = [];
  public listaBaixadas?: any = [];
  public listaFilmesVisitado?: any = [];
  public limit: any = 5;
  public contador: number = 0;
  public fimLista: boolean = true;


  // Lista atual


  idUsuario: number;

  public listaFavoritos: any = [];

  constructor(public storage: Storage, public storageProvider: StorageProvider) {
  }


  public verificarListaAtivasStorage() {


    // METODO USADO PARA VERIFICAR SE JÁ EXISTE ALGUMA LISTA BAIXADA DO SERVIDOR, SALVA NO LOCALSTORAGE
    this.storageProvider.verificarListaAtivas().then(
      data => {

        if (!data) {
          // console.log("baixar lista ");
          // METODO PARA BAIXAR A CASO NÃO TENHA ELE BAIXA E SALVO NO LOCALSTORAGE
          this.storageProvider.buscarListaIptvApi().then(
            data => {
              if (data) {
                this.iniciarApp();
              } else {
                console.log(data)

              }
            }
          );

        } else {
          // console.log("lista baixada5");
          this.iniciarApp();
        }
      }
    );
  }


  // Metodo para iniciar e  tela principal
  public iniciarApp() {

    // this.storageProvider.verificarListaAtivas();
    this.storageProvider.verifyStorage().then(
      data => {
        if (data) {
          this.filtrarFilmes();
          this.buscarFilmesAssistidos();
        } else {
          console.log(data);

        }
      }
    );


  }



  // metodo usado para filtrar a lista de filmes
  public filtrarFilmes() {
    this.list_filmes = [];
    this.storageProvider.getListaGrupos('listaCompleta')
      .then(
        (data) => {
          this.list_filmes = data;
          // this.listaFilmes.reverse();
          // this.limit = this.buscarSeries();
          this.iniciarLista();
          console.log(data)
          // console.log(this.listaFilmes)
        }
      );
  }


  // metodo usado para buscar os filmes assistidos 

  public buscarFilmesAssistidos() {
    this.storageProvider.getListaVisited().then(
      data => {
        this.listaFilmesVisitado = data;
        // console.log(data)
      }
    );
  }





  // metodo usado para contar e separa a quantidade de categorias 
  // e criar as lista de filmes relacionados pela mesma

  iniciarLista() {
    this.listaFilmes.length = 0;
    this.contador = 0;
// console.log(this.list_filmes)
    // if (this.list_filmes.length == 1) {
    //   for (let i = 0; i < 1; i++) {
    //     this.listaFilmes.push(this.list_filmes[i]);
    //     this.contador++;
    //   }
    // } else if (this.list_filmes.length == 2) {
    //   for (let i = 0; i < 2; i++) {
    //     this.listaFilmes.push(this.list_filmes[i]);
    //     this.contador++;
    //   }
    // }
    // else if (this.list_filmes.length == 3) {
    //   for (let i = 0; i < 3; i++) {
    //     this.listaFilmes.push(this.list_filmes[i]);
    //     this.contador++;
    //   }
    // } else if (this.list_filmes.length >= 4) {
    //   for (let i = 0; i < 4; i++) {
    //     this.listaFilmes.push(this.list_filmes[i]);
    //     this.contador++;
    //   }
    // }

    for (let i = 0; i < this.list_filmes.length; i++) {
      this.listaFilmes.push(this.list_filmes[i]);
      this.contador++;
    }

    this.fimLista = true;
  }


  public buscarListaLocalStorage() {
    this.storageProvider.getListasSalvas().then(
      data => {
        console.log(data)
        this.listaBaixadas = data;
      }
    );
  }

  public selectItemListaBaixadas(item) {
    this.storageProvider.selecionarItemListaBaixada(item).then(
      data => {
        console.log(data)
      
        this.listaBaixadas = data;
        this.iniciarApp();
      }
    );
  }

}
