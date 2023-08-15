import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categoryArray?: any;
  formCategory?: string;
  formStatus?: string = "Add";
  categoryId?: any;

  constructor(private categoryService:CategoryService){}
  
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(
      res => {
        this.categoryArray = res
      }
    )
  }

  onSubmit(formData:any){
    let category : Category = {
      category:formData.value.category
    }

    if(this.formStatus == 'Add') {
      this.categoryService.saveData(category);
      formData.reset()
    }else if (this.formStatus == 'Edit'){
      this.categoryService.updateData(category,this.categoryId)
      formData.reset()
      this.formStatus = 'Add'
    }

    
  }

  onEdit(category:any,id:any){
    this.formCategory = category;
    this.formStatus = "Edit";
    this.categoryId = id;
  }

  onDelete(id:any){
    this.categoryService.deleteData(id);
  }
}
