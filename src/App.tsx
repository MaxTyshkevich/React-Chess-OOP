import React, { useEffect, useState } from "react";

import "./App.css";
import { BoardComponent } from "./components/BoardComponent";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer
    );
  };

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  return (
    <>
      <h3>
        Текущий ход: <span className="showPlayer">{currentPlayer?.color}</span>
      </h3>
      <div className="app">
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
      </div>
    </>
  );
}

export default App;
