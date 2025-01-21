import { AfterViewInit, Component } from '@angular/core';
import ScanbotSDK from 'scanbot-web-sdk';
import type { IDocumentScannerHandle } from 'scanbot-web-sdk/@types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'test-cnh';
  private documentScanner!: IDocumentScannerHandle;
  constructor() {
    ScanbotSDK.initialize({
      licenseKey: '',
    });
  }

  ngAfterViewInit(): void {
    console.log('scanner', document.getElementById('scanner'));
    ScanbotSDK.instance.createDocumentScanner({
      container: document.getElementById('scanner') as HTMLElement,
    });
  }
}
