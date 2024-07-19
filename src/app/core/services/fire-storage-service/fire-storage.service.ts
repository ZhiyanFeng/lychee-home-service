import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {MovingOrderService} from "../../../features/moving/services/moving-order-service/moving-order.service";
import {Payload} from "../../../features/moving/models/payload";
import {environment} from "../../../../environments/environment";

@Injectable(
)
export class FireStorageService {

  uploadPromises: Promise<any>[]
  uploadedURLs: string[];

  constructor(private storage: AngularFireStorage) {
    this.uploadPromises = [];
    this.uploadedURLs = [];
  }

  async uploadSingleFile(id: string, file: File) {
    let uploadPath = environment.payloadUploadPath + id + '/' + file.name;
    const storageRef = this.storage.ref(uploadPath); // Replace with your path
    let uploadTaskSnapShot = await this.storage.upload(uploadPath, file);
    let url = await uploadTaskSnapShot.ref.getDownloadURL();
    return url;
  }


  // async uploadFiles(files: Set<File>, filePath: string){
  //   const storageRef = this.storage.ref(filePath); // Replace with your path
  //   let results: any[];
  //
  //   files.forEach(payload =>{
  //     const fileRef = storageRef.child(payload.name); // Create reference with filename
  //     this.uploadPromises.push(this.uploadSingleFile(payload, fileRef));
  //   })
  //
  //   // Wait for all uploads to finish using Promise.all
  //   try {
  //     results = await Promise.all(this.uploadPromises);
  // }catch (error) {
  //     console.error("File upload failed:", error);
  //     return error;
  //   }finally {
  //     return results;
  //   }
  // }
  //
  // createObservableFromUpLoadFiles(files: Set<File>, filePath: string): Observable<any> {
  //   return of(this.uploadFiles(files, filePath));
  // }

  deleteSingleFile(file: File, storageRef: any) {
    const uploadTask = storageRef.put(file);
    // Handle progress, success, and error events from uploadTask (optional)
    return uploadTask.then(() => {
      // Get download URL after successful upload (optional)
      return storageRef.getDownloadURL();
    })
  }

  async deleteFiles(filePaths: string[]) {
    const deletionPromises = filePaths.map((filePath) => {
      const storageRef = this.storage.ref(filePath);
      return storageRef.delete();
    });

    Promise.all(deletionPromises)
      .then(() => {
        console.log('All files deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting files:', error);
      });
  }


  downloadFolder(folderPath: string) {
    const storageRef = this.storage.ref(folderPath);
    storageRef.listAll().subscribe({
      next: (result) => {
        for (const item of result.items) {
          // Download each item (payload)
          this.downloadFile(item.fullPath);
        }
      },
      error: (error) => {
        console.error("Error listing folder contents:", error);
      }
    });
  }

  downloadFile(filePath: string) {
    const storageRef = this.storage.ref(filePath);
    storageRef.getDownloadURL().subscribe(url => {
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filePath.split('/').pop(); // Extract filename
      downloadLink.click();
    });
  }
}
