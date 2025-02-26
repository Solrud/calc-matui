import {Component, inject} from '@angular/core';
import {ThemeService} from './shared/theme/theme.service';
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  theme = inject(ThemeService);
  constructor() {
    console.log(document.body.className);
  }

  test(){
    this.theme.toggleTheme();
  }
}
