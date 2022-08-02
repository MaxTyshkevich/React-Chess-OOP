import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = Math.random();
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) {
    /* ячейки перемещают фигуру */
    if (this.figure && this.figure.canMove(target)) {
      this.figure.moveFigure(target);
      target.setFigure(this.figure);

      this.figure = null;
    }
  }

  isEmptyVertical(target: Cell): boolean {
    if (target.x !== this.x) {
      return false;
    }
    const minY = Math.min(this.y, target.y) + 1;
    const maxY = Math.max(this.y, target.y);

    for (let y = minY; y < maxY; y++) {
      if (!this.board.getCell(target.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorisontal(target: Cell): boolean {
    if (target.y !== this.y) {
      return false;
    }
    const minX = Math.min(this.x, target.x) + 1;
    const maxX = Math.max(this.x, target.x);

    for (let x = minX; x < maxX; x++) {
      if (!this.board.getCell(x, target.y).isEmpty()) {
        return false;
      } /* есть вопросы !!! */
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX !== absY) {
      return false;
    }

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell) {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }
}
