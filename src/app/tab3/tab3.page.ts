import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { FotoService } from '../service/photoservice.service';
import { Url } from 'node:url';
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
  urlImageStorage  : any[] =[];
  photolist : string[] = []
  constructor(public fotoservice : FotoService,private afStorage : AngularFireStorage,afs : AngularFirestore,public router : Router,private route: ActivatedRoute) {
    this.isidataCol = afs.collection('databaru')
    this.isidata = this.isidataCol.valueChanges();
   
  
  }
  ngOnInit() {
    this.route.params.subscribe(async params => {
        this.judul = params['judul']; 
        
    });
  }
  getdata(){
    return this.isidataCol.doc<data>(this.judul).valueChanges()
  }
  show(temp : string[]){
      
      for (var index in temp){

        const imgFilePath = `imgStorage/${temp}`
        //console.log(index)
        var storage = this.afStorage.storage;
        var gsReference =storage.refFromURL('gs://bucket/images/'+temp[index])
        this.urlImageStorage.unshift(gsReference)
       
      }
  }
  edit(){
    console.log(this.judul)
    this.isidataCol.doc(this.judul).update({
      isi : this.isi
    });
  }
  delete(){
    this.isidataCol.doc(this.judul).delete();
  }
}
interface data{
  judul : string,
  isi : string,
  date : Date,
  rating : string,
  foto : string[]
}