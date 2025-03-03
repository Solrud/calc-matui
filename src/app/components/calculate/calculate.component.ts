import { Component } from '@angular/core';
import {RemovingImbalanceFromList} from "../../shared/data/removing-imbalance-from";
import {MaterialProcessingList} from "../../shared/data/material-processing";

@Component({
  selector: 'app-calculate',
  imports: [],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss'
})
export class CalculateComponent {
  removalImbalanceFromList = RemovingImbalanceFromList;
  materialProcessingList = MaterialProcessingList;
}
