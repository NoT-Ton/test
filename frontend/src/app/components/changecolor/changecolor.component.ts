import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-changecolor',
  templateUrl: './changecolor.component.html',
  styleUrls: ['./changecolor.component.css']
})
export class ChangecolorComponent implements OnInit {

  Edit: boolean = false; 
  
  @Output() messageEvent = new EventEmitter<string>();
  colorProperty: string = '';
  r: number = 255;
  g: number = 255;
  b: number = 255;

  constructor() { }

  ngOnInit(): void {
  }

  ngStyleMethod(){
    this.colorProperty = 'rgb('+this.r+','+this.g+','+this.b+')'
    this.messageEvent.emit(this.colorProperty)
  }

  onClick(){
    this.Edit = !this.Edit
  }

}
