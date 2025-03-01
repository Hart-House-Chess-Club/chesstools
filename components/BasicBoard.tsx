"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Chess, Square, PieceType } from "chess.js"
import { Chessboard } from "react-chessboard"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { ClipboardCopy } from "lucide-react"

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
  const [fen, setFen] = useState(game.fen())

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
        setFen(gameCopy.fen())
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
        setFen(gameCopy.fen())
        return Boolean(move)
      }
    },
    [game, selectedPiece],
  )

  const clearBoard = () => {
    const clearedGame = new Chess()
    clearedGame.clear()
    setGame(clearedGame)
    setFen(clearedGame.fen())
  }

  const resetBoard = () => {
    const newGame = new Chess()
    setGame(newGame)
    setFen(newGame.fen())
  }

  const copyFen = () => {
    navigator.clipboard.writeText(fen).then(
      () => {
        // You could add a toast notification here to inform the user that the FEN was copied
        console.log("FEN copied to clipboard")
      },
      (err) => {
        console.error("Could not copy FEN: ", err)
      },
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {pieces.map((piece) => (
            <button
              key={piece}
              className={`w-12 h-12 border ${selectedPiece === piece ? "border-primary" : "border-border"} rounded-md overflow-hidden`}
              onClick={() => setSelectedPiece(piece)}
            >
              <div className="relative w-full h-full">
                <Image src={`/chess-pieces/${piece}.svg`} alt={piece} layout="fill" objectFit="contain" />
              </div>
            </button>
          ))}
        </div>
        <div className="w-full max-w-md">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            // customDragLayers={selectedPiece ? [{ piece: selectedPiece, key: "custom" }] : []}
            customPieces={{
              wP: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/wP.svg" alt="White Pawn" layout="fill" />
                </div>
              ),
              wN: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/wN.svg" alt="White Knight" layout="fill" />
                </div>
              ),
              wB: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/wB.svg" alt="White Bishop" layout="fill" />
                </div>
              ),
              wR: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/wR.svg" alt="White Rook" layout="fill" />
                </div>
              ),
              wQ: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/wQ.svg" alt="White Queen" layout="fill" />
                </div>
              ),
              wK: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/wK.svg" alt="White King" layout="fill" />
                </div>
              ),
              bP: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/bP.svg" alt="Black Pawn" layout="fill" />
                </div>
              ),
              bN: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/bN.svg" alt="Black Knight" layout="fill" />
                </div>
              ),
              bB: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/bB.svg" alt="Black Bishop" layout="fill" />
                </div>
              ),
              bR: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/bR.svg" alt="Black Rook" layout="fill" />
                </div>
              ),
              bQ: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/bQ.svg" alt="Black Queen" layout="fill" />
                </div>
              ),
              bK: ({ squareWidth }) => (
                <div style={{ width: squareWidth, height: squareWidth }}>
                  <Image src="/chess-pieces/bK.svg" alt="Black King" layout="fill" />
                </div>
              ),
            }}
          />
        </div>
        <div className="mt-4 flex space-x-4">
          <Button onClick={clearBoard}>Clear Board</Button>
          <Button onClick={resetBoard}>Reset Board</Button>
        </div>
        <div className="mt-4 w-full max-w-md flex items-center space-x-2">
          <Input type="text" value={fen} readOnly className="flex-grow" placeholder="FEN will appear here" />
          <Button onClick={copyFen} className="flex-shrink-0">
            <ClipboardCopy className="h-4 w-4 mr-2" />
            Copy FEN
          </Button>
        </div>
      </div>
    </DndProvider>
  )
}

export default BasicBoard

