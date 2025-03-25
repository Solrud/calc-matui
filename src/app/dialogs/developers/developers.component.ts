import {Component, inject} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-developers',
  imports: [
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.scss'
})
export class DevelopersComponent {
  activeModal = inject(NgbActiveModal);

  date: Date = new Date();

  onClickCancel(): void {
    this.activeModal.close();
  }

  protected readonly formatDate = formatDate;
}
