import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private angularFirestore:AngularFirestore,
              private toastrService:ToastrService) { }

  saveData(data:any){

    this.angularFirestore.collection('categories').add(data)
    .then(docRef => {
      console.log(docRef)
      this.toastrService.success('Data added successfully')
    })
    .catch(err => {
      console.log(err)
      this.toastrService.error("data could'nt added")
    });
  }

  loadData(){
    return this.angularFirestore.collection("categories").snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, data }
      })
    }))
  }

  updateData(id:any,editData:any){
    this.angularFirestore.doc(`categories/${id}`).update(editData)
    .then(docRef => {
      this.toastrService.success("data updated successfully")
    })
  }

  deleteData(id:any){
    this.angularFirestore.doc(`categories/${id}`).delete().then(doc => {
      this.toastrService.success("data deleted successfully");
    })
  }
}
