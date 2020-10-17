import { Component, OnInit, Input } from '@angular/core';
import { Info } from '../info';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() info: Info;

  constructor() { }

  ngOnInit(): void {
  }

}
