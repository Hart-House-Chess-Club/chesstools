'use client';

import { useMemo, useState } from "react";

// import Chess from 'chess.js';
import { Chess, PieceColor, PieceType, Square } from 'chess.js';
import { SparePiece } from "react-chessboard";

import dynamic from "next/dynamic";

const ChessboardDnDProvider = dynamic(
  () => import("react-chessboard").then((mod) => mod.ChessboardDnDProvider),
  { ssr: false }
);

const Chessboard = dynamic(
  () => import("react-chessboard").then((mod) => mod.Chessboard),
  { ssr: false }
);

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

type Pc = "wP" | "wN" | "wB" | "wR" | "wQ" | "wK" | "bP" | "bN" | "bB" | "bR" | "bQ" | "bK"

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

export default function ChessBoardEditor() {
  const game = useMemo(() => new Chess("8/8/8/8/8/8/8/8 w - - 0 1"), []); // empty board
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  const [boardWidth, setBoardWidth] = useState(360);
  const [fenPosition, setFenPosition] = useState(game.fen());
  const handleSparePieceDrop = (piece: string, targetSquare: Square) => {
    const color = piece[0] as PieceColor;
    const type = piece[1].toLowerCase() as PieceType;
    const success = game.put({
      type,
      color
    }, targetSquare);
    if (success) {
      setFenPosition(game.fen());
    } else {
      alert(`The board already contains ${color === "w" ? "WHITE" : "BLACK"} KING`);
    }
    return success;
  };
  const handlePieceDrop = (sourceSquare: Square, targetSquare: Square, piece: string) => {
    const color = piece[0] as PieceColor;
    const type = piece[1].toLowerCase() as PieceType;

    // this is hack to avoid chess.js bug, which I've fixed in the latest version https://github.com/jhlywa/chess.js/pull/426
    game.remove(sourceSquare);
    game.remove(targetSquare);
    const success = game.put({
      type,
      color
    }, targetSquare);
    if (success) setFenPosition(game.fen());
    return success;
  };
  const handlePieceDropOffBoard = (sourceSquare: Square) => {
    game.remove(sourceSquare);
    setFenPosition(game.fen());
  };
  const handleFenInputChange = (e: { target: { value: string; }; }) => {
    const fen = e.target.value;
    const {
      valid
    } = game.validate_fen(fen);
    setFenPosition(fen);
    if (valid) {
      game.load(fen);
      setFenPosition(game.fen());
    }
  };
  const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];
  return <div style={{
    ...boardWrapper,
    margin: "0 auto",
    maxWidth: "60vh"
  }}>
      <ChessboardDnDProvider>
        <div>
          <div style={{
          display: "flex",
          margin: `${boardWidth / 32}px ${boardWidth / 8}px`
        }}>
            {pieces.slice(6, 12).map(piece => 
              {
                const color = piece[0] as PieceColor;
                const type = piece[1].toLowerCase() as PieceType;
      
                const formattedPiece = `${color}${type.toUpperCase()}` as Pc;
      
                return <SparePiece key={piece} piece={formattedPiece} width={boardWidth / 8} dndId="ManualBoardEditor" />
              }
              )
            }
          </div>
          <Chessboard onBoardWidthChange={setBoardWidth} id="ManualBoardEditor" boardOrientation={boardOrientation} position={game.fen()} onSparePieceDrop={handleSparePieceDrop} onPieceDrop={handlePieceDrop} onPieceDropOffBoard={handlePieceDropOffBoard} dropOffBoardAction="trash" customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
        }} />
          <div style={{
          display: "flex",
          margin: `${boardWidth / 32}px ${boardWidth / 8}px`
        }}>
        {pieces.slice(0, 6).map(piece => {
          const color = piece[0] as PieceColor;
          const type = piece[1].toLowerCase() as PieceType;

          const formattedPiece = `${color}${type.toUpperCase()}` as Pc;

          return <SparePiece key={piece} piece={formattedPiece} width={boardWidth / 8} dndId="ManualBoardEditor" />;
        })}
          </div>
        </div>
        <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
          <button style={buttonStyle} onClick={() => {
          game.reset();
          setFenPosition(game.fen());
        }}>
            Start position
          </button>
          <button style={buttonStyle} onClick={() => {
          game.clear();
          setFenPosition(game.fen());
        }}>
            Clear board
          </button>
          <button style={buttonStyle} onClick={() => {
          setBoardOrientation(boardOrientation === "white" ? "black" : "white");
        }}>
            Flip board
          </button>
        </div>
        <input value={fenPosition} style={inputStyle} onChange={handleFenInputChange} placeholder="Paste FEN position to start editing" />
      </ChessboardDnDProvider>
    </div>;
}