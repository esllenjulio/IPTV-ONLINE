import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FilmesProvider } from '../filmes/filmes';
import { MenssagemProvider } from '../mensagem/mensagem';
import { c } from '@angular/core/src/render3';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class StorageProvider {

  public filmes: any = [];
  public series: any = [];
  public canais: any = [];
  public subgrupos: any = [];
  public allGrupos: any = [];
  public grupos: any = [];
  public listaPrincipal: any;
  public filmesProvider: FilmesProvider;

  public baseLink: String = "https://klinmedical.websiteseguro.com/api/";

  constructor(public storage: Storage,
    public http: HttpClient,
    private menssagemProvider: MenssagemProvider) {

  }


  /* METODO  RESPONSAVeL PARA VERIFICAR SE O POSSUI OS DADOS NO LOCALSTORAGE, 
    CASO POSSUA O MESMA IRÁ BUSCAR A LISTA NA API E RETORNARÁ TRUE 
    CASO DE ERRO RETORNARÁ FALSE*/



  // METODO USADO PARA VERIFICAR SE JÁ EXISTE ALGUMA LISTA BAIXADA DO SERVIDOR, SALVA NO LOCALSTORAGE
  public verificarListaAtivas(): any {
    return new Promise((resolve, reject) => {
      this.storage.get('listasBaixadas')
        .then(
          data => {
            if (data || data != null) {
              resolve(data);
            } else {
              resolve(false);
            }
          },
          error => {
            reject(error);
            this.menssagemProvider.hideLoading();
          },
        );
    });
  }
  // FIM


  // METODO SEGUINTE, EXECUTa APOS O RETORNO DA PROMISE "verificarListaAtivas"
  // ESSE METODO, BAIXA A LISTA ATUAL DO SERVIDOR E EM SEGUIDA BAIXA A LISTA PRINCIPAL DE FILMES DO SERVIDOR

  public buscarListaIptvApi() {
    this.menssagemProvider.showLoading();
    return new Promise((resolve, reject) => {

      this.http.get<any>(this.baseLink + "listaIptv.php").subscribe(
        (data) => {
          this.storage.set('listasBaixadas', data);

          // FILTRA SÓ A LISTA SALVA COMO PRINCIPAL E ATRIBUI A VARIAVEL
          this.listaPrincipal = data.filter(lista => lista.principal === "1");

          // Provider para buscar a lista de filmes na api;
          this.http.get(this.baseLink + "getList.php?lista=" + this.listaPrincipal[0].url)
            .subscribe(
              data => {
                for (let i in data) {
                  if (!data[i].group) {
                    data[i].group = "DIVERSOS";
                  }
                  if (data[i].subgroup) {
                    if (data[i].group == data[i].subgroup) {
                      data[i].serie = true;
                    } else {
                      data[i].serie = false;
                    }
                  } else {
                    data[i].subgroup = data[i].group;
                    data[i].serie = false;
                  }
                  data[i].id = i;
                  data[i].visited = false;
                }
                this.storage.set('listaCompleta', data);
                // this.storage.set('listaCheia', true);
                this.menssagemProvider.hideLoading();
                resolve(true);
              },
              error => {
                this.menssagemProvider.hideLoading();
                this.menssagemProvider.showAlert();
                resolve(false)
              }
            );
          // FIM METODO BUSCAR E SALVAR A LISTA DE PRINCIPAL



        },
        (error) => {
          alert("Erro ao baixar a lista...");
        }
      )
    })
  }


  public verifyStorage() {
    this.menssagemProvider.showLoading();

    return new Promise((resolve, reject) => {
      this.storage.get('listaCompleta')
        .then(
          val => {

            if (val || val != null) {
              this.menssagemProvider.hideLoading();
              resolve(true);
              console.log("listaPrincipal")
            } else {
              this.storage.get('listasBaixadas').then(
                data => {
                  this.listaPrincipal = data.filter(lista => lista.principal === "1");


                  // Provider para buscar a lista de filmes na api;
                  this.http.get(this.baseLink + "getList.php?lista=" + this.listaPrincipal[0].url)
                    .subscribe(
                      data => {
                        for (let i in data) {
                          if (!data[i].group) {
                            data[i].group = "DIVERSOS";
                          }
                          if (data[i].subgroup) {
                            if (data[i].group == data[i].subgroup) {
                              data[i].serie = true;
                            } else {
                              data[i].serie = false;
                            }
                          } else {
                            data[i].subgroup = data[i].group;
                            data[i].serie = false;
                          }
                          data[i].id = i;
                          data[i].visited = false;
                        }
                        this.storage.set('listaCompleta', data);
                        // this.storage.set('listaCheia', true);
                        this.menssagemProvider.hideLoading();
                        resolve(true);
                      },
                      error => {
                        this.menssagemProvider.hideLoading();
                        this.menssagemProvider.showAlert();
                        resolve(false)
                      }
                    );

                }
              )
            }
          },
          error => {
            reject(false);
            this.menssagemProvider.hideLoading();
          },
        );
    });
  }






  // Metodo para buscar a lista de filmes pelo grupo

  public buscarLista(group): any {
    // console.log("sdsdsdsds");
    this.menssagemProvider.showLoading();
    return new Promise((resolve, reject) => {
      this.storage.get("listaCompleta")
        .then(
          data => {
            resolve(data.filter(lista => lista.subgroup === group)),
              this.menssagemProvider.hideLoading();
          },
          error => {
            reject(error);
            this.menssagemProvider.hideLoading();
          },
        );
    });

  }


  // metod a para alterar o filme para assistido

  public assistirFilme(item): any {
    return new Promise((resolve, reject) => {
      this.storage.get('listaCompleta').then(
        (data: any[]) => {

          data.map((listItem) => {
            if (listItem.id == item) {
              listItem.visited = true;
            }
          });

          this.storage.set('listaCompleta', data);
          resolve(true);
        },
        error => {
          reject(false);
        }
      );
    });
  }


  // metodo para buscar lista de filmes assistido recentimente

  public getListaVisited() {
    return new Promise((resolve, reject) => {
      this.storage.get('listaCompleta')
        .then(
          data => {
            let lista = data.filter(lista => lista.visited == true);

            if (lista.length >= 15) {
              lista = lista.slice(lista.length - 15, lista.length);
            }

            resolve(lista.reverse());
          },
          error => {
            reject(error);
            this.menssagemProvider.hideLoading();
          },
        );
    });
  }



  // Metodo para buscar a lista de itens por categoria
  // EX: Filme, series, tv

  public getListaGrupos(lista) {
    this.subgrupos.length = 0;
    this.grupos.length = 0;
    this.allGrupos.length = 0;



    let listaCategoria: any = [];

    return new Promise((resolve, reject) => {
      this.storage.get(lista)
        .then(
          data => {

            let groups: any = [];
            data.map((listItem) => {
              groups.push(listItem.subgroup)
            });

            let jobsUnique = groups.filter(function (item, index) {
              return groups.indexOf(item) >= index;
            });

            for (let i in jobsUnique) {
              listaCategoria.push(data.filter(lista => lista.subgroup === jobsUnique[i]));
            }

            console.log(listaCategoria);
            resolve(listaCategoria)
          },
          error => {
            reject(error);
            this.menssagemProvider.hideLoading();
          },
        );
    });

  }


  public getListasSalvas() {
    return new Promise((resolve, reject) => {
      this.storage.get('listasBaixadas')
        .then(
          data => {
            resolve(data)
          },

        )
    })
  }

  public selecionarItemListaBaixada(item) {
    return new Promise((resolve, reject) => {
      this.storage.get('listasBaixadas')
        .then(
          data => {
            data.map((listItem) => {
              if (listItem.id == item.id) {
                listItem.principal = "1"
              } else {
                listItem.principal = "0"
              }
            })
            this.storage.set('listasBaixadas', data);
            this.storage.remove('listaCompleta');
            resolve(data)
          },

        )
    })
  }

}