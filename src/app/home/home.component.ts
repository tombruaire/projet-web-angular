import { Component, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements   
AfterViewInit {
  
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

}
