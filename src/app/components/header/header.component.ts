import {Component, inject, OnInit} from '@angular/core';
import {ThemeService} from '../../shared/theme/theme.service';
import {Theme} from '../../shared/theme/theme.enum';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private themeService = inject(ThemeService);

  currentTheme: Theme;

  ngOnInit() {
    this.currentTheme = this.themeService.getTheme;
  }

  protected readonly Theme = Theme;

  onClickToggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getTheme;
  }


}
