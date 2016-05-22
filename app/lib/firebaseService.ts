import {Injectable} from 'angular2/core';
import 'rxjs/Rx';

import {Page, Storage, LocalStorage,SqlStorage,NavController,Events} from 'ionic-angular';
import {Observable} from "rxjs/Observable";

import {AuthService} from '../services/auth/auth';
import {JwtHelper} from 'angular2-jwt';



@Injectable()
export class FirebaseService {

auth: AuthService;
  local: Storage = new Storage(LocalStorage);
  
  storage : Storage = new Storage(SqlStorage);
  user: string; 
  HAS_LOGGED_IN:any;
  jwtHelper: JwtHelper = new JwtHelper();
    baseRef = new Firebase('https://community-app.firebaseio.com/');
    constructor() {
        var that = this;
        // check for changes in auth status
        this.baseRef.onAuth((authData) => {
            if (authData) {
                console.log("User " + authData.uid + " is logged in with " + authData.provider);
				that.authSuccess(authData.token);
            } else {
                console.log("User is logged out");
            }
        })
    }

    logout() {
        this.baseRef.unauth()
    }

    login(_username,password) {
        var that = this;

        return new Observable(observer => {
            that.baseRef.authWithPassword({
                "email": _username,
                "password": password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
					alert(error);
                    observer.error(error);
                } else {
                    console.log("Authenticated successfully with payload-", authData);
					
					 that.storage.set(that.HAS_LOGGED_IN, true);
                    observer.next(authData);
                }
            });
        });
    }
	

	signup(credits){
	var that = this;
	
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

   
	   return new Observable(observer => {
			this.baseRef.createUser({
  email    : credits.username,
  password : credits.password
}, function(error, userData) {
 if (filter.test(credits.username) == false) {
		alert('Please provide a valid email address');
		return false;
	}
	if(!credits.username){
		alert('invalid username');
		return;
	}
	if(!credits.password){
		alert('invalid username');
		return;
	}
  if (error) {
    console.log("Error creating user:", error);
	alert(error);
	 observer.error(error);
	 
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
	 observer.next(userData.uid)
	 var uid = userData.uid;
	// that.authSuccess(userData.token);
			var usersRef = that.baseRef.child("users");
			that.local.set('name', credits.name);
			that.local.set('phone', credits.phone);
			that.local.set('community', credits.community);
			that.local.set('email', credits.email);
			usersRef.child(uid).set({
				name: credits.name,
				email: credits.username,
				phone: credits.phone,
				community: credits.community
			});
  }
  });
});
}

	hasLoggedIn() {
	var that = this;
    return that.storage.get(that.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
    getDataPrivate(_id, _callback) {
        var ref = this.baseRef.child('public-messages')
        ref = ref.child(_id)

        ref.on('value',
            (snapshot) => {
                let result = snapshot.val()
                _callback(result)
            },
            (error) => {
                console.log("ERROR:", error)
                _callback(error)
            });
    }


    getData(_id, _callback) {
        var ref = this.baseRef.child('bookItems')
        //  ref = ref.child(_id)

        ref.on('value',
            (snapshot) => {
                var arr = []

                snapshot.forEach(function(childSnapshot) {
                    arr.push({
                        id: childSnapshot.key(),
                        data: childSnapshot.val()
                    });
                });
                _callback(arr)
            },
            (error) => {
                console.log("ERROR:", error)
                _callback(error)
            });
    }

    getDataObs(_id) {
        var ref = this.baseRef.child('bookItems')
        //  ref = ref.child(_id)
        var that = this

        return new Observable(observer => {
            ref.on('value',
                (snapshot) => {
                    var arr = []

                    snapshot.forEach(function(childSnapshot) {
                        arr.push({
                            id: childSnapshot.key(),
                            data: childSnapshot.val()
                        });
                    });
                    observer.next(arr)
                },
                (error) => {
                    console.log("ERROR:", error)
                    observer.error(error)
                });
        });
    }

	 authSuccess(token:any) {
   // this.error = null;
    this.local.set('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
  }
}

