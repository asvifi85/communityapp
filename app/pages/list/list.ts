import {Page,Platform, Storage, LocalStorage,SqlStorage,NavController, NavParams} from 'ionic-angular';
import {NgZone} from 'angular2/core';

declare var Camera:any;


@Page({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  name: any;
  email: any;
  phone: any;
  community: any;
  local: Storage = new Storage(LocalStorage);
	_zone: any;
  images: Array<{src: String}>;
  constructor(private nav: NavController,private navParams: NavParams,private platform:Platform,
  _zone : NgZone
  ) {
	this.name = this.local.get('name');
	this.phone = this.local.get('phone');
	this.email = this.local.get('email');
	this.community = this.local.get('community');

	
	this._zone = _zone;
    this.platform = platform;
    this.images = [{src: 'img/speakers/puppy.jpg'}];
   /* // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/
  }
	takePhoto() {
	
    this.platform.ready().then(() => {
      let options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: false
      };
      // https://github.com/apache/cordova-plugin-camera#module_camera.getPicture
	  if(navigator.camera)
      navigator.camera.getPicture(
        (data) => {
          let imagedata = "data:image/jpeg;base64," + data;
           this._zone.run(()=> this.images.unshift({
             src: imagedata
           }))
        }, (error) => {
          alert(error);
        }, options
      );
    });
  }
  itemTapped(event, item) {
    this.nav.push(ListPage, {
      item: item
    });
  }
}
