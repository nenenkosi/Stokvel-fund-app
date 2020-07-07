import { Component, OnInit , NgZone} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
declare var firebase:any
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  data: any;
  profile
  name = ''
  surname = ''
  phone = ''
  uid
  constructor(private navParams: ActivatedRoute,private router: Router,private navCtrl:NavController,public ngzone: NgZone,public alertCtrl: AlertController,public loadingCtrl: LoadingController) { 
  
  }

  ngOnInit() {
    this.navParams.queryParams.subscribe((data) => {
     this.data = data['id'];
    //console.log(this.data);
    })
    this.getProfile()
  }
  pop(){
    this.navCtrl.navigateBack('/tab1')
// goForward() -> navigateForward()
// goBack() -> navigateBack()
// goRoot() -> navigateRoot()
  }
  getProfile() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        this.profile= []
        var user = firebase.auth().currentUser
        firebase.database().ref("Users/" + user.uid).on('value', (data: any) => {
          let details = data.val();
          if (details == null) {
          } else {
            accpt(details)
            console.log(details);
            this.name = details.name
            this.surname = details.surname
            this.phone = details.phone
            this.uid = details.user
          }
        })
      })
    })
  }
  async update() {
   
    if (this.name== undefined || this.surname == undefined || this.phone == undefined) {
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
    
      
    return new Promise((pass, fail) => {
      this.ngzone.run(async () => {
        var user = firebase.auth().currentUser
        console.log(user.uid)
        firebase.database().ref("Users/" + user.uid).update({
          name: this.name,
          surname: this.surname,
          phone: this.phone,
        });
        pass(`updated`)
        const alert = await this.alertCtrl.create({
          cssClass: 'myAlert',
          subHeader: "Proile Updated",
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
      })
    })
    }
  }

  openwebsite(){
    window.open("https://mafisha-babiesfoundation.co.za/");
  }
  logout() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().signOut();
        resolve()
      });
    })
  }
}
