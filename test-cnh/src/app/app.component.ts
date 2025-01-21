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
        'dg5WgphDzZcb2YQNiPZ8Q3qRMz0Ktw' +
        'UQ6Ha+VUWtcsvdchmp8PeJgtGabUB2' +
        'siI+zd+3scGH0WGDv4DmUNINC9JKym' +
        '2vuPugLKawvJ3OxHsWtGWFv3mTM61a' +
        'IKYMgxSibTY3B0wTMOso5WnFZGTg7C' +
        'aDt21wRgMQm6c1anIiqHba14GVVESM' +
        '4U98RIORKTLp5BfgKmJjMlDYtK6Uhw' +
        '7UtlYJi4sYLaNcV1plM2Fx3cJEy4zV' +
        'zI4vrU+u56ylvuykBc38QZ56cepatC' +
        'eGkXS4LteKAwAqkE9IUHg32ItNWFjw' +
        'Yx3g6qJTQcFqEkMpV1auFYNC0RU2Zf' +
        'd7xN2zLHI7qQ==\nU2NhbmJvdFNESw' +
        'psb2NhbGhvc3R8dGVzdC1jbmgtOXk1' +
        'My52ZXJjZWwuYXBwCjE3MzgxMDg3OT' +
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
