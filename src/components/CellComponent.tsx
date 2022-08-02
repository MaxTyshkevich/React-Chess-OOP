import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  handleClick: (cell: Cell) => void;
}

export const CellComponent: FC<CellProps> = ({
  cell,
  selected,
  handleClick,
}) => {
  return (
    <div
      className={`cell ${cell.color} ${selected && "selected"}`}
      onClick={() => handleClick(cell)}
      style={{ background: cell.available && cell.figure ? "green" : "" }}
    >
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && (
        <img className="figure" src={cell.figure.logo} alt={cell.figure.name} />
      )}
    </div>
  );
};
