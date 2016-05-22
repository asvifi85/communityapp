
import {Page,Platform,SqlStorage, Storage, LocalStorage,NavController} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
import {Device} from 'ionic-native';
import 'rxjs/add/operator/map';
import {ListPage} from '../list/list';

import {FirebaseService} from '../../lib/firebaseService';

@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})
export class GettingStartedPage {
auth: AuthService;
authType: string = "login";
error: string;
phone: any;
  jwtHelper: JwtHelper = new JwtHelper();
  local: Storage = new Storage(LocalStorage);
  
  storage : Storage = new Storage(SqlStorage);
  user: string;
  community: string;
  constructor(private http: Http,public FBService: FirebaseService,private nav: NavController,private platform: Platform) {
	this.auth = AuthService;
	//alert(FBService.
	this.FBService.hasLoggedIn().then((hasLoggedIn) => {
		if(hasLoggedIn)
		this.nav.setRoot(ListPage);
		
    });
	alert(JSON.stringify(Device.device));
  }
  
  login(credentials) {
  var that = this;
  this.FBService.login(credentials.username,credentials.password)
  .subscribe(data => {
  that.FBService.authSuccess(data.token);
  // that.nav.push(ListPage);
  this.nav.setRoot(ListPage);
  
               // console.log("the data", data.password.email)
           /*     this.activeUser = data.password.email

                this.FBService.getDataObs(data.uid)
                    .subscribe((data: Array<any>) => {
                        console.log(data)
                        this.items = data
                    })*/
            }); 
    /*this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => this.authSuccess(data.id_token),
        err => this.error = err
      ); */
	/*  this.FBService.createUser("sdfasc@mail.com")
            .subscribe((data: any) => {

                console.log("the data", data);
				});*/
  }

  signup(credentials) {
  var that = this;
  this.FBService.signup(credentials).subscribe((data: any) => {

                console.log("the data", data);
				that.authType = "login";
				//that.FBService.authSuccess(data.token);
				that.user = localStorage.getItem('name');
	that.phone = localStorage.getItem('phone');
	that.community =  localStorage.getItem('community');
    this.platform.ready().then(() => {
		//userid TEXT PRIMARY KEY, name TEXT, email TEXT,phone INTEGER,community TEXT
            this.storage.query("INSERT INTO profile (userid, name,email, phone,community) VALUES ('"+data.uid+"', '"+credentials.name+"', '"+credentials.email+"', '"+credentials.phone+"', '"+credentials.community+"')").then((data) => {
                console.log(JSON.stringify(data.res));
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });
        });
		
	});

   /* this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => this.authSuccess(data.id_token),
        err => this.error = err
      ); */
	  // this.FBService.login("c@mail.com")
        //    .subscribe((data: any) => {

                console.log(credentials);
               /* this.activeUser = data.password.email

                this.FBService.getDataObs(data.uid)
                    .subscribe((data: Array<any>) => {
                        console.log(data)
                        this.items = data
                    })*/ 
            // });
	 /* 
	//var baseRef = new Firebase('https://community-app.firebaseio.com/');
	 FBService.createUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
}); */
  }
	
   logout() {
    this.local.remove('id_token');
    this.user = null;
	this.FBService.logout();
  }

  
}
