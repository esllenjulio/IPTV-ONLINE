import { SlidesPage } from './../slides/slides';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { MenssagemProvider } from '../../providers/mensagem/mensagem';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  constructor(public navCtrl: NavController, public storage:Storage, private menssagemProvider:MenssagemProvider, public navParams: NavParams, public app: App, public http:HttpClient) {
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cadastrar(form) {
    if (form.email.value != "" && form.senha.value != "" && form.nome.value != "") {
      this.menssagemProvider.showLoading();
      this.http.get<any>("https://klinmedical.websiteseguro.com/api/cadastro.php?email=" + form.email.value +"&nome=" + form.nome.value+ "&senha=" + form.senha.value).subscribe(
        data => {
          console.log(data[0])
          if (data[0].usuario === "true") {
            this.menssagemProvider.hideLoading();
            alert("Usuario já cadastrado!");
          } 
          else if(data[0].usuario == "sucesso"){
            this.menssagemProvider.hideLoading();
            this.app.getRootNav().setRoot(SlidesPage);

            this.storage.set('usuario', data[0]).then(
              this.app.getRootNav().setRoot(SlidesPage)
              );
          }

        },
        (error) => {
          this.menssagemProvider.hideLoading();
          alert("Erro ao consultar api");
        }
      );

    } else {
      alert("preencha os campos");
    }
  }

}
