import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private toastrService:ToastrService,
              private router: Router) { }

  login(email:any,password:any){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef => {
      this.toastrService.success("Logged in successfully");
      this.router.navigate(["/"])
    }).catch(e => {
      this.toastrService.warning(e);
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem("user",JSON.stringify(user))
    });
  }

  logOut(){
    this.afAuth.signOut().then(()=> {
      this.toastrService.success("SignOut successfully")
      this.router.navigate(["/login"])
    })
  }
}
