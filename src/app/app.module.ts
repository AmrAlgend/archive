import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { HttpClientModule } from '@angular/common/http';
import {  PdfViewerModule } from 'ng2-pdf-viewer';
import { FilesComponent } from './components/files/files.component';
import { PdfFileComponent } from './components/pdf-file/pdf-file.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    FilesComponent,
    PdfFileComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
