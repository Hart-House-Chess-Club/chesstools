import ChessBoardImage from '@/components/ChessBoardImage'

export default function GeneratorPage() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="max-w-2xl mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Chess Board Generator</h1>
      <p className="mb-4">
        This application allows you to generate chess board images from FEN (Forsyth–Edwards Notation) to PNG (Fen to PNG).
      </p>
    </div>
      <ChessBoardImage />
    </div>
  )
}

