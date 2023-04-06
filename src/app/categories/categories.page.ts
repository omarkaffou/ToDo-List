import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CategoriesService } from '../categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit{

  constructor( public alertController: AlertController,public categoriesService: CategoriesService, public navController: NavController) {
    this.categoriesService.CreateDataBase().then(()=>{
      this.getCategories();
    });
  }

  categories: any=[];
  categoryName: string='';
  parcentage=[];

  parcentCat(){
    for(var i=0;i<this.categories.length;i++){
      this.categories[i].test=this.categoriesService.parcentageCat(this.categories[i].name)
    }
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

  addCategory(){
    if(!this.categoryName.length){
      alert("Enter category name");
      return;
    }

    this.categoriesService.addCategory(this.categoryName).then((data)=>{
      this.categoryName='';
      alert(data);
      this.getCategories();
    });
    }

  async promptNewCategory() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
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
            this.categoryName=data.newCategory;
            this.addCategory();
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

ngOnInit(){
  this.getCategories()
}

goToTask(){
  this.navController.navigateForward("/TaskCategory");
}

parcent(cat: string){
  return this.categoriesService.parcentageCat(cat);
}

}
