import { Component, OnInit } from '@angular/core';
import { ScanService } from '../../services/scan.service';
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {
  constructor(public scan:ScanService) { }
    }
