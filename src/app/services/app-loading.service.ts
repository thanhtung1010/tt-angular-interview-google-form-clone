import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AppLoadingService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public Toggle(enable: boolean) {
    const loading = this.document.querySelector('#main-loading');
    if (loading) {
      if (enable) {
        loading.setAttribute('style', 'display: flex');
      } else {
        loading.setAttribute('style', 'display: none');
      }
    }
  }
  public SetText(text: string) {
    const loading = this.document.getElementsByClassName('main-loading-text');
    if (loading[0] !== undefined) {
      loading[0].textContent = text;
    }
  }
}
