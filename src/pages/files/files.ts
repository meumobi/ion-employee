import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaService } from '@meumobi/mmb-media-provider';

@IonicPage()
@Component({
  selector: 'page-files',
  templateUrl: 'files.html',
})
export class FilesPage implements OnInit {
  files = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaService: MediaService,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilesPage');
  }

  ngOnInit() {
    this.mediaService.getFilesObserver()
    .subscribe(
      (data) => {
        const files = data;
        this.files = Object.keys(files).map(i => files[i]);
        console.log(this.files);
      }
    );
  }

}
