import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
declare var firebase:any


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username:String
  email:String
  password:String
  constructor(private router: Router,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private navCtrl:NavController) { }

  ngOnInit() {
  }
  login(){
    this.navCtrl.navigateBack('/')
  
  }


  async Signup() {
    console.log('signup');
    if (this.username == undefined || this.email== undefined || this.password== undefined) {
      const alert = await this.alertCtrl.create({
        cssClass: 'myAlert',
        subHeader: "Please fill in all the fields",
        buttons: [
          {
            text: 'ok',
            handler: data => {
              // console.log('Cancel clicked');
            }
          }
        ]
      });
      await alert.present();
    } else {
      
  
    return new Promise(async (resolve, reject) => {
        let loading = await this.loadingCtrl.create({
          spinner: 'bubbles',
          message: 'Signing up...',
          duration: 4000000
        });
        loading.present();
        let email = this.email.trim()
        let password = this.password.trim()
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
          var user = firebase.auth().currentUser.uid
          firebase.database().ref("Users/" + user).set({
            email: this.email,
            name: this.username,
            user,
          })
         
          loading.dismiss();
          this.navCtrl.navigateRoot('/tab1')
        }).catch(async (error) => {
          loading.dismiss();
          const alert = await this.alertCtrl.create({
            cssClass: 'myAlert',
            subHeader: error.message,
            buttons: [
              {
                text: 'ok',
                handler: data => {
                  // console.log('Cancel clicked');
                }
              }
            ]
          });
          await alert.present();
          // console.log(error);
        })
    
      })
  }
}
}
