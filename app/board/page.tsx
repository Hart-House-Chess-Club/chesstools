import BasicBoard from "@/components/BasicBoard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChessBoard() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Interactive Chess Board</h1>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Create and Modify a Chess Board</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full">
            <BasicBoard />
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

