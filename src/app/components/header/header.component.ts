import {Component, inject, OnInit} from '@angular/core';
import {ThemeService} from '../../shared/theme/theme.service';
import {Theme} from '../../shared/theme/theme.enum';
import {FileService} from '../../shared/file/file.service';
import {TranslatePipe} from '@ngx-translate/core';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {OpenDialogService} from '../../shared/open-dialog/open-dialog.service';
import {EventObserveService} from '../../shared/event/event-observe.service';
import {DEFAULT_APP_VERSION} from '../../dialogs/news/news';
import {environment} from '../../../environments/environment';

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
  private fileService = inject(FileService);
  private openDialogService = inject(OpenDialogService);
  private eventObserveService = inject(EventObserveService);

  readonly defaultAppVersion = DEFAULT_APP_VERSION;

  protected readonly Theme = Theme;
  currentTheme: Theme = null;

  showNewsAttention: boolean;

  ngOnInit() {
    this._changeAppTheme();

    this._changeAppVersion();
  }

  public get DEFAULT_APP_VERSION(){
    return DEFAULT_APP_VERSION;
  }

  _changeAppTheme(){
    this.eventObserveService.currentAppTheme$.subscribe( currentTheme => {
      if (currentTheme) this.currentTheme = currentTheme;
    })
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
    this.fileService.openFileInNewTab(environment.frontendURL + '/assets/files/TZ-0067-2025-CALC-MAT.pdf', 'tz-test')
  }

  onClickToggleTheme(): void {
    const newTheme = this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.eventObserveService.changeAppTheme(newTheme);
  }
}
