import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BoardService } from '../board.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  selectedColor;
  @Output() ShapeCircle = new EventEmitter();
  @Output() ShapeLine = new EventEmitter();
  @Output() clear = new EventEmitter();

  @Input() flagCircleSelected: Boolean;
  @Input() flagLineSelected: Boolean;


  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
  }


  selectColor(num) {

    this.boardService.selectColor(num);

  }

  selectShapeCircle() {

    this.ShapeCircle.emit();
  }

  selectShapeLine() {

    this.ShapeLine.emit();
  }

  clearAll() {
    this.clear.emit();

  }
}
