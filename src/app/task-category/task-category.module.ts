import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskCategoryPageRoutingModule } from './task-category-routing.module';

import { TaskCategoryPage } from './task-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskCategoryPageRoutingModule
  ],
  declarations: [TaskCategoryPage]
})
export class TaskCategoryPageModule {}
