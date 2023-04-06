import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Injectable({
  providedIn: 'root'
})


export class TodoService {
  modalCtlr: any;
  public photos: Photo[] = [];

  constructor(private storage: Storage,private camera: Camera) {
    this.init()
   }

  addTask(key, value){
    this.storage.set(key,value)
  }

  deleteTask(key){
    this.storage.remove(key)
  }

  updateTask(key, newValue){
    this.storage.set(key, newValue)
    this.getAllTasks()
  }

  getAllTasks(){
    let tasks: any = []
    this.storage.forEach((key, value, index) => {
    tasks.push({'key':value, 'value':key})
    }); 
    return tasks   
  }

  async init(){
    await this.storage.create()
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }
  
  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  async addPhoto(source: string) {
    if(source === 'camera'){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
          data: 'data:image/jpeg;base64,' + imageData
      }); }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
  });
  }
  else{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
          data: 'data:image/jpeg;base64,' + imageData
      }); }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
  });

  }
}
}
class Photo {
  data: any;
}
