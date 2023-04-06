import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskCategoryPage } from './task-category.page';

const routes: Routes = [
  {
    path: '',
    component: TaskCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskCategoryPageRoutingModule {}
