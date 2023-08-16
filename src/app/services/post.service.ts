import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage: AngularFirestore) { }

  /*uploadImage(selectedImage:any,data:any){
    const filePath = `postImg/${Date.now()}`

    this.storage.upload(filePath,selectedImage).then(()=>{
      console.log("upload success")
    });

    this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
      data.postImgPath = URL;
    })
  }*/

}
