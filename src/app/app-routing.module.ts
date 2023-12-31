import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:"",component:DashboardComponent,canActivate: [AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"categories",component:CategoriesComponent},
  {path:"posts",component:AllPostComponent},
  {path:"posts/new",component:NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
