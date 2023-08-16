import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private toastrService:ToastrService) { }

  login(email:any,password:any){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef => {
      this.toastrService.success("Logged in successfully")
    })
  }
}
