export function ChessBoard({ size = 240, className = "" }: { size?: number; className?: string }) {
    const squareSize = size / 8
    const squares = []
  
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2 === 0
        squares.push(
          <rect
            key={`${row}-${col}`}
            x={col * squareSize}
            y={row * squareSize}
            width={squareSize}
            height={squareSize}
            fill={isLight ? "#f3f4f6" : "#4b5563"}
          />,
        )
      }
    }
  
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
        {squares}
      </svg>
    )
  }
  
  