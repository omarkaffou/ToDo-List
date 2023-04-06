import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  @Input() task;
  categories: any = []
  categorySelectedCategory
  newTaskObj:any = {}
  itemName
  itemDueDate
  itemPriority
  itemCategory

  constructor(public modalCtlr:ModalController, public todoService:TodoService, public categoriesService:CategoriesService,
    ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categoriesService.getCategories().then((data)=>{
      this.categories=[];
      if(data.rows.length > 0){
        for(var i=0; i<data.rows.length; i++){
          this.categories.push(data.rows.item(i));
        }
      }
    });
  }

  selectedCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  async update(id){
    this.newTaskObj=({name:this.itemName,
      priority:this.itemPriority,
      due:this.itemDueDate,
      category:this.categorySelectedCategory})
    await this.categoriesService.editTask(this.newTaskObj.name, this.newTaskObj.priority, this.newTaskObj.due,this.newTaskObj.category,id)
    this.dismis()
  }
}
