import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
}

export const CellComponent: FC<CellProps> = ({ cell }) => {
  return (
    <div className={`cell ${cell.color}`}>
      {cell.figure?.logo && (
        <img className="figure" src={cell.figure.logo} alt={cell.figure.name} />
      )}
    </div>
  );
};
