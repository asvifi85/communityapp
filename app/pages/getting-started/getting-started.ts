

import {Page, Storage, LocalStorage,NavController} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
import 'rxjs/add/operator/map';

import {FirebaseService} from '../../lib/firebaseService';

@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})
export class GettingStartedPage {
authType: string = "login";
  constructor(private http: Http,public FBService: FirebaseService) {

  }
  
  login(credentials) {
  alert(JSON.stringify(credentials));
  this.FBService.login(credentials.username,credentials.password)
  .subscribe((data: any) => {
alert(JSON.stringify(data));

               // console.log("the data", data.password.email)
               /* this.activeUser = data.password.email

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
  this.FBService.signup(credentials.username,credentials.password);
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

}
