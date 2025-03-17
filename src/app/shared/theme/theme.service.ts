import {Injectable} from '@angular/core';
import {Theme} from './theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService{
  private currentTheme: Theme | null = null;

  constructor() {
    if (!this.currentTheme) {
      this.currentTheme = Theme.LIGHT;
      document.body.classList.add(this.currentTheme + '-theme');
    }
  }

  get getTheme(): Theme{
    return this.currentTheme;
  }

  toggleTheme(): void{
    if (this.currentTheme){
      document.body.classList.remove(this.currentTheme + '-theme');
    }
    const newTheme = this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.currentTheme = newTheme;

    document.body.classList.add(this.currentTheme + '-theme');
  }
}
