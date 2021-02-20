import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public static selectedColor = 0;

  constructor() { }

  selectColor(currentColorNum) {
    BoardService.selectedColor = currentColorNum - 1;
  }
}
