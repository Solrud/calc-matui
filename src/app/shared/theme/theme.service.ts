import {Injectable} from '@angular/core';
import {Theme} from './theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService{
  currentTheme: Theme | null = null;

  constructor() {
    if (!this.currentTheme) {
      this.currentTheme = Theme.LIGHT;
      document.body.classList.add(this.currentTheme + '-theme');
    }
  }

  toggleTheme(){
    if (this.currentTheme){
      document.body.classList.remove(this.currentTheme + '-theme');
    }
    const newTheme = this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.currentTheme = newTheme;

    document.body.classList.add(this.currentTheme + '-theme');
  }
}
