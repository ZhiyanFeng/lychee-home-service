import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Storage, ref, uploadBytesResumable, getDownloadURL, getStorage, listAll} from '@angular/fire/storage';

@Injectable(
)
export class FireStorageService {

  uploadPromises: Promise<any>[]
  uploadedURLs: string[];
  private storage = inject(Storage);
  downloadURL: string;

  constructor() {
    this.uploadPromises = [];
    this.uploadedURLs = [];
  }

  async uploadFile(id: string, file: File) {
    const uploadPath = environment.payloadUploadPath + id + '/' + file.name;
    const storageRef = ref(this.storage,uploadPath); // Replace with your path
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask;
    const downloadURL = getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
  }

  async loadFiles(path: string) {
    const folderRef = ref(this.storage,path);
    let files = {};

    let listResult = await listAll(folderRef);

    for(const itemRef of listResult.items){
      let url  = await getDownloadURL(itemRef);
      let name = itemRef.name;
      files[name] = url;
    }

    return files;
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
    // const deletionPromises = filePaths.map((filePath) => {
    //   const storageRef = this.storage.ref(filePath);
    //   return storageRef.delete();
    // });
    //
    // Promise.all(deletionPromises)
    //   .then(() => {
    //     console.log('All files deleted successfully!');
    //   })
    //   .catch((error) => {
    //     console.error('Error deleting files:', error);
    //   });
  }


  downloadFolder(folderPath: string) {
    // const storageRef = this.storage.ref(folderPath);
    // storageRef.listAll().subscribe({
    //   next: (result) => {
    //     for (const item of result.items) {
    //       // Download each item (payload)
    //       this.downloadFile(item.fullPath);
    //     }
    //   },
    //   error: (error) => {
    //     console.error("Error listing folder contents:", error);
    //   }
    // });
  }

  downloadFile(filePath: string) {
    // const storageRef = this.storage.ref(filePath);
    // storageRef.getDownloadURL().subscribe(url => {
    //   const downloadLink = document.createElement('a');
    //   downloadLink.href = url;
    //   downloadLink.download = filePath.split('/').pop(); // Extract filename
    //   downloadLink.click();
    // });
  }
}
