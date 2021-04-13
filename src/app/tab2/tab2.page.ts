import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isidata : Observable<data[]>;
  isidataCol : AngularFirestoreCollection<data>;
  constructor(afs : AngularFirestore,public router : Router) {
    this.isidataCol = afs.collection('databaru')
    this.isidata = this.isidataCol.valueChanges();

  }
  pindah(judul : string){
    console.log("pindah")
    this.router.navigate(['/tab3', judul]);
  }
}
interface data{
  judul : string,
  isi : string,
  date : Date,
  rating : string,
  foto : string[]
}