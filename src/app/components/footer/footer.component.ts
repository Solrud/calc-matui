import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from "@ngx-translate/core";
import {OpenDialogService} from '../../shared/open-dialog/open-dialog.service';

@Component({
  selector: 'app-footer',
    imports: [DatePipe, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  private openDialogService = inject(OpenDialogService);

  date: Date;

  ngOnInit() {
    this.date = new Date();
  }

  onClickOpenDevInfoDialog(): void{
    this.openDialogService.openDevelopersDialog();
  }
}
