"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import useStockfish from "@/components/stockfish/engine";
import { Chess, Square } from "chess.js";

const Chessboard = dynamic(
  () => import("react-chessboard").then((mod) => mod.Chessboard),
  { ssr: false }
);

const LEVELS = [
  { label: "Beginner", skill: 1, elo: "~800" },
  { label: "Easy", skill: 3, elo: "~1100" },
  { label: "Intermediate", skill: 6, elo: "~1400" },
  { label: "Advanced", skill: 10, elo: "~1800" },
  { label: "Master", skill: 15, elo: "~2200" },
  { label: "Maximum", skill: 20, elo: "~2600+" },
];

export default function PlayStockfishPage() {
  const [level, setLevel] = useState(1);
  const [game, setGame] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [waiting, setWaiting] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const stockfish = useStockfish();

  // Reset game and Stockfish on level change
  useEffect(() => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setStatus("");
    setWaiting(false);
    setMoveHistory([]);
    stockfish.init();
    // Set skill level
    setTimeout(() => {
      // Stockfish skill level: 0-20
      stockfish.evaluatePosition(`setoption name Skill Level value ${level}`);
    }, 200);
    // eslint-disable-next-line
  }, [level]);

  // Stockfish move handler
  const makeStockfishMove = () => {
    setWaiting(true);
    stockfish.evaluatePosition(game.fen(), 12);
    stockfish.onMessage((msg) => {
      if (msg.bestMove) {
        const move = {
          from: msg.bestMove.slice(0, 2) as Square,
          to: msg.bestMove.slice(2, 4) as Square,
          promotion: "q" as "q" | "n" | "b" | "r" | undefined,
        };
        const moveResult = game.move(move);
        if (moveResult) {
          setGame(new Chess(game.fen()));
          setFen(game.fen());
          // Save position to history
          setMoveHistory([...moveHistory, game.fen()]);
        }
        setWaiting(false);
        if (game.game_over()) setStatus("Game over");
      }
    });
  };

  // User move handler
  function onDrop(sourceSquare: Square, targetSquare: Square) {
    if (waiting) return false;
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if (move === null) return false;
    
    // Save current position to history before Stockfish responds
    setMoveHistory([...moveHistory, game.fen()]);
    
    setGame(new Chess(game.fen()));
    setFen(game.fen());
    setTimeout(() => makeStockfishMove(), 400);
    if (game.game_over()) setStatus("Game over");
    return true;
  }

  // Reset game
  function handleReset() {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setStatus("");
    setWaiting(false);
    setMoveHistory([]);
  }

  // Take back last move (both player's move and computer's response)
  function handleTakeback() {
    if (waiting || moveHistory.length < 1) return;
    
    // Get the position before the last move pair
    let targetPosition;
    if (moveHistory.length >= 2) {
      // Take back both computer and player moves
      targetPosition = moveHistory[moveHistory.length - 2];
      setMoveHistory(moveHistory.slice(0, -2));
    } else {
      // Only the player has moved, go back to start
      targetPosition = new Chess().fen();
      setMoveHistory([]);
    }
    
    // Set the board to that position
    const newGame = new Chess(targetPosition);
    setGame(newGame);
    setFen(newGame.fen());
    setStatus("");
  }

  return (
    <div className="mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Play Against Stockfish</h1>
      <div className="flex justify-center mb-4 gap-2">
        {LEVELS.map((l) => (
          <Button
            key={l.skill}
            variant={level === l.skill ? "default" : "outline"}
            onClick={() => setLevel(l.skill)}
            type="button"
          >
            {l.label} <span className="ml-1 text-xs opacity-70">{l.elo}</span>
          </Button>
        ))}
      </div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="space-y-4">
          <div className="w-full mx-auto">
            <div className="w-full max-w-3xl mx-auto">
              <Chessboard position={fen} onPieceDrop={onDrop} />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button 
              variant="outline" 
              onClick={handleTakeback}
              disabled={waiting || moveHistory.length < 1}
            >
              Take Back
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Play against Stockfish at different levels. The higher the level, the stronger the play.
            {waiting && <span className="ml-2 text-primary">Stockfish is thinking...</span>}
            {status && <span className="ml-2 text-red-500">{status}</span>}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
