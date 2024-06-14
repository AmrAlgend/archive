import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './components/files/files.component';
import { PdfFileComponent } from './components/pdf-file/pdf-file.component';

const routes: Routes = [
  {
    path: '',
    component: FilesComponent,
    pathMatch:'full'
  },
  {
    path: 'show',
    component: PdfFileComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
