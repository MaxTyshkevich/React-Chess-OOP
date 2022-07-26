import React, { FC, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { CellComponent } from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selected, setSelected] = useState<Cell | null>(null);

  const handleClick = (cell: Cell): void => {
    if (cell.figure) {
      setSelected(cell);
    }
  };

  return (
    <div className="board">
      {board.cells.map((row, index) => {
        return (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                key={cell.id}
                selected={selected?.x === cell.x && selected?.y === cell.y}
                handleClick={handleClick}
              />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};
