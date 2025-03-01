import React from 'react'
import Image from 'next/image'

const pieces = ['wK', 'wQ', 'wR', 'wB', 'wN', 'wP', 'bK', 'bQ', 'bR', 'bB', 'bN', 'bP']

export function ChessPieces({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {pieces.filter(piece=>piece.startsWith("b")).map((piece) => (
        <div key={piece} className="relative aspect-square">
          <Image
            src={`/chess-pieces/${piece}.svg`}
            alt={`${piece} chess piece`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      ))}
    </div>
  )
}
