import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service'


@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {
  flagCircle = false;
  flagLine = false;
  once = false;
  colorArray = ["green", "yellow", "skyblue"];
  svgX = 10;
  svgY = 10;
  flagCircleSelected = false;
  flagLineSelected = false;
  centreShapeX;
  centreShapeY;
  rectPath;


  constructor() { }

  ngOnInit(): void {

    this.init()
  }

  init() {

    document.getElementById('drawingBoard').addEventListener('mousedown', (e) => {

      if ((this.flagCircleSelected) || (this.flagLineSelected)) {

        if (this.flagCircleSelected) this.flagCircle = true;

        if (this.flagLineSelected) this.flagLine = true;

        this.fixStartingPoint(e.pageX - this.svgX, e.pageY - this.svgY);

      }

    });

    document.getElementById('drawingBoard').addEventListener('mouseup', (e) => {

      this.flagCircle = false;
      this.flagLine = false;

    })

    document.getElementById('drawingBoard').addEventListener('mousemove', (e) => {

      if (this.flagCircle) {

        this.drawCircle(e.pageX - this.svgX, e.pageY - this.svgY);

      }
      if (this.flagLine) {

        this.drawRectangle(e.pageX - this.svgX, e.pageY - this.svgY);

      }


    })


  }
  // The `fixStartingPoint` function return the `path` in String format

  fixStartingPoint(x, y) {

    this.centreShapeX = x;
    this.centreShapeY = y;
    this.rectPath = "M " + this.centreShapeX + " " + this.centreShapeY;


  }


  // The `drawCircle` function return the `path` in String format
  drawCircle(x, y) {

    if (this.flagCircle) {
      //this.clearAll();

      var svgNS = 'http://www.w3.org/2000/svg';

      var pathEl = document.createElementNS(svgNS, 'path');

      pathEl.setAttribute('id', 'path-graph');

      let svgEl = document.getElementById("myGroup");

      let startingPointX = x;

      let startingPointY = y;

      let r = Math.sqrt(Math.pow((startingPointX - this.centreShapeX), 2) + Math.pow((startingPointY - this.centreShapeY), 2));

      let circlePath = "M " + (this.centreShapeX + r) + " " + this.centreShapeY;

      for (let theta = 1; theta <= 360; theta++) {
        circlePath += " L " + (this.centreShapeX + r * Math.cos(theta * Math.PI / 180)) + " " + (this.centreShapeY + r * Math.sin(theta * Math.PI / 180));

      }
      pathEl.setAttribute("fill", this.colorArray[BoardService.selectedColor]);

      pathEl.setAttribute("stroke", this.colorArray[BoardService.selectedColor]);

      pathEl.setAttribute("stroke-width", this.colorArray[BoardService.selectedColor]);

      pathEl.setAttribute("d", circlePath);

      svgEl.appendChild(pathEl);

    }

  }

  drawRectangle(x, y) {

    if (this.flagLine) {

      var svgNS = 'http://www.w3.org/2000/svg';

      var pathEl = document.createElementNS(svgNS, 'path');

      pathEl.setAttribute('id', 'path-graph');

      let svgEl = document.getElementById("myGroup");

      let endPointX = x;

      let endPointY = y;

      this.rectPath += "L " + this.centreShapeX + " " + endPointY;

      this.rectPath += "L " + endPointX + " " + endPointY;

      this.rectPath += "L " + endPointX + " " + this.centreShapeY;

      this.rectPath += "L " + this.centreShapeX + " " + this.centreShapeY;

      pathEl.setAttribute("fill", this.colorArray[BoardService.selectedColor]);

      pathEl.setAttribute("stroke", this.colorArray[BoardService.selectedColor]);

      pathEl.setAttribute("stroke-width", this.colorArray[BoardService.selectedColor]);

      pathEl.setAttribute("d", this.rectPath);

      svgEl.appendChild(pathEl);


    }
  }



  selectShapeCircle() {
    this.flagCircle = false;
    this.flagLine = false;
    this.once = false;
    this.flagCircleSelected = false;
    this.flagLineSelected = false;
    this.flagCircleSelected = true;
    this.flagLineSelected = false;
    this.flagLine = false;
  }
  selectShapeLine() {
    this.flagCircle = false;
    this.flagLine = false;
    this.once = false;
    this.flagCircleSelected = false;
    this.flagLineSelected = false;
    this.flagLineSelected = true;
    this.flagCircleSelected = false;
    this.flagCircle = false;
  }

  clearAll() {
    let svgGroup = document.getElementById('myGroup');
    while (svgGroup.lastChild) {
      svgGroup.removeChild(svgGroup.lastChild);
    }

    this.flagCircle = false;
    this.flagLine = false;
    this.once = false;
    BoardService.selectedColor = 0;
    this.flagCircleSelected = false;
    this.flagLineSelected = false;


  }

}
