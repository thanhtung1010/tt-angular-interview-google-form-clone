import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tt-page-layout',
  templateUrl: './page-layout.component.html',
  standalone: true
})
export class PageLayoutComponent implements OnInit {
  @Input() showTitle: boolean = true;
  @Input() showContent: boolean = true;
  @Input() showFooter: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
