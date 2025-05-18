import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChessBoardEditor from "@/components/ChessBoardEditor";

// // Dynamically import ChessBoardEditor with SSR disabled
// const ChessBoardEditor = dynamic(
//   () => import("@/components/ChessBoardEditor"),
//   { ssr: false }
// );

export default function ChessBoard() {
  return (
    <div className="mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Interactive Chess Board</h1>
      <Card className="w-full mx-auto">
        <CardHeader>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full">
            <ChessBoardEditor />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Select a piece from the top bar and click on the board to place it. Drag and drop pieces to move them. Use
            the buttons below to clear or reset the board.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

