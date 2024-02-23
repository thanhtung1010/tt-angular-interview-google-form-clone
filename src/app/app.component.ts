import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoadingService, VersionService } from './services';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'tt-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  providers: [
    AppLoadingService,
    VersionService,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'google-form-clone';

  constructor(
    private appLoadingService: AppLoadingService,
    private versionService: VersionService,
  ) {}

  ngOnInit(): void {
    this.versionService.init();
  }

  ngAfterViewInit(): void {
    const timeout = setTimeout(() => {
      this.appLoadingService.Toggle(false);
      clearTimeout(timeout);
    }, 2000);
  }
}
