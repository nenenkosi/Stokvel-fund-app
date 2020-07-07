import { Component,NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';

declare var firebase:any

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl:NavController,
    public ngzone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkAuthState()
    });
  }
  condition
  checkAuthState() {
        return new Promise((resolve, reject) => {
          this.ngzone.run(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
              // alert('user signed in')
              this.condition = 1
              console.log(this.condition);
              this.navCtrl.navigateRoot('/tab1')
            } else {
              this.condition = 0
              // alert('no user signed in')
              console.log(this.condition);
              this.navCtrl.navigateRoot('/')
            }
            resolve(this.condition)
          })
      
       });
      });
  }
}
