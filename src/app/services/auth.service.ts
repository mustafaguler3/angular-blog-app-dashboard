import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(private afAuth: AngularFireAuth,
              private toastrService:ToastrService,
              private router: Router) { }

  login(email:any,password:any){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef => {
      this.toastrService.success("Logged in successfully");
      this.loadUser();
      this.loggedIn.next(true);

      this.isLoggedInGuard = true;

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
      localStorage.removeItem('user');
      this.loggedIn.next(false)

      this.isLoggedInGuard = false;

      this.router.navigate(["/login"])
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
  }
}
