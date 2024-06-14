import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pdf-file',
  templateUrl: './pdf-file.component.html',
  styleUrl: './pdf-file.component.css'
})
export class PdfFileComponent implements OnInit {
  pdfSrc: any;
  constructor(private repo: RepositoryService,private rout:Router,private activeUrl:ActivatedRoute) { }
    ngOnInit(): void {
      this.activeUrl.queryParams.subscribe(result => {
        this.loadPdf(result['id']);
      });
  }
  loadPdf(id:number) {
    this.repo.getFile(id).subscribe((response) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfSrc = fileURL;
    });
  }


}
