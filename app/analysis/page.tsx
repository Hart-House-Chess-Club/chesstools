import AnalysisBoard from "@/components/AnalysisBoard"
import { Card, CardContent } from "@/components/ui/card"

export default function ChessBoard() {
  return (
    <div className="max-w mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Analysis Board</h1>
      <Card className="w-full mx-auto">
        <CardContent className="space-y-4">
          <div className="w-full">
            <AnalysisBoard />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Play moves or paste a FEN to begin analyzing the position using Stockfish.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

