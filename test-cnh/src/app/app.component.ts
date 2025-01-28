import { AfterViewInit, Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { encode } from 'base64-arraybuffer';
import ScanbotSDK from 'scanbot-web-sdk';
import QrScanner from 'qr-scanner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'test-cnh';

  imgBase64: string | null = null;
  resultOfAnalisys!:
    | 'NO_DOCUMENT'
    | 'VERY_POOR'
    | 'POOR'
    | 'REASONABLE'
    | 'GOOD'
    | 'EXCELLENT';

  private documentScanner: any;
  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
  ];
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

  async ngAfterViewInit(): Promise<void> {
    console.log(document.getElementById('video'));
    const qrScanner = new QrScanner(
      document.getElementById('video') as HTMLVideoElement,
      (result) => console.log('decoded qr code:', result),
      {
        preferredCamera: 'environment',
        returnDetailedScanResult: true,
        maxScansPerSecond: 1,
        highlightCodeOutline: true,
        highlightScanRegion: true,
      }
    );
    qrScanner.start();
    // this.documentScanner = await ScanbotSDK.instance.createDocumentScanner({
    //   containerId: 'scanner',
    //   autoCaptureEnabled: true,
    //   spinnerColor: '#00b131',
    //   // Increase quality requirements
    //   acceptedAngleScore: 85, // Require straighter angles
    //   acceptedSizeScore: 85, // Require larger document size
    //   autoCaptureSensitivity: 0.75, // More sensitive auto-capture
    //   acceptedBrightnessThreshold: 100, // Require better lighting
    //   preferredCamera: 'back',
    //   videoConstraints: {
    //     facingMode: 'back',
    //     width: { ideal: 1920, max: 3840 }, // Increased resolution
    //     height: { ideal: 1080, max: 2160 },
    //     experimental: {
    //       focusMode: 'continous',
    //       focusDistance: 0,
    //     },
    //   } as MediaTrackConstraints,
    //   text: {
    //     hint: {
    //       OK: 'Documento detectado com sucesso!',
    //       OK_SmallSize:
    //         'O documento está muito pequeno. Aproxime mais a câmera.',
    //       OK_BadAngles:
    //         'Ângulo ruim. Mantenha a câmera reta sobre o documento.',
    //       OK_BadAspectRatio:
    //         'Gire o dispositivo para que o documento se encaixe melhor na tela.',
    //       OK_OffCenter: 'Centralize o documento na tela.',
    //       Error_NothingDetected: 'Posicione a CNH no centro da tela.',
    //       Error_Brightness:
    //         'Ambiente muito escuro. Tente melhorar a iluminação.',
    //       Error_Noise:
    //         'Mova o documento para uma superfície limpa e sem reflexos.',
    //     },
    //   },
    //   onDocumentDetected: async (res) => {
    //     if (!res.success) {
    //       return;
    //     }
    //     try {
    //       // Process the image for better text recognition
    //       const imageProcessor = await ScanbotSDK.instance.createImageProcessor(
    //         res.cropped
    //       );
    //       const filter = new ScanbotSDK.imageFilters.CustomBinarizationFilter();
    //       filter.outputMode = 'ANTIALIASED';
    //       await imageProcessor.applyFilter(filter);
    //       // Analyze document quality
    //       const analyser =
    //         await ScanbotSDK.instance.createDocumentQualityAnalyzer({
    //           maxImageSize: 3000,
    //           patchSize: 1500,
    //         });
    //       const qualityResult = await analyser.analyze(res.cropped);
    //       this.resultOfAnalisys = qualityResult.quality;
    //       // Only proceed if quality is GOOD or EXCELLENT
    //       if (
    //         qualityResult.quality !== 'GOOD' &&
    //         qualityResult.quality !== 'EXCELLENT'
    //       ) {
    //         this.documentScanner.enableAutoCapture(); // Re-enable capture for next attempt
    //         return;
    //       }
    //       // If all checks pass, save the image
    //       const base64 = encode(res.cropped);
    //       this.imgBase64 = 'data:image/png;base64,' + base64;
    //       // Temporarily disable auto-capture after successful detection
    //       this.documentScanner.disableAutoCapture();
    //       // Re-enable after a short delay
    //       setTimeout(() => {
    //         this.documentScanner.enableAutoCapture();
    //       }, 2000);
    //     } catch (error) {
    //       console.error('Error processing document:', error);
    //       this.documentScanner.enableAutoCapture();
    //     }
    //   },
    //   onCaptureButtonClick: (res) => {
    //     console.log('Manual capture:', res);
    //   },
    //   onError: (error) => {
    //     console.error('Scanner error:', error);
    //     this.documentScanner?.enableAutoCapture();
    //   },
    // });
  }

  scanSuccessHandler(event: any) {
    console.log('scanSuccessHandler', event);
  }
  onTorchCompatible(event: any) {
    console.log('onTorchCompatible', event);
  }
  camerasFoundHandler(event: any) {
    console.log('camerasFoundHandler', event);
  }
  camerasNotFoundHandler(event: any) {
    console.log('camerasNotFoundHandler', event);
  }
  scanErrorHandler(event: any) {
    console.log('scanErrorHandler', event);
  }

  scanCompleteHandler(event: any) {
    console.log('scanCompleteHandler', event);
  }
}
