import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';
import { CategoriesService } from '../categories.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  todoList: any =[]

today : number = Date.now();

  constructor(public modalCtlr:ModalController, public todoService:TodoService, public categoriesService:CategoriesService) {
    this.getAllTask()
  }

  async addNewItem(){
    const modal = await this.modalCtlr.create({
      component: AddNewTaskPage
    })

    modal.onDidDismiss().then(newTask =>{
      this.getAllTask()
    })
    return await modal.present()
  }

  /*getAllTask(){
    this.todoList=this.categoriesService.getTasks()
    console.log(this.categoriesService.getTasks());
  }*/

  getAllTask(){
    this.categoriesService.getTasks().then((data)=>{
      this.todoList=[];
      if(data.rows.length > 0){
        for(var i=0; i<data.rows.length; i++){
          this.todoList.push(data.rows.item(i));
        }
      }
    });
  }

  delete(key){
    this.categoriesService.deleteTask(key)
    this.getAllTask()
  }

  async update(selectedTask){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(()=>{
      this.getAllTask()
    })

    return await modal.present()
  }

  ngOnInit(){
    this.getAllTask()
  }

}
