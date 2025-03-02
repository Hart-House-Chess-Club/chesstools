import AnalysisBoard from "@/components/AnalysisBoard"
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
            <AnalysisBoard />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Analysis Board info
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

