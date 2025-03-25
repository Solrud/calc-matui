import { Injectable } from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {DevelopersComponent} from '../../dialogs/developers/developers.component';
import {NewsComponent} from '../../dialogs/news/news.component';

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {
  toCenteredModal: boolean = false;

  constructor(private modalService: NgbModal,
              private configModalDialog: NgbModalConfig) {
    configModalDialog.backdrop = 'static';
    configModalDialog.keyboard = false;
  }

  // ? Модальное окно информации о разработчиках
  openDevelopersDialog(){
    const openDevelopersDialog = this.modalService
      .open(DevelopersComponent, {
      scrollable: true,
      size: "lg",
      centered: this.toCenteredModal
    });
    return openDevelopersDialog;
  }

  // ? Модальное окно новостей ПО
  openNewsDialog(){
    const openNewsDialog = this.modalService
      .open(NewsComponent, {
      scrollable: true,
      size: "xl",
      centered: this.toCenteredModal
    });
    return openNewsDialog;
  }
}
