import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoadingService } from './services';

@Component({
  selector: 'tt-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [AppLoadingService],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'google-form-clone';

  constructor(private appLoadingService: AppLoadingService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const timeout = setTimeout(() => {
      this.appLoadingService.Toggle(false);
      clearTimeout(timeout);
    }, 2000);
  }
}
