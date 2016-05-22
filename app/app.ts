import {App, IonicApp, Platform,Storage, SqlStorage,MenuController} from 'ionic-angular';
import {provide} from 'angular2/core';
import {StatusBar,Splashscreen} from 'ionic-native';
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {FirebaseService} from './lib/firebaseService';



@App({
  templateUrl: 'build/app.html',
  
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
   providers: [
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig, http);
      },
      deps: [Http]
    }),FirebaseService
  ]
})
class MyApp {
  rootPage: any = GettingStartedPage;
  pages: Array<{title: string, component: any}>;
  storage: any;

  constructor(private app: IonicApp, private platform: Platform,
  private fbservice : FirebaseService,
  private menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
  var that = this;
    that.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
	  that.storage = new Storage(SqlStorage);
            that.storage.query('CREATE TABLE IF NOT EXISTS profile (userid TEXT PRIMARY KEY, name TEXT, email TEXT,phone INTEGER,community TEXT)').then((data) => {
                console.log("TABLE CREATED -> " + JSON.stringify(data.res));
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });
			StatusBar.styleLightContent();
      Splashscreen.hide();
      //StatusBar.styleDefault();
    });
	/* that.fbservice.hasLoggedIn().then((hasLoggedIn) => {
      that.enableMenu(hasLoggedIn == 'true');

    }); */
  }

  /*	enableMenu(loggedIn) {
   // this.menu.enable(loggedIn, "loggedInMenu");
	if(loggedIn)
	this.openPage(ListPage);
	else
	this.openPage(GettingStartedPage);
   // this.menu.enable(!loggedIn, "loggedOutMenu");
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  } */
}
