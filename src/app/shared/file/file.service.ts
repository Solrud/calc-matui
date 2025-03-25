import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  openFileInNewTab(filepath: string, tabName: string): void{
    window.open(filepath, tabName)
  }
}
