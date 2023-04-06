import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { TodoService } from '../todo.service';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage{
  allEvents=[];
  currentDate = new Date();
  currentMonth: string;
  @ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent;
  
  constructor(public modalCtlr:ModalController, public todoService:TodoService) {
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

  getAllTask(){
    this.allEvents=this.todoService.getAllTasks()
    console.log(this.todoService.getAllTasks());
  }

  

  onViewTitleChanged(title: string) {
    this.currentMonth = title;
  }
 
}
