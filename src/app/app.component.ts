import {Component, inject} from '@angular/core';
import {ThemeService} from './shared/theme/theme.service';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {'class': "d-flex flex-column h-100 w-100"}
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
