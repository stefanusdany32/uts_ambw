import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  judul : string
  isidata : Observable<data[]>;
  isidataCol : AngularFirestoreCollection<data>;
  jdl : string
  isi : string
  date : Date
  rating : string
  photolist : string[] = []
  constructor(afs : AngularFirestore,public router : Router,private route: ActivatedRoute) {
    this.isidataCol = afs.collection('databaru')
    this.isidata = this.isidataCol.valueChanges();
  }
  ngOnInit() {
    this.route.params.subscribe(async params => {
        this.judul = params['judul']; 
        console.log(params['judul'])
    });
  }
}
interface data{
  judul : string,
  isi : string,
  date : Date,
  rating : string,
  foto : string[]
}