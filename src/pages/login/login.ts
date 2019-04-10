import { CadastroPage } from './../cadastro/cadastro';
import { HttpClient } from '@angular/common/http';
import { SlidesPage } from './../slides/slides';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenssagemProvider } from '../../providers/mensagem/mensagem';
import { PrincipalPage } from '../principal/principal';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private todo : FormGroup;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController,private menssagemProvider:MenssagemProvider, public navParams: NavParams, public app: App, public http:HttpClient, public storage:Storage) {
    
    this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logar(form){
    
    if(form.email.value !="" && form.senha.value !=""){
      this.menssagemProvider.showLoading();
      this.http.get<any>("https://klinmedical.websiteseguro.com/api/login.php?email="+form.email.value+"&senha="+form.senha.value).subscribe(
       data=>{
         if(data.length == 1){
          this.menssagemProvider.hideLoading();
          this.storage.set('usuario', data[0]).then(
            this.app.getRootNav().setRoot(SlidesPage)
            );

         }else{
           this.menssagemProvider.hideLoading();
           alert("login ou senha inválidos");
         }

       },
       (error)=>{
         alert("Erro ao consultar api");
       }
      );

    }else{
      alert("preencha os campos");
    }
    // console.log(form.email.value);
  }


  cadastrar(){
    // this.app.getRootNav().setRoot(CadastroPage);
    this.navCtrl.push(CadastroPage);
  }

}
