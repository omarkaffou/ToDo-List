import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/SQLite/ngx';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
databaseObj: SQLiteObject;
table={
  categories: "categories",
  tasks: "tasks"
};

  constructor(private sqlite: SQLite){}

  async CreateDataBase(){
    await this.sqlite.create({
      name: "categories_db",
      location: "default",
    }).then((db: SQLiteObject) => {
      this.databaseObj=db;
    }).catch((e)=>{
      alert("error on creating database" + JSON.stringify(e));
    });
    await this.CreateTable()
  }
 async CreateTable(){
   await this.databaseObj.executeSql(
     `CREATE TABLE IF NOT EXISTS ${this.table.categories} (id INTEGER  PRIMARY KEY, name VARCHAR(30) NOT NULL UNIQUE)`,
     []
   );
   await this.databaseObj.executeSql(
    `CREATE TABLE IF NOT EXISTS ${this.table.tasks} (id INTEGER  PRIMARY KEY, name VARCHAR(30) NOT NULL,priority VARCHAR(8), due DATETIME, category VARCHAR(20))`,
    []
  );

 }

 async addCategory(name: string){
  return this.databaseObj.executeSql(
    `INSERT INTO ${this.table.categories} (name) VALUES ('${name}')`,
    []
  )
  .then(()=>{
    return "Category created";
  }).catch((e) =>{
    if(e.code === 6){
      return "category already exists"
    }
    return "error on creating category" +JSON.stringify(e);
  })
 }

 async addTask(name: string, priority: string, due: string, category: string){
  return this.databaseObj.executeSql(
    `INSERT INTO ${this.table.tasks} (name, priority, due, category) VALUES ('${name}','${priority}','${due}','${category}')`,
    []
  )
  .then(()=>{
    return "Task created";
  }).catch((e) =>{
    return "error on task" +JSON.stringify(e);
  })
 }

 async getCategories(){
   return this.databaseObj.executeSql(
     `SELECT C.id, C.name, count(T.category)*100/(SELECT count(*) FROM ${this.table.tasks}) AS nb
      FROM ${this.table.categories} C, ${this.table.tasks} T
      WHERE C.name=T.category
      GROUP BY T.category`,
     []
   ).then((res)=>{
    return res;
   }).catch((e)=>{
     alert("error on getting categories" + JSON.stringify(e));
   });
 }

 async getAllCategories(){
  return this.databaseObj.executeSql(
    `SELECT * FROM ${this.table.categories}`,
    []
  ).then((res)=>{
   return res;
  }).catch((e)=>{
    alert("error on getting categories" + JSON.stringify(e));
  });
}

 async getTasks(){
  return this.databaseObj.executeSql(
    `SELECT * FROM ${this.table.tasks}`,
    []
  ).then((res)=>{
    return res;
   }).catch((e)=>{
     return "error on getting tasks" + JSON.stringify(e);
   });
}

async getTasksCat(name: string){
  return this.databaseObj.executeSql(
    `SELECT * FROM ${this.table.tasks} WHERE category=${name}`,
    []
  ).then((res)=>{
    return res;
   }).catch((e)=>{
     return "error on getting tasks" + JSON.stringify(e);
   });
}

 async deleteCategory(id: number){
   return this.databaseObj.executeSql(`
    DELETE FROM ${this.table.categories} WHERE id=${id}`,[])
    .then(()=>{
      alert("category deleted")
    }).catch((e)=>{
      return "error on deleting category" + JSON.stringify(e);
    });
 }

 async deleteTask(id: number){
  return this.databaseObj.executeSql(`
   DELETE FROM ${this.table.tasks} WHERE id=${id}`,[])
   .then(()=>{
     return "task deleted"
   }).catch((e)=>{
     return "error on deleting task" + JSON.stringify(e);
   });
}

 async editCategory(name: string, id: number){
   return this.databaseObj.executeSql(
     `UPDATE ${this.table.categories} SET name='${name}' WHERE id=${id}`,
     []
   ).then(()=>{
    alert("category updated");
   }).catch((e)=>{
    if(e.code===6){
      return "Category already exist"
    }
    return "error on updating category" + JSON.stringify(e)
  });
 }

 async editTask(name: string, priority: string, due: string, category: string, id: number){
  return this.databaseObj.executeSql(
    `UPDATE ${this.table.tasks} SET name='${name}', priorirty='${priority}', due='${due}', category='${category}' WHERE id=${id}`,
    []
  ).then(()=>{
   return "Task updated"
  }).catch((e)=>{
   return "error on updating task" + JSON.stringify(e)
 });
}

async parcentageCat(category: string){
  var res1,res2
  res1=this.databaseObj.executeSql(
    `SELECT COUNT(*) FROM ${this.table.tasks}`
  )
  res1=parseInt(res1)
  res2=this.databaseObj.executeSql(
    `SELECT COUNT(*) FROM ${this.table.tasks} WHERE category='${category}'`
  )
    res2=parseInt(res2)
  return res2/res1;
}

}
