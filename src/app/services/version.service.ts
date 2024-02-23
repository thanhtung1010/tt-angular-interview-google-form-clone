import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class VersionService {
  private version: string = '';

  constructor() {}

  init() {
    const pkjson = require('../../../package.json');
    if (pkjson) {
      this.version = pkjson.version || '';
    }
  }

  get currentVersion(): string {
    return this.version;
  }
}
