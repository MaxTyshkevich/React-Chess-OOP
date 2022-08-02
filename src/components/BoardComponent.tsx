import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { CellComponent } from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const handleClick = (cell: Cell): void => {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      updateBoard();
    } else {
      if (cell.figure) {
        setSelectedCell(cell);
      }
    }
  };

  const hightlightCells = (): void => {
    board.hightlightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = (): void => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  useEffect(() => {
    hightlightCells();
  }, [selectedCell]);

  return (
    <div className="board">
      {board.cells.map((row, index) => {
        return (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                key={cell.id}
                selected={
                  selectedCell?.x === cell.x && selectedCell?.y === cell.y
                }
                handleClick={handleClick}
              />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};
