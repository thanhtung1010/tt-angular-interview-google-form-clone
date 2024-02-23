import { Component, Input, OnInit } from '@angular/core';
import { VersionService } from '@app/services';

@Component({
  selector: 'tt-page-layout',
  templateUrl: './page-layout.component.html',
  standalone: true
})
export class PageLayoutComponent implements OnInit {
  @Input() showTitle: boolean = true;
  @Input() showContent: boolean = true;
  @Input() showFooter: boolean = true;

  constructor(private versionService: VersionService) { }

  ngOnInit() {
  }

}
