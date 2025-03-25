import {Component, inject, OnInit} from '@angular/core';
import {ThemeService} from '../../shared/theme/theme.service';
import {Theme} from '../../shared/theme/theme.enum';
import {FileService} from '../../shared/file/file.service';
import {TranslatePipe} from '@ngx-translate/core';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {OpenDialogService} from '../../shared/open-dialog/open-dialog.service';
import {EventObserveService} from '../../shared/event/event-observe.service';
import {DEFAULT_APP_VERSION} from '../../dialogs/news/news';

@Component({
  selector: 'app-header',
  imports: [
    TranslatePipe,
    NgbTooltipModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private themeService = inject(ThemeService);
  private fileService = inject(FileService);
  private openDialogService = inject(OpenDialogService);
  private eventObserveService = inject(EventObserveService);

  readonly defaultAppVersion = DEFAULT_APP_VERSION;

  protected readonly Theme = Theme;
  currentTheme: Theme;

  showNewsAttention: boolean;

  ngOnInit() {
    this.currentTheme = this.themeService.getTheme;

    this._changeAppVersion();
  }

  public get DEFAULT_APP_VERSION(){
    return DEFAULT_APP_VERSION;
  }

  _changeAppVersion(){
    this.eventObserveService.currentAppVersion$.subscribe(currentVersion => {
      if (currentVersion) this.showNewsAttention = currentVersion != this.defaultAppVersion;
    })
  }

  onClickOpenNewsDialog(){
    this.openDialogService.openNewsDialog().closed.subscribe( () => {
      this.eventObserveService.changeAppVersion(this.defaultAppVersion);
    });
  }

  omClickOpenDevelopersInfoDialog(){
    this.openDialogService.openDevelopersDialog();
  }

  onClickOpenInstructionInNewTab(): void{
    this.fileService.openFileInNewTab('/assets/files/ТЗ № ТЗ-0067-2025 Разработка ПО для расчета съема материала с ДСЕ (19787472 v4).pdf', 'tz-test')
  }

  onClickToggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getTheme;
  }
}
