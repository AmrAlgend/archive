import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // تأكد من استخدام ملف البيئة الصحيح
import { Observable, from } from 'rxjs';
import { Response } from '../models/response';
import { File } from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.api;
  }

  upload(PdfFile: FormData): Observable<Response> {
    return this.http.post<Response>(this.baseURL+'Files/Upload',PdfFile).pipe();
  }
  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.baseURL + 'Files/GetAllFiles').pipe();
  }
  getFile(id: number): Observable<Blob> {
    return this.http.get(this.baseURL + 'Files/Download?id=' + id, { responseType: 'blob' });
  }
}
