import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageProvider:StorageProvider, public filmesProvider:FilmesProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

   

    this.items = [];
    
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }

    // this.storageProvider.getListasSalvas().then(
    //   data=>{ 
    //     console.log(data)
    //     for(let i in data){
    //       this.items.push(data[i]);
    //     }
    //   }
    // );
    this.filmesProvider.buscarListaLocalStorage();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  itemSelect(item){
      console.log(item);
      this.filmesProvider.selectItemListaBaixadas(item);
  }

   
}
