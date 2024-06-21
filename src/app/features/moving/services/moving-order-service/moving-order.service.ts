import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MovingDetailService} from "../moving-detail-service/moving-detail.service";

@Injectable(
)
export class MovingOrderService {

  uploadPromises: Promise<any>[];
  uploadedURLs: string[];

  constructor(private storage: AngularFireStorage, private movingDetailService: MovingDetailService) {
    this.uploadPromises = [];
    this.uploadedURLs = [];
  }
  uploadSingleFile(file: File, storageRef: any) {
    const uploadTask = storageRef.put(file);
    // Handle progress, success, and error events from uploadTask (optional)
    return uploadTask.then(() => {
      // Get download URL after successful upload (optional)
      return storageRef.getDownloadURL();
    })
  }

  async uploadMultipleFiles(files: Set<File>, filePath: string){
    const storageRef = this.storage.ref(filePath); // Replace with your path
    let results: any[];

    files.forEach(file =>{
      const fileRef = storageRef.child(file.name); // Create reference with filename
      this.uploadPromises.push(this.uploadSingleFile(file, fileRef));
    })

    // Wait for all uploads to finish using Promise.all
    try {
      results = await Promise.all(this.uploadPromises);
  }catch (error) {
      console.error("File upload failed:", error);
      return error;
    }finally {
      return results;
    }
  }

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
          // Download each item (file)
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
  }}
