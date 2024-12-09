

// import { useState } from "react";
// import Chess from "chess.js";
// import { Chessboard } from "react-chessboard";

// export default function PlayRandomMoveEngine() {
//   const [game, setGame] = useState(new Chess());

//   function makeAMove(move) {
//     const gameCopy = { ...game };
//     const result = gameCopy.move(move);
//     setGame(gameCopy);
//     return result; // null if the move was illegal, the move object if the move was legal
//   }

//   function makeRandomMove() {
//     const possibleMoves = game.moves();
//     if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
//       return; // exit if the game is over
//     const randomIndex = Math.floor(Math.random() * possibleMoves.length);
//     makeAMove(possibleMoves[randomIndex]);
//   }

//   function onDrop(sourceSquare, targetSquare) {
//     const move = makeAMove({
//       from: sourceSquare,
//       to: targetSquare,
//       promotion: "q", // always promote to a queen for example simplicity
//     });

//     // illegal move
//     if (move === null) return false;
//     setTimeout(makeRandomMove, 200);
//     return true;
//   }

//   return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
// }