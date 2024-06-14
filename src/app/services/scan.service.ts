import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as scanner from 'scanner.js';
import { RepositoryService } from './repository.service';
import { PDFDocument, rgb } from 'pdf-lib';
@Injectable({
  providedIn: 'root'
})
export class ScanService {

  constructor(private http: HttpClient, private repo: RepositoryService) {

  }
  async startScan() {
    scanner.scan(this.displayImagesOnPage, {
      "output_settings": [{
        "type": "return-base64",
        "format": "jpg"
      }]
    });
  }
  displayImagesOnPage = async (successful: boolean, mesg: string, response: any) => {
    if (!successful) {
      console.error('Failed: ' + mesg);
      return;
    }

    if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) {
      console.info('User cancelled');
      return;
    }

    const scannedImages = scanner.getScannedImages(response);
    const pdfDoc = await PDFDocument.create();

    for (let i = 0; i < scannedImages.length; i++) {
      const scannedImage = scannedImages[i];
      const jpgImageBytes = scannedImage.src.split(',')[1];
      const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
      const jpgDims = jpgImage.scale(1);

      const page = pdfDoc.addPage([jpgDims.width, jpgDims.height]);
      page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgDims.width,
        height: jpgDims.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfFile = new Blob([pdfBytes], { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('pdfFile', pdfFile, 'scanned.pdf');

    this.repo.upload(formData).subscribe(response => {
      alert(response.message);
    }, error => {
      console.error('Error uploading PDF', error);
    });
  }
}
