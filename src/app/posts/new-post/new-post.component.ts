import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{

  permalink: string = "";
  imgSrc: any = "./assets/placeholder.jpeg";
  selectedImg: any;

  categories: any;

  postForm: FormGroup | any;

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private postService:PostService){

                this.postForm = this.fb.group({
                  title: ["",[Validators.required,Validators.minLength(10)]],
                  permalink: ["",[Validators.required]],
                  excerpt:["",[Validators.required,Validators.minLength(50)]],
                  category:["",[Validators.required]],
                  postImg: ["",[Validators.required]],
                  content:["",[Validators.required]]
                })
              }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(
      response => this.categories = response
    )
  }

  get fc(){
    return this.postForm.controls;
  }

  onTitleChanged($event:any){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,"-")
  }

  onSubmit(){

    let splitted = this.postForm.value.category.split('-')

    const postData : Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category : {
        categoryId : splitted[0],
        category: splitted[1]
      },
      postImgPath: "",
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: "new",
      createdAt: new Date()
    }

    //this.postService.uploadImage(this.selectedImg,postData);
  }

  showPreview($event:any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }

    reader.readAsDataURL($event?.target.files[0])
    this.selectedImg = $event.target.files[0];
  }
}
