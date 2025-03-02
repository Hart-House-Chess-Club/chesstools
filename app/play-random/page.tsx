import ChessBoardRandom from '@/components/ChessBoard';
import { Card, CardContent } from "@/components/ui/card";

export default function ChessBoard() {
  return (
    <div className="mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Play chesstools.org</h1>
      <Card className="w-1/2 mx-auto">
        <CardContent className="space-y-4">
          <div className="w-full mx-auto">
            <div className="w-full max-w-3xl mx-auto">
              <ChessBoardRandom />
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Play against the computer. Moves are randomly generated, elo is approx 100.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
