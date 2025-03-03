import { Component } from '@angular/core';
import {RemovingImbalanceFromList} from '../../shared/data/removing-imbalance-from';
import {MaterialProcessingList} from '../../shared/data/material-processing';
import {CalculateComponent} from '../../components/calculate/calculate.component';

@Component({
  selector: 'app-main',
  imports: [
    CalculateComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  host: {'class': "d-flex flex-grow-1 soft-white-gray-bg"}
})
export class MainComponent {



}
