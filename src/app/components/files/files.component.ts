import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { File } from '../../models/file';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent implements OnInit {
  data: File[];
  constructor(private repo: RepositoryService,private rout:Router) { this.data = []; }
    ngOnInit(): void {
      this.getFiles();
  }
  getFiles() {
    this.repo.getAllFiles().subscribe(result => {
      this.data = result;
    }, err => {
      console.log(err);
    });
  }
  showFile(id:number) {
    this.rout.navigate(['/show'], { queryParams: { id: id } });
  }
  downloadFile(id:number) {
    this.repo.getFile(id).subscribe((response) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = 'task.pdf';
      a.click();
    });
  }
}
