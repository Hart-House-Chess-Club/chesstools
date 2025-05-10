"use client";

import { useState, useRef, useEffect } from "react";
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
  { label: "Beginner", skill: 1 },
  { label: "Easy", skill: 3 },
  { label: "Intermediate", skill: 6 },
  { label: "Advanced", skill: 10 },
  { label: "Master", skill: 15 },
  { label: "Maximum", skill: 20 },
];

export default function PlayStockfishPage() {
  const [level, setLevel] = useState(1);
  const [game, setGame] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [waiting, setWaiting] = useState(false);
  const [status, setStatus] = useState<string>("");
  const stockfish = useStockfish();

  // Reset game and Stockfish on level change
  useEffect(() => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setStatus("");
    setWaiting(false);
    stockfish.init();
    // Set skill level
    setTimeout(() => {
      // Stockfish skill level: 0-20
      stockfish.worker?.postMessage(`setoption name Skill Level value ${level}`);
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
          from: msg.bestMove.slice(0, 2),
          to: msg.bestMove.slice(2, 4),
          promotion: "q",
        };
        const moveResult = game.move(move);
        if (moveResult) {
          setGame(new Chess(game.fen()));
          setFen(game.fen());
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
            {l.label}
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
