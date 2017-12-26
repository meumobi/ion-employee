import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LatestPage } from '../pages/latest/latest';
/// some questions...
import { CategoriesProvider } from '../providers/categories/';
import { Category } from '../models/category.interface';
import 'rxjs/add/operator/map';
import { 
  FirebaseListObservable, 
} from 'angularfire2/database';

import firebase, { Unsubscribe } from 'firebase';
import { FIREBASE_CONFIG } from './app.firebase.config';
///

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  categories: FirebaseListObservable<Category>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private translate: TranslateService,
    private categoriesProvider: CategoriesProvider,
  ) {
    ///
    //firebase.initializeApp(FIREBASE_CONFIG);
    ///
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Settings', component: 'SettingsPage' }
    ];

    this.categories = this.categoriesProvider.findAll();


  }

  initializeApp() {
    this.translate.setDefaultLang('pt');
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openCategory(id){
    this.nav.push(LatestPage, {
      id: id,
      rootNavCtrl: this.nav
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
