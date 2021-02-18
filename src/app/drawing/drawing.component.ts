import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {
  flagCircle = false;
  flagLine = false;
  d = "";
  xArray = [];
  yArray = [];
  radiusArray = [];
  once = false;
  colorArray = ["green", "yellow", "skyblue"];
  selectedColor = "green";
  svgX = 10;
  svgY = 10;
  flagCircleSelected = false;
  flagLineSelected = false;
  cnt = 0;


  constructor() { }

  ngOnInit(): void {

    this.init()
  }

  init() {

    document.getElementById('drawingBoard').addEventListener('mousedown', (e) => {

      if ((!this.once) && (this.flagCircleSelected) || (this.flagLineSelected)) {

        if (this.flagCircleSelected) this.flagCircle = true;

        if (this.flagLineSelected) this.flagLine = true;

        this.cnt++;

        this.once = true;

        var svgNS = 'http://www.w3.org/2000/svg';

        let svgEl = document.getElementById("myGroup");

        var pathEl = document.createElementNS(svgNS, 'path');

        pathEl.setAttribute('d', this.getSinPathMouseDown(e.pageX - this.svgX, e.pageY - this.svgY));

        // console.log("e.pageX", e.pageX);
        //  console.log("e.pageY", e.pageY);

        pathEl.setAttribute('id', 'path-graph' + this.cnt);

        pathEl.setAttribute("fill", "white");

        pathEl.setAttribute("stroke", this.selectedColor);

        pathEl.setAttribute("stroke-width", this.selectedColor);

        svgEl.appendChild(pathEl);
      }




    });

    document.getElementById('drawingBoard').addEventListener('mouseup', (e) => {

      if (this.flagCircle) {
        let sumX = 0;
        let sumY = 0;
        let radiusSum = 0;
        let meanRadius;
        // console.log("this.xArray.length", this.xArray.length);
        // console.log("this.yArray.length", this.yArray.length);

        for (let i = 0; i < this.xArray.length; i++) {
          sumX += this.xArray[i];
          sumY += this.yArray[i];


        }

        let centreX = sumX / this.xArray.length;
        let centreY = sumY / this.yArray.length;

        for (let i = 0; i < this.xArray.length; i++) {

          radiusSum += Math.sqrt(Math.pow((this.xArray[i] - centreX), 2) + Math.pow((this.yArray[i] - centreY), 2))
        }

        meanRadius = radiusSum / this.xArray.length;

        var svgNS = 'http://www.w3.org/2000/svg';

        let svgEl = document.getElementById("myGroup");

        var circle = document.createElementNS(svgNS, 'circle');

        circle.setAttribute("cx", centreX + '');
        circle.setAttribute("cy", centreY + '');

        circle.setAttribute("r", meanRadius + '');

        circle.setAttribute("stroke", this.selectedColor);

        circle.setAttribute("stroke-width", "3");

        circle.setAttribute("fill", this.selectedColor);

        svgEl.appendChild(circle);

        this.d = "";
        this.xArray = [];
        this.yArray = [];
        this.radiusArray = [];
        this.once = false;
      }
      else {
        if (this.flagLine) {
          let xMin = this.xArray[0];
          let xMax = this.xArray[0];
          let yMin = this.yArray[0];
          let yMax = this.yArray[0];

          for (let i = 1; i < this.xArray.length; i++) {
            if (this.xArray[i] < xMin) {
              xMin = this.xArray[i];
            }
            if (this.xArray[i] > xMax) {
              xMax = this.xArray[i];
            }
          }

          for (let i = 1; i < this.yArray.length; i++) {
            if (this.yArray[i] < yMin) {
              yMin = this.yArray[i];
            }
            if (this.yArray[i] > yMax) {
              yMax = this.yArray[i];
            }
          }


          // console.log("xMin",xMin);
          // console.log("xMax",xMax);
          // console.log("yMin",yMin);
          //console.log("yMax",yMax);

          var svgNS = 'http://www.w3.org/2000/svg';

          let svgEl = document.getElementById("myGroup");

          var rectangle = document.createElementNS(svgNS, 'rect');

          rectangle.setAttribute("x", xMin + '');
          rectangle.setAttribute("y", yMin + '');

          rectangle.setAttribute("width", (xMax - xMin) + '');

          rectangle.setAttribute("height", (yMax - yMin) + '');

          rectangle.setAttribute("stroke", this.selectedColor);

          rectangle.setAttribute("stroke-width", "3");

          rectangle.setAttribute("fill", this.selectedColor);

          svgEl.appendChild(rectangle);

          this.d = "";
          this.xArray = [];
          this.yArray = [];
          this.radiusArray = [];
          this.once = false;

        }

      }
      this.flagCircle = false;
      this.flagLine = false;

    })

    document.getElementById('drawingBoard').addEventListener('mousemove', (e) => {

      if (this.flagCircle || this.flagLine) {
        let pathEl = document.getElementById("path-graph" + this.cnt);

        pathEl.setAttribute('d', this.getSinPathMouseMove(e.pageX - this.svgX, e.pageY - this.svgY));

      }

    })


  }
  // The `getSinPathMouseDown` function return the `path` in String format

  getSinPathMouseDown(x, y) {

    this.d += "M " + x + " " + y;


    this.xArray.push(x);
    this.yArray.push(y);


    return this.d;
  }


  // The `getSinPathMouseMove` function return the `path` in String format
  getSinPathMouseMove(x, y) {

    this.d += " L " + x + " " + y;

    if (this.flagCircle) {
      if (Math.abs(x - this.xArray[this.xArray.length - 1]) >= 3) {
        this.xArray.push(x);
        this.yArray.push(y);
      }
    }


    if (this.flagLine) {
      this.xArray.push(x);
      this.yArray.push(y);
    }


    return this.d;
  }

  selectColor(num) {
    this.selectedColor = this.colorArray[num - 1];

  }

  selectShapeCircle() {
    this.flagCircle = false;
    this.flagLine = false;
    this.d = "";
    this.xArray = [];
    this.yArray = [];
    this.radiusArray = [];
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
    this.d = "";
    this.xArray = [];
    this.yArray = [];
    this.radiusArray = [];
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
    this.d = "";
    this.xArray = [];
    this.yArray = [];
    this.radiusArray = [];
    this.once = false;
    this.selectedColor = "green";
    this.flagCircleSelected = false;
    this.flagLineSelected = false;

    this.init()

  }

}
