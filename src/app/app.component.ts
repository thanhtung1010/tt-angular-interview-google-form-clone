import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoadingService } from './services';

@Component({
  selector: 'tt-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  providers: [
    AppLoadingService
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  title = 'google-form-clone';

  constructor(
    private appLoadingService: AppLoadingService,
  ) {}

  ngAfterViewInit(): void {
    const timeout = setTimeout(() => {
      this.appLoadingService.Toggle(false);
      clearTimeout(timeout);
    }, 2000);
  }
}
