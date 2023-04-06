import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fcm: FCM, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
	  statusBar.styleDefault();
	} );

  this.fcm.onNotification().subscribe(data => {
    if(data.wasTapped){
      console.log("Received in background");
    } else {
      console.log("Received in foreground");
    };
  });
  
 }
}
