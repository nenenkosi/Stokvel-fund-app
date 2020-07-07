import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
declare var firebase:any


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:String
  password:String
  constructor(private router: Router,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private navCtrl:NavController) { }

  ngOnInit() {
  }



  async SignIn() {
    console.log('hi');
    if (this.email== undefined || this.password== undefined) {
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
          message: 'Login in...',
          duration: 4000000 
        });
        loading.present();
       let email = this.email.trim()
       let password = this.password.trim()
        return firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
          loading.dismiss();
          //resolve()
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
          alert.present();
          // console.log(error);
        })
     });
    }
  }



 async forgetPassword() {
    const prompt = await this.alertCtrl.create({
      header: 'Forgot password',
      message: "Enter your email to reset your email",
      inputs: [
        {
          name: 'email',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: async data => {
            console.log('Saved clicked');
            let email = data.email.trim()
            let loading = await this.loadingCtrl.create({
              spinner: 'bubbles',
              message: 'Login in...',
              duration: 4000000 
            });
            loading.present();
              firebase.auth().sendPasswordResetEmail(email).then(async (rec) => {
                loading.dismiss();
                console.log(rec);
                const alert = await this.alertCtrl.create({
                  cssClass: 'myAlert',
                  subHeader: rec,
                  buttons: [
                    {
                      text: 'ok',
                      handler: data => {
                        // console.log('Cancel clicked');
                      }
                    }
                  ]
                });
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
                alert.present();
                // console.log(error);
              })
          }
        }
      ]
    });
    prompt.present();


  }


  signup(){
    this.router.navigateByUrl('/signup') 
  }
 
}
