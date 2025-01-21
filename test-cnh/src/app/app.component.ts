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

  onDocumentDetected: any;
  onCaptureButtonClick: any;
  onError: any;
  imgBase64: string | null = null;

  constructor() {
    ScanbotSDK.initialize({
      licenseKey:
        'pSP9P5YkZMgVL3o6ggNc5b1ftOoWNy' +
        'n5S7c0HHEWG1hLslylyjzTqoanJA0O' +
        'E8YMrBWDVnEUbdH9Pt0Clu4YgI/UyP' +
        '3gSu0xxLbCScbt04bXnUzluo3COVlm' +
        'DocGiQEDus74oWIk7k/dDxQ1W9hPiQ' +
        'Os1lC4P+8ZhF/YpCN08/DW2/ONH/jL' +
        'dYqBydo7tIpWrklf5MQZMAeVJNgv9m' +
        '2BmWcAkQdpX7F4vW3N0p14fmboL6v5' +
        'YBFnuVvKmMCDMffdds/I4CKFqEdvfA' +
        'fvMbR+pKFF/xToZhf90XgrLOw80JVy' +
        'aLTzu+CSOGOZI6c8hUQLvRlhAhXIpQ' +
        'B3x8kr/zZtmA==\nU2NhbmJvdFNESw' +
        'psb2NhbGhvc3R8dGVzdC1jbmgteTNt' +
        'eC52ZXJjZWwuYXBwCjE3MzgxMDg3OT' +
        'kKODM4ODYwNwo4\n',
    });
  }

  ngAfterViewInit(): void {
    ScanbotSDK.instance.createDocumentScanner({
      containerId: 'scanner',
      autoCaptureEnabled: true,
      onDocumentDetected: (res) => {
        console.log('onDocumentDetected', res);
        const cropped = ScanbotSDK.instance.cropAndRotateImageCcw(
          res.cropped,
          res.polygon,
          0
        );
        ScanbotSDK.instance
          .createImageProcessor(res.cropped)
          .then((processor) => {
            console.log('processor', processor);
          });

        console.log('croped', cropped);
      },
      onCaptureButtonClick: (res) => {
        console.log('onCaptureButtonClick', res);
      },
      onError: (res) => {
        console.log('onError', res);
      },
      spinnerColor: '#00b131',
      videoConstraints: {
        facingMode: 'back',
        width: { ideal: 800, max: 900 },
        height: { ideal: 600, max: 900 },
        experimental: {
          focusMode: 'continous',
          focusDistance: 0,
        },
      } as MediaTrackConstraints,
    });
    console.log('scanner', document.getElementById('scanner'));
  }
}
