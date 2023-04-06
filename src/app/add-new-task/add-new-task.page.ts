import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { CategoriesService } from '../categories.service';


@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categoriess: any=[];
  categorySelectedCategory: string='';
  itemName: string='';
  itemDueDate: string='';
  itemPriority: string='';
  itemCategory: string='';
  Task : any={}
  image = 'https://www.jacquesimmobilier.fr/images/pasdephoto.jpg';
  
  constructor(public modalCtrl:ModalController,
              public todoService:TodoService,
              public categoriesService:CategoriesService,
              public alertController: AlertController,
              public actionSheetController: ActionSheetController,
              private camera: Camera) {
                this.getCategories()
               }

  ngOnInit() {
    this.getCategories();
  }


  async add(){
    this.Task={name: this.itemName,
                priority: this.itemPriority,
                due: this.itemDueDate,
                category: this.categorySelectedCategory}
    this.categoriesService.addTask(this.Task.name,this.Task.priority,this.Task.due,this.Task.category)
    .then((data)=>{
      this.Task.name='';
      this.Task.priority=''
      this.Task.due=''
      this.Task.category=''
      alert(data);
    });
    this.dismis()
}



  async dismis(){
    await this.modalCtrl.dismiss(this.Task)
  }

  selectedCategory(index){
    this.categorySelectedCategory = this.categoriess[index].name
    console.log(this.categorySelectedCategory);
  }

  async promptNewCategory() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New Category',
      inputs: [
        {
          name: 'newCategory',
          type: 'text',
          placeholder: 'New category'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.itemCategory=data.newCategory
            this.addCategory();
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    cssClass: 'my-custom-class',
    mode: 'ios',
    buttons: [{
      text: 'Open Camera',
      icon: 'camera',
      handler: () => {
        this.todoService.addPhoto('camera')
        console.log('camera clicked');
      }
    },{
      text: 'Open gallery',
      icon: 'images-outline',
      handler: () => {
        this.todoService.addPhoto('library')
        console.log('galerie clicked');
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();

  const { role } = await actionSheet.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

getCategories(){
  this.categoriesService.getAllCategories().then((data)=>{
    this.categoriess=[];
    if(data.rows.length > 0){
      for(var i=0; i<data.rows.length; i++){
        this.categoriess.push(data.rows.item(i));
      }
    }
  });
}

addCategory(){
  if(!this.itemCategory.length){
    alert("Enter category name");
    return;
  }

  this.categoriesService.addCategory(this.itemCategory).then((data)=>{
    this.itemCategory='';
    alert(data);
    this.getCategories();
  });
  }

}
