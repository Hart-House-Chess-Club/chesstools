'use client';

import React, { useEffect, useRef, useState, useMemo } from "react";

// import Chess from 'chess.js';
import { Chess, Square } from 'chess.js';

import dynamic from "next/dynamic";
import Engine from "./stockfish/engine";

// const ChessboardDnDProvider = dynamic(
//   () => import("react-chessboard").then((mod) => mod.ChessboardDnDProvider),
//   { ssr: false }
// );

const Chessboard = dynamic(
  () => import("react-chessboard").then((mod) => mod.Chessboard),
  { ssr: false }
);

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

// type Pc = "wP" | "wN" | "wB" | "wR" | "wQ" | "wK" | "bP" | "bN" | "bB" | "bR" | "bQ" | "bK"

const buttonStyle = {
  cursor: "pointer",
  padding: "10px 20px",
  margin: "10px 10px 0px 0px",
  borderRadius: "6px",
  backgroundColor: "#f0d9b5",
  border: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
};

const inputStyle = {
  padding: "10px 20px",
  margin: "10px 0 10px 0",
  borderRadius: "6px",
  border: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
  width: "100%",
};

export  default function AnalysisBoard() {
    const engine = useMemo(() => new Engine(), []);
    const game = useMemo(() => new Chess(), []);
    const inputRef = useRef<HTMLInputElement>(null);
    const [chessBoardPosition, setChessBoardPosition] = useState(game.fen());
    const [positionEvaluation, setPositionEvaluation] = useState(0);
    const [depth, setDepth] = useState(10);
    const [bestLine, setBestline] = useState("");
    const [possibleMate, setPossibleMate] = useState("");
  
    function findBestMove() {
      engine.evaluatePosition(chessBoardPosition, 18);
  
      engine.onMessage(({ positionEvaluation, possibleMate, pv, depth }) => {
        if (depth && depth < 10) return;
  
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        positionEvaluation &&
          setPositionEvaluation(
            ((game.turn() === "w" ? 1 : -1) * Number(positionEvaluation)) / 100
          );

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        possibleMate && setPossibleMate(possibleMate);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        depth && setDepth(depth);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        pv && setBestline(pv);
      });
    }

    // function onDrop(sourceSquare: Square, targetSquare: Square, piece: string) {
      function onDrop(sourceSquare: Square, targetSquare: Square) {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          // promotion: piece[1].toLowerCase() ?? "q",
          promotion: "q",
        });
        setPossibleMate("");
        setChessBoardPosition(game.fen());
    
        // illegal move
        if (move === null) return false;
    
        engine.stop();
        setBestline("");
    
        if (game.game_over() || game.in_draw()) return false;
    
        return true;
      }
    
      useEffect(() => {
        if (!game.game_over() || game.in_draw()) {
          findBestMove();
        }
      }, [chessBoardPosition]);
    
      const bestMove = bestLine?.split(" ")?.[0];
      const handleFenInputChange = (e: { target: { value: string; }; }) => {
        const { valid } = game.validate_fen(e.target.value);
    
        if (valid && inputRef.current) {
          inputRef.current.value = e.target.value;
          game.load(e.target.value);
          setChessBoardPosition(game.fen());
        }
      };
      return (
        <div style={boardWrapper}>
          <h4>
            Position Evaluation:{" "}
            {possibleMate ? `#${possibleMate}` : positionEvaluation}
            {"; "}
            Depth: {depth}
          </h4>
          <h5>
            Best line: <i>{bestLine.slice(0, 40)}</i> ...
          </h5>
          <input
            ref={inputRef}
            style={{ ...inputStyle, width: "90%" }}
            onChange={handleFenInputChange}
            placeholder="Paste FEN to start analysing custom position"
          />
          <Chessboard
            id="AnalysisBoard"
            position={chessBoardPosition}
            onPieceDrop={onDrop}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            customArrows={
              bestMove
                ? [
                    [
                      bestMove.substring(0, 2) as Square,
                      bestMove.substring(2, 4) as Square,
                      "rgb(0, 128, 0)",
                    ],
                  ]
                : undefined
            }
          />
          <button
            style={buttonStyle}
            onClick={() => {
              setPossibleMate("");
              setBestline("");
              game.reset();
              setChessBoardPosition(game.fen());
            }}
          >
            reset
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              setPossibleMate("");
              setBestline("");
              game.undo();
              setChessBoardPosition(game.fen());
            }}
          >
            undo
          </button>
        </div>
      );
    };
    