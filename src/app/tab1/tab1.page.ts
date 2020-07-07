import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
declare var firebase:any
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
resultsFromFirbase = []
  initvalue:any = 0
  takeCare:any = 0
  natonal:any = 0
  work:any = 0
  bleowinit:any = 0
  storeint = [0]
  storetkc = [0]
  storenat = [0]
  storewrk = [0]
  storeblw = [0]
  contribution
  percent10 = 0
  sumup = []
  newamount
  constructor(private router: Router,public loadingCtrl: LoadingController) {


  }

  async ngOnInit() {
    let loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please wait...',
      duration: 4000 
    });
    loading.present();
    setTimeout(() => {
      this.getContribution();
      //loading.dismiss();
  }, 2500);
 
  }

calcul(){
  
    this.getContribution().then((data:any)=>{
      console.log(data);
      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          const element = data[k].amount;
          console.log(element);
          this.resultsFromFirbase.push(element)
        }
      }
      this.calAndSpit()
    })
 
}
  next(){
    
    this.router.navigateByUrl('/cart') 
  }

  async calAndSpit(){
    this.storeint = [0]
    this.storetkc = [0]
    this.storenat = [0]
    this.storewrk = [0]
    this.storeblw = [0]
    this.percent10 = 0
    this.newamount = 0
    this.sumup =[0]
    for (let i = 0; i < this.resultsFromFirbase.length; i++) {
     var arrayloop = parseInt(this.resultsFromFirbase[i]) ;
     this.sumup.push(arrayloop)
     console.log( this.sumup);
    }
    this.newamount = this.sumup.reduce((acc , cur)=>{
     return acc + cur;
    })
    console.log(this.newamount);
    if (this.newamount > 99) {
      this.initvalue =  this.newamount ;
      // this.initvalue  = arrayloop - this.initvalue
      this.storeint.push(this.initvalue) 
      this.takeCare = this.takeCare = this.newamount /10
      this.percent10  = this.takeCare /10
      this.takeCare = this.takeCare - this.percent10
      this.storetkc.push(this.takeCare/2) 
      this.work = this.work = this.takeCare /2
      this.storewrk.push(this.work) 
      this.storenat.push(this.percent10) 
      } else {
        console.log(`it's less than 100 rand`);
         this.storeblw.push(this.newamount)
         console.log(this.storeblw);
        this.bleowinit = this.storeblw.reduce((acc , cur)=>{
          return acc + cur
        })
         this.bleowinit =  this.bleowinit.toFixed(2)
         console.log(this.bleowinit);
      }
    this.initvalue = this.storeint.reduce((acc , cur)=>{
      return acc + cur
    })
    this.initvalue = parseInt(this.initvalue ) + parseInt(this.bleowinit)
    this.initvalue = this.initvalue.toFixed(2)
     console.log(this.initvalue); 
     this.takeCare = this.storetkc.reduce((acc , cur)=>{
      return acc + cur
    })
    this.takeCare =  this.takeCare.toFixed(2)
     console.log(this.takeCare); 
     this.natonal= this.storenat.reduce((acc , cur)=>{
      return acc + cur
    })
    this.natonal=  this.natonal.toFixed(2)
     console.log(this.natonal); 
     this.work = this.storewrk.reduce((acc , cur)=>{
      return acc + cur
    })
    this.work = this.work.toFixed(2)
     console.log(this.work); 
  }

 async getContribution() {
   console.log('called');
    //return new Promise(async (accpt, rej) => {
        this.contribution= []
        var user = await firebase.auth().currentUser
        firebase.database().ref("Contribution/" + user.uid).on('value', (data: any) => {
          let details = data.val();
          this.resultsFromFirbase = []
          if (details == null) {
            
          } else {
            this.contribution = data.val()
            //accpt(this.contribution)
            for (const k in this.contribution) {
              if (this.contribution.hasOwnProperty(k)) {
                const element = this.contribution[k].amount;
                console.log(element);
                this.resultsFromFirbase.push(element)
              }
            }
            this.calAndSpit()
           
            
          }
         
        })
     
    // })
  }

  sendMessage(amount){
    return new Promise((accpt, rej) => {
      //let dateObj = new Date
      let currentUser = firebase.auth().currentUser.uid;
      let time = new Date()
      firebase.database().ref("Contribution/" + currentUser).push({
        amount: '100',
        time: time,
        uidto : currentUser,
       
      })
      accpt('sent');
    
  
  })
  }
}
