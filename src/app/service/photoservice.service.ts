import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, CameraPhoto, FilesystemDirectory, Capacitor } from '@capacitor/core'
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { readSync, read } from 'fs';
import { Direct } from 'protractor/built/driverProviders';
import { FormStyle } from '@angular/common';
import { Platform } from '@ionic/angular';



const { Camera , Filesystem, Storage} = Plugins;


@Injectable({
  providedIn: 'root'
})
export class FotoService {
  public dataFoto : Photo[] = [];
  private keyfoto : string = "fotobaru"; 
  private platform : Platform
  public index : number = 0
 
  public templist : string[] = [];
  constructor(platform : Platform) { }
  public async tambahfoto(){
    const Foto = await Camera.getPhoto({
        resultType : CameraResultType.Uri,
        source : CameraSource.Camera,
        quality : 100
    });
     console.log('aa');
    const fileFoto = await this.simpanFoto(Foto);
    this.dataFoto.unshift(fileFoto);

    Storage.set({
      key : this.keyfoto,
      value : JSON.stringify(this.dataFoto)
    })
  }
  public async simpanFoto(foto : CameraPhoto){
    const base64Data = await this.readAsBase64(foto);
    const namaFile = new Date().getTime() + '.jpeg';
    this.templist.push(namaFile)
    console.log(this.templist)
    //console.log(this.datalisted.list)
    const simpanFile = await Filesystem.writeFile({
      path : namaFile,
      data : base64Data,
      directory : FilesystemDirectory.Data
    });

    const response = await fetch(foto.webPath);
    const blob = await response.blob(); 
    const dataFoto = new File([blob],foto.path,{
      type: "image/jpeg"
    })

      return {
        filepath : namaFile,
        webviewPath : foto.webPath,
        dataImage : dataFoto
      }
  
    
  }
  private async readAsBase64(foto : CameraPhoto){
 
      const response = await fetch(foto.webPath);
      const blob = await response.blob()
      return await this.convertBlobtoBase64(blob) as string; 
  
   
  }
  convertBlobtoBase64 = (blob : Blob) => new Promise((resolve, reject)=>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    }
    reader.readAsDataURL(blob);
  })
  public async loadfoto(){
    console.log('muncul')
    const listFoto = await Storage.get({key : this.keyfoto});
    console.log(listFoto)
    this.dataFoto = JSON.parse(listFoto.value) || [];
  
      for (let foto of this.dataFoto){
        const readFile = await Filesystem.readFile({
          path : foto.filepath,
          directory : FilesystemDirectory.Data
        });
        
        foto.webviewPath = `data:image/jpeg;base64, ${readFile.data}`;
        const response = await fetch(foto.webviewPath);
        const blob = await response.blob(); 
        foto.dataImage = new File([blob],foto.filepath,{
          type: "image/jpeg"
        })
      }
  }
  shifttoList(){
    console.log(this.templist)
    return this.templist
  }
  emptylist(){
    this.templist = [];
  }
}
export interface Photo{
  filepath : string;
  webviewPath : string;
  dataImage : File
}
export class datalist{
  list : string[] = [];
}