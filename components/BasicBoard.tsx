"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Chess, Square, PieceType } from "chess.js"
import { Chessboard } from "react-chessboard"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button } from "@/components/ui/button"

const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"]

// Valid PieceType values
const pieceTypeMap: Record<string, PieceType> = {
  P: "p",
  N: "n",
  B: "b",
  R: "r",
  Q: "q",
  K: "k",
}

const BasicBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess())
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)

  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square) => {
      if (selectedPiece) {
        const gameCopy = new Chess(game.fen())
        gameCopy.remove(targetSquare)
        gameCopy.put(
          {
            type: pieceTypeMap[selectedPiece[1]] as PieceType, // Ensure correct type
            color: selectedPiece[0] === "w" ? "w" : "b",
          },
          targetSquare,
        )
        setGame(gameCopy)
        setSelectedPiece(null)
        return true
      } else {
        const gameCopy = new Chess(game.fen())
        const move = gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q", // always promote to queen for simplicity
        })
        setGame(gameCopy)
        return Boolean(move)
      }
    },
    [game, selectedPiece],
  )

  const clearBoard = () => {
    const clearedGame = new Chess()
    clearedGame.clear()
    setGame(clearedGame)
  }

  const resetBoard = () => {
    setGame(new Chess())
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <div className="mb-4 flex space-x-2">
          {pieces.map((piece) => (
            <button
              key={piece}
              className={`w-10 h-10 border ${selectedPiece === piece ? "border-blue-500" : "border-gray-300"}`}
              onClick={() => setSelectedPiece(piece)}
            >
              <img src={`/chess-pieces/${piece}.svg`} alt={piece} className="w-full h-full" />
            </button>
          ))}
        </div>
        <div className="w-full max-w-md">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            // customDragLayers={selectedPiece ? [{ piece: selectedPiece, key: "custom" }] : []}
          />
        </div>
        <div className="mt-4 flex space-x-4">
          <Button onClick={clearBoard}>Clear Board</Button>
          <Button onClick={resetBoard}>Reset Board</Button>
        </div>
      </div>
    </DndProvider>
  )
}

export default BasicBoard

