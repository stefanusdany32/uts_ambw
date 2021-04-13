import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FotoService } from '../service/photoservice.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  urlImageStorage  : string[] =[];
  fotolist : string[]
  tempfoto : Photo
  judul : string
  isi : string
  date : Date
  rating : string 
  isidata : Observable<data[]>;
  isidataCol : AngularFirestoreCollection<data>;
  constructor(public fotoservice : FotoService,private afStorage : AngularFireStorage,afs : AngularFirestore) {
    this.isidataCol = afs.collection('databaru')
    this.isidata = this.isidataCol.valueChanges();
  }
  TambahFoto(){
    this.fotoservice.tambahfoto();
  }
   add(){
     console.log(this.rating)
     this.fotolist = this.fotoservice.shifttoList();
    this.isidataCol.doc(this.judul).set({
      judul : this.judul,
      isi : this.isi,
      date : this.date,
      rating : this.rating,
      foto : this.fotolist

    });
    for (var index in this.fotoservice.dataFoto){

      const imgFilePath = `imgStorage/${this.fotoservice.dataFoto[index].filepath}`
      console.log(imgFilePath)
      this.afStorage.upload(imgFilePath, this.fotoservice.dataFoto[index].dataImage).then(() =>{
          this.afStorage.storage.ref().child(imgFilePath).getDownloadURL().then((url) =>{
              this.urlImageStorage.unshift(url)
              console.log(url)
          });
      });
    }
  }
}
export interface Photo{
  filepath : string;
  webviewPath : string;
  dataImage : File
}
interface data{
  judul : string,
  isi : string,
  date : Date,
  rating : string,
  foto : string[]
}