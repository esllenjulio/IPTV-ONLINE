import { HttpClient } from '@angular/common/http';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { AlertController } from 'ionic-angular';
// import { VgAPI } from 'videogular2/core';
import { MenssagemProvider } from '../../providers/mensagem/mensagem';
import { StorageProvider } from '../../providers/storage/storage';
import { PrincipalPage } from '../principal/principal';
/**
 * Generated class for the DetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()

declare let videojs: any;

@Component({
  selector: 'page-detalhes-filme',
  templateUrl: 'detalhesFilme.html',
})

export class DetalheFilmePage implements OnDestroy {

  public item: any;
  private idFilme: number;
  private list_filmes: any = [];
  private itensPlayList: any = [];
  private tipo: string;
  private favorito: any;
  private duracao: any;
  private playList: boolean = true;
  private selectedMenu: boolean = true;
  private playPause: boolean = false;
  private fimLista: boolean = true;
  private contador: number = 0;
  private posicaoLista: number = 0;
  private reproduzirLista: boolean = false;



  private original_language?: string = null;
  private original_title?: string = null;
  private overview?: string = null;
  private popularity?: string = null;
  private poster_path?: string = null;
  private release_date?: string = null;
  private title?: string = null;
  private vote_average?: string = null;
  private vote_count?: string = null;
  private TrallerVideo?: boolean = null;
  private ExecuteList: boolean = false;

  poster = 'assets/imgs/loader.gif';
  // URL do video a ser reproduzido.
  video = '';
  @ViewChild('myvid') vid: ElementRef;
  vidObj: any;


  constructor(
    public navCtrl: NavController,
    public menssagemProvider: MenssagemProvider,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private filmesProvider: FilmesProvider,
    private storageProvider: StorageProvider,
    private streamingMedia: StreamingMedia,
    private http: HttpClient,
    public alertCtrl: AlertController
  ) {

    this.item = navParams.data.item;
    this.idFilme = navParams.data.item.idFilme;

    this.buscarInfor(navParams.data.item.title, navParams.data.item.group);

    this.storageProvider.buscarLista(navParams.data.item.subgroup).then(
      data => {
        this.list_filmes = data;
        console.log(data);

        if (this.list_filmes.length <= 20) {
          for (let i = 0; i < this.list_filmes.length; i++) {
            this.itensPlayList.push(this.list_filmes[i]);
            this.contador++;
          }
          this.fimLista = false;
        } else {
          for (let i = 0; i < 20; i++) {
            this.itensPlayList.push(this.list_filmes[i]);
            this.contador++;
          }
          this.fimLista = true;
        }
      }
    )

    this.getPosition(navParams.data.item.id);
    // descobrir a posicao do item na lista


  }




  getPosition(id) {
    let x = 0;
    this.list_filmes.map((listItem) => {
      if (listItem.id == id) {
        this.posicaoLista = x
      }
      x++;
    });
    console.log(this.posicaoLista)
    console.log(id)
  }



  play(item) {

    console.log(item)
    this.item = item;
    this.adicionarItemListaAssistidos(this.item.id);

    if (item.url.match(/.ts/)) {
      console.log("TS")
      item.url = item.url.replace(".ts", ".m3u8");
    } else {
      item.url = item.url
    }

    this.getPosition(item.id);

    let options: StreamingVideoOptions = {
      successCallback: () => { console.log("FILME ENCERRADO"), this.showConfirmStopReprod() },
      errorCallback: (e) => { alert("Desculpe! talvez esse video esteja fora do ar."), this.verificarRepList() },
      orientation: 'landscape'
    };

    if (!this.reproduzirLista) {

      const confirm = this.alertCtrl.create({
        title: 'Lista de reprodução!',
        message: 'Deseja executar em reprodução automatica?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              // console.log('Disagree clicked');
              this.reproduzirLista = false;
              this.streamingMedia.playVideo(item.url, options);
            }
          },
          {
            text: 'Sim',
            handler: () => {
              console.log('Agree clicked');
              this.reproduzirLista = true;
              this.streamingMedia.playVideo(item.url, options);
            }
          }
        ]
      });

      confirm.present();

    } else {
      this.streamingMedia.playVideo(item.url, options);
    }

  }




  pause() {

  }

  previous() {
    let x = 0;
    this.list_filmes.map((listItem) => {
      if (listItem.id == this.item.id) {
        this.posicaoLista = x
      }
      x++;
    });
    console.log(this.posicaoLista);
    if (this.posicaoLista == 0) {
      console.log("Zero")
    } else {
      this.posicaoLista--;
      console.log(this.posicaoLista);
      let item = this.list_filmes[this.posicaoLista];
      this.play(item);
    }

  }

  next() {
    let x = 0;
    this.list_filmes.map((listItem) => {
      if (listItem.id == this.item.id) {
        this.posicaoLista = x
      }
      x++;
    });
    console.log(this.posicaoLista);
    if (this.posicaoLista == (this.list_filmes.length - 1)) {
      console.log("maximo")
    } else {
      // if(this.posicaoLista >=)
      this.posicaoLista++;
      console.log(this.posicaoLista);
      let item = this.list_filmes[this.posicaoLista];
      this.play(item);
    }

  }


  ngAfterViewInit() { }

  ionViewDidLoad() { }

  ngOnDestroy() { }


  private showConfirmStopReprod() {

    if (this.reproduzirLista) {
      const confirm = this.alertCtrl.create({
        title: 'Lista de reprodução',
        message: 'Deseja continuar a reprodução automática?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              // console.log('Disagree clicked');
              this.reproduzirLista = false;
              // this.reproduzirItemLista()
            }
          },
          {
            text: 'Sim',
            handler: () => {
              console.log('Agree clicked');
              this.reproduzirLista = true;
              this.reproduzirItemLista();
              window.clearInterval(interv);

            }
          }
        ]
      });

      confirm.present();
     let interv = setInterval(() => { 
       confirm.dismiss(), 
       console.log("okok"), 
       this.verificarRepList(),  
       window.clearInterval(interv); }, 5000);
    
    }
  }

verificarRepList(){
  if (this.reproduzirLista) {
    this.reproduzirItemLista();
  }
}



  private adicionarItemListaAssistidos(id) {
    this.storageProvider.assistirFilme(id).then(
      (data) => {
        this.filmesProvider.buscarFilmesAssistidos();
      }
    );
  }



  abrirPLaylist() {
    this.selectedMenu = !this.selectedMenu;
    this.playList = !this.playList;
  }





  public reproduzirItemLista() {
   
      // alert("Reprodução automática ativada");
      let x = 0;
      this.list_filmes.map((listItem) => {
        if (listItem.id == this.item.id) {
          this.posicaoLista = x
        }
        x++;
      });

      if (this.posicaoLista == (this.list_filmes.length - 1)) {
        console.log("maximo")
      } else {
        // if(this.posicaoLista >=)
        this.posicaoLista++;
        console.log(this.posicaoLista);
        let item = this.list_filmes[this.posicaoLista];
        this.play(item);
      }
    

  }



  buscarInfor(title, group) {

    for (let i = 10; i < 2500; i++) {

      title = title.replace(i, '')
      title = title.replace('S' + i, '')
      title = title.replace('E' + i, '')
      title = title.replace('E0' + i, '')
      title = title.replace(i + 'T', '')

      // for(let x=0; i<10;x++){
      //   title=title.replace(i+'T'+ "-E0" + x, '');
      //   console.log("aqui")
      // }
      // for(let x=10; i<50;x++){
      //   title=title.replace(i+'T'+ "-E" + x, '')
      // }

    }
    // title = "Inocente Ou Culpado - Dublado - Drama"

    title = title.replace('1', '')
    title = title.replace('2', '')
    title = title.replace('3', '')
    title = title.replace('4', '')
    title = title.replace('5', '')
    title = title.replace('6', '')
    title = title.replace('7', '')
    title = title.replace('8', '')
    title = title.replace('9', '')
    title = title.replace('0', '')

    title = title.replace('Dublado', '')
    title = title.replace('dublado', '')
    title = title.replace('Dub', '')
    title = title.replace('-', '')
    title = title.replace('(', '')
    title = title.replace(')', '')
    title = title.replace('[', '')
    title = title.replace(']', '')
    title = title.replace('{', '')
    title = title.replace('}', '')
    title = title.replace('.', '')
    title = title.replace('S1-E1', '')

    title = title.replace('Drama', '')
    title = title.replace('Fantasia', '')
    title = title.replace('Ficção', '')
    title = title.replace('Terror', '')
    title = title.replace('Romance', '')
    title = title.replace('Suspense', '')
    title = title.replace('Romance', '')
    title = title.replace('Romance', '')
    if (title == "" || title == null) {
      title = group;
    }
    console.log(title)
    // this.http.get<any>('https://api.themoviedb.org/3/search/movie?api_key=07fbd7091632a6fecaaeec72d19887ea&language=pt-BR&query='+ title + '&page=1&include_adult=false').subscribe(
    //   data=>{
    //     console.log(data.results)
    //   },
    //   error=>{
    //     alert(error) 
    //   }
    // ) 
  }


  doInfinite(infiniteScroll) {

    if (this.itensPlayList.length != this.list_filmes.length) {
      for (let i = 0; i < 20; i++) {
        if (this.itensPlayList.length != this.list_filmes.length) {
          this.itensPlayList.push(this.list_filmes[this.contador]);
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

}